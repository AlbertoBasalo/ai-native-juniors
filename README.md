# A.I. native juniors — Slidev

Presentación de Alberto Basalo sobre el futuro de la formación en programación para juniors que trabajen en el nuevo paradigma de la empresa con la irrupción de la inteligencia artificial.

## Requisitos
Node.js 22.12 ou superior.

## Arranque
```bash
npm install
npm run dev
```

## Exportación PowerPoint o PDF
```bash
npm run export:pptx
npm run export:pdf
```

## Publicación en GitHub Pages

Desde la rama `main`, ejecuta:

```bash
npm run release
```

El comando comprueba la compilación local con la ruta de GitHub Pages, añade todos
los cambios no ignorados y crea un commit en `main` si hay cambios pendientes.
Después sube `main` a `origin` y envía la compilación a `gh-pages`, conservando su historial.
No cambia la rama de trabajo ni utiliza force push. Si falla la compilación, no crea
commits ni envía cambios. Si falla el push de `main`, no publica en `gh-pages`.
La Action publica esa compilación; los pushes a `main` ya no publican la presentación.
Requiere Git con identidad y acceso de escritura a `origin`.

El mensaje predeterminado es «Actualizar presentación». Puedes personalizarlo:

```bash
npm run release -- -m "Añadir ejemplos de agentes"
```

Para comprobar la compilación sin modificar el índice ni crear commits en `main`:

```bash
npm run release -- --dry-run
```

Este modo permite cambios sin commit y consulta el remoto, pero no publica.
Solo prepara un commit de prueba en un repositorio temporal, que se elimina al terminar.

El propio comando sube también el script y el workflow en el primer release.
En **Settings → Pages**, mantén **Source: GitHub Actions**. Si el entorno
`github-pages` limita las ramas autorizadas, permite también `gh-pages`.
El workflow también permite volver a desplegar `gh-pages` desde **Run workflow**.

## Archivos
- `slides.md`:contenido de la presentación en formato Markdown.
- `styles/index.css`: tema provisional. **Fuentes, colores y logotipos pendientes**.
- `AGENTS.md`: normas de colaboración con agentes.

---

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [X-Twitter](https://x.com/albertobasalo) · [LinkedIn](https://www.linkedin.com/in/albertobasalo/)  
**Courses in Spanish** · [A.I. Code Academy](https://aicode.academy)  
**Repository** · [GitHub / AIDDbot](https://github.com/AlbertoBasalo/ai-native-juniors)  
**Website** · [aiddbot.com](https://aiddbot.com)

---

[![IAxPRO](public/ia-ou-logo-02.png)](public/ia-ou-logo-02.png)


