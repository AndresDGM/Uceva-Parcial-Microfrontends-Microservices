import { Book, Genre, Language } from '../../core/domain/models/book.model';
import {
  BOOK_GENRE_CLASSES,
  BOOK_GENRE_LABELS,
  BOOK_LANGUAGE_LABELS
} from './book-genre.interface';

/**
 * Representa un elemento de libro enriquecido con etiquetas de presentación para el catálogo.
 */
export interface BookTableRow extends Book {
  /** Etiqueta en español del género literario */
  genreLabel: string;
  /** Clase CSS para el estilo visual del género */
  genreClass: string;
  /** Etiqueta en español del idioma de la edición */
  languageLabel: string;
}

/**
 * Criterios de filtrado de libros en la vista de catálogo.
 */
export interface BookFilter {
  /** Género literario seleccionado para filtrar */
  genre?: Genre | '';
  /** Identificador de libro para búsqueda puntual */
  id?: string | number;
}

/**
 * Transforma una entidad `Book` del dominio en un `BookTableRow` para la capa de presentación.
 *
 * @param book - Entidad `Book` del dominio
 * @returns Objeto `BookTableRow` con etiquetas y clases CSS
 */
export function mapBookToTableRow(book: Book): BookTableRow {
  return {
    ...book,
    genreLabel: BOOK_GENRE_LABELS[book.genre as Genre] || book.genre,
    genreClass: BOOK_GENRE_CLASSES[book.genre as Genre] || '',
    languageLabel: BOOK_LANGUAGE_LABELS[book.language as Language] || book.language
  };
}

/**
 * Transforma una lista de entidades `Book` en elementos `BookTableRow`.
 *
 * @param books - Lista de libros del dominio
 * @returns Arreglo de `BookTableRow`
 */
export function mapBooksToTableRows(books: Book[]): BookTableRow[] {
  return books.map(mapBookToTableRow);
}
