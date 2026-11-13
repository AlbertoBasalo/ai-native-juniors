import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

function run(command, args, cwd, accepted = [0]) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  if (result.error) throw result.error;
  if (!accepted.includes(result.status)) {
    throw new Error(result.stderr.trim() || result.stdout.trim() || `${command} terminó con código ${result.status}`);
  }
  return { status: result.status, output: result.stdout.trim() };
}

// El repositorio temporal mantiene intactos la rama y el índice del proyecto.
export function publish(root, { dryRun = false } = {}) {
  const git = (...args) => run('git', args, root).output;
  const remote = git('remote', 'get-url', '--push', 'origin');
  const name = git('config', 'user.name');
  const email = git('config', 'user.email');
  const source = git('rev-parse', '--short', 'HEAD');
  const dist = join(root, 'dist');
  if (!existsSync(join(dist, 'index.html'))) throw new Error('Falta dist/index.html. Compila antes de publicar.');

  const temporary = resolve(mkdtempSync(join(tmpdir(), 'slidev-release-')));
  try {
    const tempGit = (...args) => run('git', args, temporary).output;
    tempGit('init');
    tempGit('config', 'user.name', name);
    tempGit('config', 'user.email', email);
    tempGit('remote', 'add', 'origin', remote);

    const branch = run('git', ['ls-remote', '--exit-code', '--heads', 'origin', 'refs/heads/gh-pages'], temporary, [0, 2]);
    if (branch.status === 0) {
      tempGit('fetch', '--depth=1', 'origin', 'gh-pages');
      tempGit('reset', '--soft', 'FETCH_HEAD');
    }

    cpSync(dist, temporary, { recursive: true });
    writeFileSync(join(temporary, '.nojekyll'), '');
    const workflow = join('.github', 'workflows', 'deploy.yml');
    mkdirSync(dirname(join(temporary, workflow)), { recursive: true });
    cpSync(join(root, workflow), join(temporary, workflow));
    tempGit('add', '--all');

    if (branch.status === 0 && run('git', ['diff', '--cached', '--quiet'], temporary, [0, 1]).status === 0) {
      console.log('Sin cambios respecto a gh-pages. No se publica de nuevo.');
      return;
    }

    tempGit('commit', '-m', `Publicar presentación desde ${source}`);
    if (dryRun) {
      console.log('Comprobación correcta: compilación y commit preparados; no se ha enviado nada.');
    } else {
      tempGit('push', 'origin', 'HEAD:refs/heads/gh-pages');
      console.log('Compilación enviada a gh-pages. GitHub Actions realizará el despliegue.');
    }
  } finally {
    // Solo se elimina el directorio creado para esta ejecución.
    if (temporary.startsWith(resolve(tmpdir()) + sep) && temporary !== resolve(tmpdir())) {
      rmSync(temporary, { recursive: true, force: true });
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--dry-run')) throw new Error('Uso: npm run release -- [--dry-run]');
  const dryRun = args.includes('--dry-run');
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  if (!dryRun && run('git', ['status', '--porcelain'], root).output) {
    throw new Error('Guarda los cambios en un commit antes del release. Para comprobarlo sin publicar: npm run release -- --dry-run');
  }
  const { repository } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  const repositoryName = new URL(repository.url).pathname.split('/').filter(Boolean).at(-1).replace(/\.git$/, '');
  const base = repositoryName.endsWith('.github.io') ? '/' : `/${repositoryName}/`;
  console.log(`Compilando para GitHub Pages con base ${base}`);
  const result = spawnSync(process.execPath, [join(root, 'node_modules/@slidev/cli/bin/slidev.mjs'), 'build', 'slides.md', '--base', base], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('La compilación ha fallado. No se publica.');
  publish(root, { dryRun });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    main();
  } catch (error) {
    console.error(`Release cancelado: ${error.message}`);
    process.exitCode = 1;
  }
}
