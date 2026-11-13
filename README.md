# A.I. native juniors — Slidev

Punto de partida editable para desenvolver a presentación con VS Code e Codex.

## Requisitos
Node.js 22.12 ou superior.

## Arranque
```bash
npm install
npm run dev
```

## Exportación para a universidade
```bash
npm run export:pptx
npm run export:pdf
```

O PPTX leva as aparicións como diapositivas sucesivas, non como animacións nativas. Importalo en Google Slides e revisalo alí. A exportación pode requirir a instalación de Chromium mediante Playwright.

## Arquivos
- `slides.md`: contido da charla en galego, con revelacións e notas.
- `styles/index.css`: tema provisional. **As fontes e cores exactas da web están pendentes de verificar**.
- `AGENTS.md`: normas para colaborar con Codex.

## Próxima sesión
1. Revisar a tese e o público da charla.
2. Completar as cronoloxías, a paradoxa de Jevons e a conclusión, contrastando fontes.
3. Extraer os estilos reais de `albertobasalo.dev` e actualizar o CSS.
4. Ensaiar o ritmo das aparicións e validar o PPTX importado.

A estrutura segue as 13 diapositivas do PPTX orixinal; o contido engadido entre corchetes é expresamente provisional.
