// AGUJA_FRIA — Sabadell. Brief: briefs/prueba-aguja-fria.md (estudio de prueba, datos de test).
//
// Lo que no aparece aquí lo deriva crearCliente() del negocio:
//   seo, hero.eyebrow, hero.hrefSecundario, proceso.id, resena.fuente, formulario, footer.
import { crearCliente } from '../crear';

const negocio = {
  nombre: 'AGUJA_FRIA',
  ciudad: 'Sabadell',
  telefono: '+34 600 000 000',
  email: 'hola@agujafria.example',
  direccion: 'Carrer del Sol 8',
  horario: 'Mi-Sa 11:00-20:00',
  instagram: 'https://instagram.com/agujafria.example',
  whatsapp: 'https://wa.me/34600000000',
  url: 'https://agujafria.example/',
  imagen: 'https://73webs.com/img/tatuador.jpg',
  priceRange: '€€',
};

const precio = '90 €';

export const cliente = crearCliente({
  negocio,

  nav: {
    cta: { es: 'Pedir cita', ca: 'Demanar cita' },
  },

  hero: {
    titulo: {
      es: 'Una sesión al día: <em>la tuya.</em> Sin prisa y sin cola detrás.',
      ca: 'Una sessió al dia: <em>la teva.</em> Sense presses i sense cua al darrere.',
    },
    lead: {
      es: 'Blackwork, dotwork y neotradicional en Sabadell. Una sola persona, un solo cliente por jornada y el boceto en tus manos antes de encender la máquina.',
      ca: "Blackwork, dotwork i neotradicional a Sabadell. Una sola persona, un sol client per jornada i l'esbós a les teves mans abans d'encendre la màquina.",
    },
    ctaPrimario: { es: 'Cuéntame tu pieza', ca: "Explica'm la teva peça" },
    ctaSecundario: { es: 'Ver cómo trabajo', ca: 'Mira com treballo' },
  },

  miedos: {
    eyebrow: { es: 'Lo que frena', ca: 'El que frena' },
    titulo: {
      es: 'Una pieza grande no se improvisa. <em>Se piensa.</em>',
      ca: "Una peça gran no s'improvisa. <em>Es pensa.</em>",
    },
    sub: {
      es: 'Si llevas meses dándole vueltas, es porque te importa. Esto es lo que me cuentan antes de decidirse:',
      ca: "Si fa mesos que hi dones voltes, és perquè t'importa. Això és el que m'expliquen abans de decidir-se:",
    },
    items: [
      {
        etiqueta: { es: '✕ MIEDO 01', ca: '✕ POR 01' },
        titulo: {
          es: '"Llevo dos años con esta idea y no me fío de nadie."',
          ca: '"Fa dos anys que tinc aquesta idea i no me\'n fio de ningú."',
        },
        texto: {
          es: 'Una pieza que has madurado tanto merece un boceto propio, no un diseño reciclado de carpeta.',
          ca: "Una peça que has madurat tant es mereix un esbós propi, no un disseny reciclat de carpeta.",
        },
      },
      {
        etiqueta: { es: '✕ MIEDO 02', ca: '✕ POR 02' },
        titulo: {
          es: '"¿Me van a atender con otros tres a la vez?"',
          ca: '"M\'atendran amb tres més alhora?"',
        },
        texto: {
          es: 'Estudios con música alta, gente entrando y el tatuador mirando el reloj. Aquí solo estás tú.',
          ca: "Estudis amb música alta, gent entrant i el tatuador mirant el rellotge. Aquí només hi ets tu.",
        },
      },
      {
        etiqueta: { es: '✕ MIEDO 03', ca: '✕ POR 03' },
        titulo: {
          es: '"¿Cuánto acabará costando de verdad?"',
          ca: '"Quant acabarà costant de veritat?"',
        },
        texto: {
          es: 'Sesiones que se alargan y presupuestos que crecen. El precio se cierra antes de empezar.',
          ca: "Sessions que s'allarguen i pressupostos que creixen. El preu es tanca abans de començar.",
        },
      },
    ],
  },

  proceso: {
    eyebrow: { es: 'Cómo trabajo', ca: 'Com treballo' },
    titulo: {
      es: 'Nada de flash ni de prisas de última hora.',
      ca: "Res de flash ni de presses d'última hora.",
    },
    sub: {
      es: 'Cuatro pasos, una cita al día y todo el tiempo que la pieza necesite.',
      ca: 'Quatre passos, una cita al dia i tot el temps que la peça necessiti.',
    },
    items: [
      {
        titulo: { es: 'Hablamos la pieza', ca: 'Parlem la peça' },
        texto: {
          es: 'Me cuentas qué quieres, dónde y de qué tamaño. Por WhatsApp o en el estudio, sin compromiso.',
          ca: "M'expliques què vols, on i de quina mida. Per WhatsApp o a l'estudi, sense compromís.",
        },
      },
      {
        titulo: { es: 'Boceto antes de la sesión', ca: 'Esbós abans de la sessió' },
        texto: {
          es: 'Siempre. Te llega dibujado y lo ajustamos hasta que sea exactamente lo que tienes en la cabeza.',
          ca: "Sempre. T'arriba dibuixat i l'ajustem fins que sigui exactament el que tens al cap.",
        },
      },
      {
        titulo: { es: 'Presupuesto cerrado', ca: 'Pressupost tancat' },
        texto: {
          es: 'Precio y número de sesiones acordados antes de tumbarte. Nada se decide a mitad.',
          ca: "Preu i nombre de sessions acordats abans d'estirar-te. Res es decideix a mitges.",
        },
      },
      {
        titulo: { es: 'Tu día en el estudio', ca: "El teu dia a l'estudi" },
        texto: {
          es: 'Una cita al día. Material de un solo uso, esterilizado y a la vista, y las pausas que pidas.',
          ca: "Una cita al dia. Material d'un sol ús, esterilitzat i a la vista, i les pauses que demanis.",
        },
      },
    ],
  },

  estilos: {
    eyebrow: { es: 'Estilos', ca: 'Estils' },
    titulo: { es: 'En lo que me muevo', ca: 'En el que em moc' },
    items: [
      {
        nombre: 'Blackwork',
        texto: {
          es: 'Negro sólido y geometría. Contraste fuerte, formas que aguantan años.',
          ca: 'Negre sòlid i geometria. Contrast fort, formes que aguanten anys.',
        },
        precio: { es: `Desde ${precio}`, ca: `Des de ${precio}` },
      },
      {
        nombre: 'Dotwork',
        texto: {
          es: 'Volumen a base de puntos. Textura fina y degradados sin una sola línea.',
          ca: 'Volum a base de punts. Textura fina i degradats sense una sola línia.',
        },
        precio: { es: `Desde ${precio}`, ca: `Des de ${precio}` },
      },
      {
        nombre: 'Neotradicional',
        texto: {
          es: 'Trazo clásico con lectura actual. Ideal para piezas grandes con personaje.',
          ca: 'Traç clàssic amb lectura actual. Ideal per a peces grans amb personatge.',
        },
        precio: { es: `Desde ${precio}`, ca: `Des de ${precio}` },
      },
    ],
  },

  resena: {
    estrellas: 5,
    cita: {
      es: '"Llevaba dos años dándole vueltas al diseño y en una sesión <em>lo dejó exactamente como lo tenía en la cabeza</em>. Estudio impecable."',
      ca: '"Feia dos anys que donava voltes al disseny i en una sessió <em>el va deixar exactament com el tenia al cap</em>. Estudi impecable."',
    },
    autor: 'Nuria B.',
  },

  ctaFinal: {
    eyebrow: { es: 'Da el paso', ca: 'Fes el pas' },
    titulo: {
      es: 'Mándame la idea. <em>Te digo cómo la haría.</em>',
      ca: "Envia'm la idea. <em>Et dic com la faria.</em>",
    },
    texto: {
      es: 'Te respondo con el enfoque, las sesiones y el presupuesto. Sin compromiso y sin prisa por cerrar fecha.',
      ca: "Et responc amb l'enfocament, les sessions i el pressupost. Sense compromís i sense presses per tancar data.",
    },
  },
});

export default cliente;
