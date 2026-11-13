# Instrucciones para agentes

Presentación en Slidev «A.I. native juniors», dirigida al profesorado de la ESEI de Ourense

## Contenido y edición
- `slides.md` es la fuente editable; los PPTX exportados son entregables, no la fuente de verdad.
- Escribir en español (con algún guiño en gallego), conservando nombres oficiales y tecnicismos habituales en inglés.
- Mantener el orden y el contenido del usuario salvo petición expresa de cambio.
- Una idea por diapositiva, con frases breves y revelaciones mediante `v-click`, `<v-click>` o `<v-clicks>`.
- Incluir solo contenido final: sin comentarios, notas del presentador ni instrucciones provisionales.
- No inventar cifras, citas ni referencias. Distinguir hechos, opiniones y previsiones.
- Mantener el HTML bien indentado y los cambios limitados a la tarea solicitada.

## Estilo y comprobación
- Conservar el diseño actual en `styles/index.css`, con variables CSS, alto contraste y texto legible en formato 16:9.
- No añadir dependencias decorativas innecesarias.
- Para cambios de contenido o estilos, ejecutar `npm run build` y revisar las diapositivas afectadas y sus revelaciones en el navegador.
- Para trabajar en local: `npm install` y `npm run dev`.
- Cuando se solicite un entregable, exportar con `npm run export:pptx -- --with-clicks` o `npm run export:pdf`.
- Verificar la importación en Google Slides cuando se disponga de acceso; si no, indicar que esa comprobación queda pendiente.
