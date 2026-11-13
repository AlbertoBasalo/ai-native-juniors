# Instrucións para Codex

## Obxectivo
Preparar unha charla universitaria en Slidev a partir do PPTX orixinal «A.I. native juniors», dirixida ao profesorado da Universidade de Vigo.

## Fonte de verdade
- `slides.md` é a fonte editable principal.
- O PPTX orixinal é material de referencia, non autoriza inventar datos nin conclusións.
- Manter a orde narrativa inicial salvo que o usuario solicite unha reestruturación.

## Regras de contido
- Redactar principalmente en galego normativo, mantendo tecnicismos en inglés cando sexan habituais.
- Unha idea principal por diapositiva; priorizar preguntas e frases curtas.
- Usar `<v-click>` e `<v-clicks>` para revelar contidos progresivamente.
- Evitar parágrafos na pantalla: desenvolver as explicacións nas notas do presentador (`<!-- ... -->`).
- Distinguir feitos documentados de previsións e opinións.
- Non inventar cifras, citas nin referencias académicas.

## Regras visuais
- O estilo definitivo debe inspirarse no CSS real de albertobasalo.dev.
- Personalizar en `styles/index.css`, usando variables CSS.
- Non introducir dependencias decorativas sen necesidade.
- Contraste alto, letra grande, presentación 16:9 apta para proxector.

## Fluxo de traballo
1. Propoñer un pequeno cambio e explicar a súa intención.
2. Editar `slides.md` ou os estilos, mantendo o resto estable.
3. Comprobar que Slidev compila e que non hai desbordamentos visuais.
4. Exportar un PPTX con todos os pasos por clic para Google Slides.
5. Verificar manualmente o resultado importado a Google Slides.

## Criterios de aceptación
- O proxecto arranca con `npm install` e `npm run dev`.
- As revelacións funcionen ao avanzar.
- O arquivo exportado á universidade funcione sen instalar Slidev.
