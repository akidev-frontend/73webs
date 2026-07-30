---
name: nueva-web
description: Monta la web de un cliente del template Tattoo a partir de un brief. Úsalo cuando el usuario escriba /nueva-web con la ruta de un brief, o pida crear la web o la demo de un estudio de tatuajes nuevo.
---

# /nueva-web

Argumento: la ruta del brief. Ejemplo: `/nueva-web briefs/black-soul.md`

## Pasos

1. **Sin argumento**: lista los briefs con `Glob briefs/*.md` (ignorando `PLANTILLA-BRIEF.md`) y
   pregunta cuál. Si no hay ninguno, dile que copie `briefs/PLANTILLA-BRIEF.md` a
   `briefs/<slug>.md`, lo rellene y vuelva.

2. **Lee el brief** y comprueba los datos duros obligatorios: nombre, ciudad, telefono, email,
   direccion, horario, instagram, whatsapp, url, precio_desde, y la reseña (texto y autor). Si falta
   alguno o está como `?`, **pregúntalo antes de seguir** con AskUserQuestion o en texto. No inventes
   datos de contacto ni reseñas.

3. **Delega en el subagente `web-tattoo`** (tool Agent, `subagent_type: "web-tattoo"`), pasándole la
   ruta del brief y el slug. El slug es el nombre del archivo del brief sin extensión.

4. Cuando el subagente termine, **relata al usuario** lo que importa: archivos creados, la URL local,
   los campos que faltaban y cómo se resolvieron, y qué copy conviene que revise. El informe del
   subagente no lo ve el usuario.

5. Ofrece abrir la web: si no hay servidor, `astro dev --background`, y da la URL
   `http://localhost:4321/<slug>`.

## Límites

- Un brief, una web. Para varios clientes, repite el comando.
- El subagente no toca componentes, CSS, JS ni el template. Si el brief pide algo que no cabe en los
  datos (una sección nueva, otro diseño), no lo fuerces: dilo y para.
