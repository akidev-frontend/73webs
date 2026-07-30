// Cliente demo del template Tattoo: mismo contenido que la plantilla original,
// con los placeholders sin rellenar. COPIA ESTE ARCHIVO para cada cliente nuevo.
//
// Lo que no aparece aquí lo deriva crearCliente() del negocio:
//   seo (title, description, canonical, og, json-ld), hero.eyebrow,
//   hero.hrefSecundario, proceso.id, resena.fuente, formulario, footer.
// Para pisar cualquiera de esos, basta añadirlo abajo.
import { crearCliente } from '../crear';

const negocio = {
  nombre: '[NOMBRE_NEGOCIO]',
  ciudad: '[CIUDAD]',
  telefono: '[TELEFONO]',
  email: '[EMAIL]',
  direccion: '[DIRECCION]',
  horario: '[HORARIO]',
  instagram: '[INSTAGRAM]',
  whatsapp: '[WHATSAPP]',
  url: 'https://73webs.com/clientes/tatuador.html',
  imagen: 'https://73webs.com/img/tatuador.jpg',
  priceRange: '€€',
};

const precio = '[PRECIO]';

export const cliente = crearCliente({
  negocio,

  nav: {
    cta: { es: 'Reservar cita', ca: 'Reserva cita' },
  },

  hero: {
    titulo: {
      es: 'Tu idea es para siempre. <em>Que la haga alguien que la entienda.</em>',
      ca: "La teva idea és per sempre. <em>Que la faci algú que l'entengui.</em>",
    },
    lead: {
      es: 'Diseño 100% personalizado, material esterilizado y una sesión sin prisa. Antes de tocar la piel, hablamos de lo que quieres hasta que quede clavado.',
      ca: 'Disseny 100% personalitzat, material esterilitzat i una sessió sense presses. Abans de tocar la pell, parlem del que vols fins que quedi clavat.',
    },
    ctaPrimario: { es: 'Reserva ahora', ca: 'Reserva ara' },
    ctaSecundario: { es: 'Ver cómo trabajo', ca: 'Mira com treballo' },
  },

  miedos: {
    eyebrow: { es: 'El miedo real', ca: 'La por real' },
    titulo: {
      es: 'Un tatuaje malo no se borra. Se tapa.',
      ca: "Un tatuatge dolent no s'esborra. Es tapa.",
    },
    sub: {
      es: 'Por eso dudas. Y haces bien. Estos son los miedos que oigo cada semana:',
      ca: 'Per això dubtes. I fas bé. Aquestes són les pors que sento cada setmana:',
    },
    items: [
      {
        etiqueta: { es: '✕ MIEDO 01', ca: '✕ POR 01' },
        titulo: { es: '"¿Y si no queda como lo imagino?"', ca: '"I si no queda com m\'ho imagino?"' },
        texto: {
          es: 'Ves referencias en Instagram pero no sabes si el artista sabrá traducirlas a tu piel y tu cuerpo.',
          ca: "Veus referències a Instagram però no saps si l'artista sabrà traduir-les a la teva pell i el teu cos.",
        },
      },
      {
        etiqueta: { es: '✕ MIEDO 02', ca: '✕ POR 02' },
        titulo: { es: '"¿Es higiénico de verdad?"', ca: '"És higiènic de veritat?"' },
        texto: {
          es: 'Agujas, tinta, guantes. Si no lo ves claro, no te relajas. Y un tatuaje tenso sale peor.',
          ca: 'Agulles, tinta, guants. Si no ho veus clar, no et relaxes. I un tatuatge tens surt pitjor.',
        },
      },
      {
        etiqueta: { es: '✕ MIEDO 03', ca: '✕ POR 03' },
        titulo: { es: '"¿Cuánto me va a costar?"', ca: '"Quant em costarà?"' },
        texto: {
          es: 'Precios que aparecen a mitad de sesión. Presupuestos vagos. Sorpresas al pagar.',
          ca: 'Preus que apareixen a mitja sessió. Pressupostos vagues. Sorpreses en pagar.',
        },
      },
    ],
  },

  proceso: {
    eyebrow: { es: 'Cómo trabajo', ca: 'Com treballo' },
    titulo: {
      es: 'Nada de improvisar sobre tu piel.',
      ca: "Res d'improvisar sobre la teva pell.",
    },
    sub: {
      es: 'Un proceso claro para que llegues tranquilo y salgas orgulloso.',
      ca: 'Un procés clar perquè arribis tranquil i surtis orgullós.',
    },
    items: [
      {
        titulo: { es: 'Hablamos tu idea', ca: 'Parlem la teva idea' },
        texto: {
          es: 'Me cuentas qué quieres, dónde y por qué. Sin compromiso, por WhatsApp o en el estudio.',
          ca: "Em contes què vols, on i per què. Sense compromís, per WhatsApp o a l'estudi.",
        },
      },
      {
        titulo: { es: 'Diseño a medida', ca: 'Disseny a mida' },
        texto: {
          es: 'Te enseño el boceto antes de la cita. Lo ajustamos hasta que sea exactamente tuyo.',
          ca: "Et mostro l'esbós abans de la cita. L'ajustem fins que sigui exactament teu.",
        },
      },
      {
        titulo: { es: 'Presupuesto cerrado', ca: 'Pressupost tancat' },
        texto: {
          es: 'Sabes el precio antes de tumbarte. Cero sorpresas.',
          ca: "Saps el preu abans d'estirar-te. Zero sorpreses.",
        },
      },
      {
        titulo: { es: 'Sesión e higiene certificada', ca: 'Sessió i higiene certificada' },
        texto: {
          es: 'Material de un solo uso, esterilizado y a la vista. Y todo el tiempo que haga falta.',
          ca: "Material d'un sol ús, esterilitzat i a la vista. I tot el temps que calgui.",
        },
      },
    ],
  },

  estilos: {
    eyebrow: { es: 'Estilos', ca: 'Estils' },
    titulo: { es: 'Lo que puedo tatuar contigo', ca: 'El que puc tatuar amb tu' },
    items: [
      {
        nombre: 'Fine line',
        texto: {
          es: 'Líneas finas, detalle limpio, estética minimalista.',
          ca: 'Línies fines, detall net, estètica minimalista.',
        },
        precio: { es: `Desde ${precio}`, ca: `Des de ${precio}` },
      },
      {
        nombre: 'Blackwork',
        texto: {
          es: 'Negro sólido, geometría y contraste fuerte.',
          ca: 'Negre sòlid, geometria i contrast fort.',
        },
        precio: { es: `Desde ${precio}`, ca: `Des de ${precio}` },
      },
      {
        nombre: 'Lettering',
        texto: {
          es: 'Frases y nombres con la tipografía perfecta.',
          ca: 'Frases i noms amb la tipografia perfecta.',
        },
        precio: { es: `Desde ${precio}`, ca: `Des de ${precio}` },
      },
      {
        nombre: 'Cover-up',
        texto: {
          es: 'Tapamos ese tatuaje del que te arrepientes.',
          ca: 'Tapem aquell tatuatge del qual et penedeixes.',
        },
        precio: { es: 'Presupuesto', ca: 'Pressupost' },
      },
    ],
  },

  resena: {
    estrellas: 5,
    cita: {
      es: '"Vine con una idea a medias y salí con <em>el tatuaje que no sabía que quería</em>. Todo explicado, todo limpio."',
      ca: '"Vaig venir amb una idea a mitges i vaig sortir amb <em>el tatuatge que no sabia que volia</em>. Tot explicat, tot net."',
    },
    autor: '[NOMBRE_CLIENTE]',
  },

  ctaFinal: {
    eyebrow: { es: 'Da el paso', ca: 'Fes el pas' },
    titulo: {
      es: 'Enséñame tu idea. <em>Te digo cómo la hago.</em>',
      ca: "Ensenya'm la teva idea. <em>Et dic com la faig.</em>",
    },
    texto: {
      es: 'Respuesta el mismo día. Sin compromiso, sin presión. Tú decides cuándo.',
      ca: 'Resposta el mateix dia. Sense compromís, sense pressió. Tu decideixes quan.',
    },
  },
});

export default cliente;
