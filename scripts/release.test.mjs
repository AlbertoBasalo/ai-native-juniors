import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { test } from 'node:test';
import { publish } from './release.mjs';

test('publica en un remoto aislado, conserva historial y limpia archivos obsoletos', () => {
  const temporary = resolve(mkdtempSync(join(tmpdir(), 'slidev-release-test-')));
  const root = join(temporary, 'source');
  const remote = join(temporary, 'remote.git');
  const git = (cwd, ...args) => {
    const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  try {
    mkdirSync(root);
    git(temporary, 'init', '--bare', remote);
    git(root, 'init', '-b', 'main');
    git(root, 'config', 'user.name', 'Release Test');
    git(root, 'config', 'user.email', 'release@example.invalid');
    git(root, 'remote', 'add', 'origin', remote);
    writeFileSync(join(root, '.gitignore'), 'dist/\n');
    writeFileSync(join(root, 'slides.md'), '# Presentación\n');
    mkdirSync(join(root, '.github/workflows'), { recursive: true });
    writeFileSync(join(root, '.github/workflows/deploy.yml'), 'name: Publicar\n');
    git(root, 'add', '.');
    git(root, 'commit', '-m', 'Fuente');
    const originalHead = git(root, 'rev-parse', 'HEAD');
    const dist = join(root, 'dist');
    mkdirSync(dist);
    writeFileSync(join(dist, 'index.html'), '<h1>Versión 1</h1>');
    writeFileSync(join(dist, 'obsolete.js'), 'old');

    publish(root, { dryRun: true });
    assert.equal(git(root, 'ls-remote', '--heads', 'origin', 'gh-pages'), '');

    publish(root);
    const first = git(remote, 'rev-parse', 'refs/heads/gh-pages');
    assert.equal(git(remote, 'show', 'gh-pages:index.html'), '<h1>Versión 1</h1>');
    assert.equal(git(remote, 'show', 'gh-pages:.github/workflows/deploy.yml'), 'name: Publicar');
    const files = git(remote, 'ls-tree', '-r', '--name-only', 'gh-pages').split('\n');
    assert.ok(files.includes('.nojekyll'));
    assert.ok(!files.includes('slides.md'));

    publish(root);
    assert.equal(git(remote, 'rev-parse', 'refs/heads/gh-pages'), first);

    rmSync(join(dist, 'obsolete.js'));
    writeFileSync(join(dist, 'index.html'), '<h1>Versión 2</h1>');
    publish(root);
    assert.equal(git(remote, 'rev-parse', 'gh-pages^'), first);
    assert.equal(git(remote, 'show', 'gh-pages:index.html'), '<h1>Versión 2</h1>');
    assert.ok(!git(remote, 'ls-tree', '-r', '--name-only', 'gh-pages').includes('obsolete.js'));
    assert.equal(git(root, 'branch', '--show-current'), 'main');
    assert.equal(git(root, 'rev-parse', 'HEAD'), originalHead);
    assert.equal(git(root, 'status', '--porcelain'), '');
    assert.equal(readFileSync(join(root, 'slides.md'), 'utf8'), '# Presentación\n');
  } finally {
    if (temporary.startsWith(resolve(tmpdir()) + sep) && temporary !== resolve(tmpdir())) {
      rmSync(temporary, { recursive: true, force: true });
    }
  }
});
