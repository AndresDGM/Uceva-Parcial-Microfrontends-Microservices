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
  genreLabel: string;
  genreClass: string;
  languageLabel: string;
}

/**
 * Criterios de filtrado de libros en la vista de catálogo.
 */
export interface BookFilter {
  genre?: Genre | '';
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
