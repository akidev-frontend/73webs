// Contrato de datos del template Tattoo.
// Cada cliente es un archivo en src/data/clientes/ que cumple `Cliente`.
// Los componentes no traen contenido: todo lo que se ve sale de aquí.

/** Par de textos ES/CA. Admite HTML inline (<em>, <strong>). */
export interface Texto {
  es: string;
  ca: string;
}

export interface Negocio {
  nombre: string;
  ciudad: string;
  telefono: string;
  email: string;
  direccion: string;
  horario: string;
  instagram: string;
  /** URL completa del enlace, incluido https://wa.me/... */
  whatsapp: string;
  url: string;
  imagen: string;
  priceRange: string;
}

export interface Seo {
  title: string;
  description: string;
  canonical: string;
  /** Descripción corta para Open Graph. */
  ogDescription: string;
  /** Descripción para el JSON-LD de TattooParlor. */
  jsonLdDescription: string;
}

export interface Nav {
  cta: Texto;
}

export interface Hero {
  eyebrow: Texto;
  titulo: Texto;
  lead: Texto;
  ctaPrimario: Texto;
  ctaSecundario: Texto;
  /** Ancla o URL del botón secundario. */
  hrefSecundario: string;
}

export interface Miedo {
  etiqueta: Texto;
  titulo: Texto;
  texto: Texto;
}

export interface Miedos {
  eyebrow: Texto;
  titulo: Texto;
  sub: Texto;
  items: Miedo[];
}

export interface Paso {
  titulo: Texto;
  texto: Texto;
}

export interface Proceso {
  /** id de la sección, destino del ancla del hero. */
  id: string;
  eyebrow: Texto;
  titulo: Texto;
  sub: Texto;
  items: Paso[];
}

export interface Estilo {
  nombre: string;
  texto: Texto;
  precio: Texto;
}

export interface Estilos {
  eyebrow: Texto;
  titulo: Texto;
  items: Estilo[];
}

export interface Resena {
  estrellas: number;
  cita: Texto;
  autor: string;
  fuente: Texto;
}

export interface CtaFinal {
  eyebrow: Texto;
  titulo: Texto;
  texto: Texto;
}

export interface Formulario {
  /** Endpoint del POST. */
  action: string;
  /** Asunto del email que llega al cliente. */
  asunto: string;
}

export interface Footer {
  creditos: Texto;
}

export interface Cliente {
  negocio: Negocio;
  seo: Seo;
  nav: Nav;
  hero: Hero;
  miedos: Miedos;
  proceso: Proceso;
  estilos: Estilos;
  resena: Resena;
  ctaFinal: CtaFinal;
  formulario: Formulario;
  footer: Footer;
}
