# Guía del template Tattoo

Cómo sacar la web de un cliente nuevo. Lectura de 3 minutos.

## Las cuatro capas

```
src/pages/<slug>.astro          ← 8 líneas. Define la URL.          ✏️ lo creas
src/data/clientes/<slug>.ts     ← TODO el contenido del cliente.    ✏️ lo creas
src/templates/TattooTemplate.astro   ← reparte los datos            ⛔ no se toca
src/components/tattoo/*.astro        ← markup sin contenido         ⛔ no se toca
src/css/tattoo/  ·  src/js/tattoo/   ← estilos y comportamiento     ⛔ no se toca
```

Al añadir un cliente **solo** se crean dos archivos. Si te ves editando un componente, el CSS o el
template para un cliente concreto, algo está mal planteado: eso va en los datos.

## Cliente nuevo, paso a paso

1. **Copia** `src/data/clientes/demo.ts` → `src/data/clientes/black-soul-tattoo.ts`.
2. **Rellena** el `negocio` y el copy (tabla abajo). Sin tocar la estructura del archivo.
3. **Crea la page** `src/pages/black-soul-tattoo.astro`. El nombre del archivo **es la URL**
   (`/black-soul-tattoo`):

   ```astro
   ---
   import Layout from '../components/tattoo/Layout.astro';
   import TattooTemplate from '../templates/TattooTemplate.astro';
   import cliente from '../data/clientes/black-soul-tattoo';
   ---
   <Layout cliente={cliente}>
     <TattooTemplate cliente={cliente} />
   </Layout>
   ```

4. **Comprueba**: `npm run check` (avisa de campos que falten) y `npm run dev` para verlo.

## Qué rellenas

Todo vive dentro de `crearCliente({ … })`. El contrato completo está en `src/data/tipos.ts`.

| Bloque | Campos | Notas |
|---|---|---|
| `negocio` | nombre, ciudad, telefono, email, direccion, horario, instagram, whatsapp, url, imagen, priceRange | `whatsapp` es la URL entera: `https://wa.me/34600111222`. `email` alimenta el formulario y el footer |
| `nav` | cta | Texto del botón de la barra superior |
| `hero` | titulo, lead, ctaPrimario, ctaSecundario | `eyebrow` y `hrefSecundario` se derivan |
| `miedos` | eyebrow, titulo, sub, `items[]` → etiqueta, titulo, texto | 3 tarjetas en el diseño original; admite más o menos |
| `proceso` | eyebrow, titulo, sub, `items[]` → titulo, texto | `id` se deriva (`trabajo`) |
| `estilos` | eyebrow, titulo, `items[]` → nombre, texto, precio | Alimenta **dos** sitios: la rejilla y los checkboxes del formulario |
| `resena` | estrellas, cita, autor | `fuente` se deriva ("reseña Google") |
| `ctaFinal` | eyebrow, titulo, texto | |

**Lo que no escribes porque se calcula solo** (`src/data/crear.ts`), a partir del negocio:

| Se deriva | De dónde sale |
|---|---|
| `seo.title` | `nombre` + `ciudad` |
| `seo.description`, `seo.ogDescription`, `seo.jsonLdDescription` | `ciudad` |
| `seo.canonical` | `negocio.url` |
| `hero.eyebrow` | `ciudad` |
| `hero.hrefSecundario` | `#` + `proceso.id` |
| `proceso.id` | `trabajo` |
| `resena.fuente` | "reseña Google" / "ressenya Google" |
| `formulario.action` | `https://formsubmit.co/{email}` |
| `formulario.asunto` | "Nueva solicitud desde la web" |
| `footer.creditos` | "Web hecha por" / "Web feta per" |

Cualquiera de esos se puede pisar: añádelo al objeto y gana el tuyo. Ejemplo, cliente con formulario
propio y otro título:

```ts
export const cliente = crearCliente({
  negocio,
  seo: { title: 'Black Soul Tattoo · Blackwork en Girona' },
  formulario: { action: 'https://formspree.io/f/abc123' },
  // …el resto del contenido
});
```

## Reglas prácticas

- **Cada texto es un par `{ es, ca }`.** Los dos son obligatorios: `npm run check` señala el archivo,
  la línea y el campo que falta antes de publicar nada.
- **Admite HTML inline.** `'Tu idea es <em>para siempre</em>'` pinta el `<em>` en rojo, que es el
  recurso de énfasis del diseño. Úsalo en titulares y en la cita de la reseña.
- **Cuidado con las comillas.** Los textos en catalán llevan apóstrofos (`l'estudi`): usa comillas
  dobles para esa cadena, `ca: "l'estudi"`.
- **El `_` del nombre sale rojo** en el logo: `TINTA_NEGRA` → `TINTA` + `_` rojo + `NEGRA`.
  Si el negocio no lleva `_`, no pasa nada.
- **Los números `01 02 03`** de proceso se generan por el orden de `items`. No los escribas.
- **Añadir un estilo** a `estilos.items` lo hace aparecer a la vez en la rejilla y como checkbox del
  formulario. No hay que tocar el formulario.
- **Idioma**: el selector ES/CA de abajo a la derecha escribe `html[lang]` y lo guarda en
  `localStorage`. El CSS oculta el idioma inactivo, así que ambos textos van siempre en el HTML.
- **Las etiquetas del formulario** (Nombre, Email, Teléfono, Enviar…) son iguales para todos y viven
  en `src/data/ui.ts`. No se repiten por cliente. Para cambiarlas en un cliente concreto, pásale
  `etiquetas` a `<Formulario />`.

## Comandos

```
npm run dev      # servidor local en http://localhost:4321
npm run check    # valida los datos de todos los clientes (hazlo antes de publicar)
npm run build    # check + build a dist/
```

`astro dev --background` deja el servidor en segundo plano; se gestiona con `astro dev stop`,
`astro dev status` y `astro dev logs`.
