import { Genre } from './genre.model';
import { Language } from './language.model';

export { Genre } from './genre.model';
export { Language } from './language.model';

/**
 * Interfaz que representa un libro dentro del sistema de biblioteca.
 *
 * Contiene toda la información bibliográfica, metadatos y enlaces de acceso
 * digital correspondientes a la obra.
 *
 * @remarks
 * Cada libro posee un `id` único, referencia a su autor (`authorId`),
 * metadatos editoriales, categorización por idioma y género literario,
 * así como enlaces a su portada y documento digital en PDF.
 *
 * @example
 * ```ts
 * const libro: Book = {
 *   id: 1,
 *   title: 'Cien años de soledad',
 *   authorId: 1,
 *   isbn: '978-3-16-148410-0',
 *   publicationYear: '1967-05-30T00:00:00Z',
 *   publisher: 'Editorial Sudamericana',
 *   pages: 400,
 *   description: 'Una obra maestra de la literatura hispanoamericana',
 *   language: Language.SPANISH,
 *   genre: Genre.FANTASY,
 *   coverImageUrl: 'https://picsum.photos/seed/book1/400/600',
 *   pdfUrl: 'https://samplepdf.org/files/sample.pdf'
 * };
 * ```
 */
export interface Book {
  /** Identificador único del libro en el sistema */
  id: number;

  /** Título oficial de la obra literaria */
  title: string;

  /** Identificador del autor de la obra */
  authorId: number;

  /** Código estándar internacional del libro (ISBN) */
  isbn: string;

  /** Fecha y hora de publicación de la obra (formato ISO-8601) */
  publicationYear: string;

  /** Editorial encargada de la publicación del libro */
  publisher: string;

  /** Cantidad total de páginas que componen el libro */
  pages: number;

  /** Sinopsis o descripción resumida del contenido del libro */
  description: string;

  /** Idioma en el cual se encuentra escrito el libro */
  language: Language;

  /** Género o categoría literaria a la que pertenece la obra */
  genre: Genre;

  /** URL pública de la imagen de portada del libro */
  coverImageUrl: string;

  /** URL de descarga o visualización del documento digital en PDF */
  pdfUrl: string;
}

