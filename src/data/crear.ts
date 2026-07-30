// Fábrica de clientes del template Tattoo.
// Recibe el negocio y el contenido, y devuelve un `Cliente` completo derivando
// lo que sale del propio negocio (título SEO, eyebrow del hero, endpoint del
// formulario). Así el email o la ciudad se escriben una sola vez y no pueden
// quedar desincronizados. Cualquier campo derivado se puede sobreescribir.
import type {
  Cliente,
  CtaFinal,
  Estilos,
  Footer,
  Formulario,
  Hero,
  Miedos,
  Nav,
  Negocio,
  Proceso,
  Resena,
  Seo,
} from './tipos';

/** Ancla e id de la sección de proceso cuando el cliente no los define. */
const ID_PROCESO = 'trabajo';

export interface EntradaCliente {
  negocio: Negocio;
  nav: Nav;
  /** `eyebrow` y `hrefSecundario` se derivan si no los pasas. */
  hero: Omit<Hero, 'eyebrow' | 'hrefSecundario'> & Partial<Pick<Hero, 'eyebrow' | 'hrefSecundario'>>;
  miedos: Miedos;
  /** `id` por defecto: 'trabajo'. */
  proceso: Omit<Proceso, 'id'> & Partial<Pick<Proceso, 'id'>>;
  estilos: Estilos;
  /** `fuente` por defecto: reseña Google. */
  resena: Omit<Resena, 'fuente'> & Partial<Pick<Resena, 'fuente'>>;
  ctaFinal: CtaFinal;
  /** Todo opcional: se deriva del negocio. */
  seo?: Partial<Seo>;
  /** Todo opcional: `action` sale del email del negocio. */
  formulario?: Partial<Formulario>;
  /** `creditos` por defecto: "Web hecha por 73webs". */
  footer?: Partial<Footer>;
}

export function crearCliente(entrada: EntradaCliente): Cliente {
  const { negocio } = entrada;
  const { nombre, ciudad, email, url } = negocio;
  const idProceso = entrada.proceso.id ?? ID_PROCESO;

  return {
    negocio,

    seo: {
      title: `${nombre} — Estudio de tatuajes en ${ciudad}`,
      description: `Estudio de tatuajes en ${ciudad}. Diseño personalizado, higiene certificada y un artista que entiende tu idea antes de tocar la piel. Reserva tu cita sin compromiso.`,
      canonical: url,
      ogDescription: 'Diseño personalizado, higiene certificada y un artista que entiende tu idea. Reserva tu cita.',
      jsonLdDescription: `Estudio de tatuajes en ${ciudad}. Diseño personalizado e higiene certificada.`,
      ...entrada.seo,
    },

    nav: entrada.nav,

    hero: {
      eyebrow: {
        es: `Estudio de tatuajes · ${ciudad}`,
        ca: `Estudi de tatuatges · ${ciudad}`,
      },
      hrefSecundario: `#${idProceso}`,
      ...entrada.hero,
    },

    miedos: entrada.miedos,

    proceso: { id: idProceso, ...entrada.proceso },

    estilos: entrada.estilos,

    resena: {
      fuente: { es: 'reseña Google', ca: 'ressenya Google' },
      ...entrada.resena,
    },

    ctaFinal: entrada.ctaFinal,

    formulario: {
      action: `https://formsubmit.co/${email}`,
      asunto: 'Nueva solicitud desde la web',
      ...entrada.formulario,
    },

    footer: {
      creditos: { es: 'Web hecha por', ca: 'Web feta per' },
      ...entrada.footer,
    },
  };
}
