// Micro-etiquetas de interfaz, iguales para todos los clientes.
// Viven aquí y no en el archivo de cada negocio para que ese archivo solo
// contenga contenido del cliente. Un cliente puede sobreescribirlas pasando
// `etiquetas` a <Formulario />.
import type { Texto } from './tipos';

export interface EtiquetasFormulario {
  nombre: Texto;
  /** Igual en ES y CA, se imprime tal cual. */
  email: string;
  telefono: Texto;
  estilo: Texto;
  mensaje: Texto;
  enviar: Texto;
  whatsapp: Texto;
}

export const formulario: EtiquetasFormulario = {
  nombre: { es: 'Nombre', ca: 'Nom' },
  email: 'Email',
  telefono: { es: 'Teléfono (opcional)', ca: 'Telèfon (opcional)' },
  estilo: { es: '¿Qué estilo te interesa?', ca: "Quin estil t'interessa?" },
  mensaje: { es: 'Cuéntame tu idea', ca: "Explica'm la teva idea" },
  enviar: { es: 'Enviar solicitud', ca: 'Envia la sol·licitud' },
  whatsapp: { es: 'O por WhatsApp', ca: 'O per WhatsApp' },
};
