import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Book, Genre, Language } from '../core/domain/models/book.model';

/**
 * Crea un `ActivatedRoute` simulado para pruebas unitarias.
 *
 * @param id - Valor del parámetro `id` de la ruta
 * @returns Objeto parcial de `ActivatedRoute` con `paramMap`
 *
 * @remarks
 * Se usa para probar páginas que leen parámetros
 * de la URL como `BookDetailPage`.
 */
export function createActivatedRouteMock(id: string | null): ActivatedRoute {
  return {
    snapshot: {
      paramMap: convertToParamMap(id ? { id } : {})
    }
  } as unknown as ActivatedRoute;
}

/**
 * Lista de libros de prueba.
 *
 * @remarks
 * Datos ficticios utilizados en las pruebas unitarias.
 */
export const mockBooks: Book[] = [
  {
    id: 1,
    title: 'Cien años de soledad',
    authorId: 1,
    isbn: '978-3-16-148410-0',
    publicationYear: '1967-05-30T00:00:00Z',
    publisher: 'Editorial Sudamericana',
    pages: 400,
    description: 'Una obra maestra de la literatura hispanoamericana',
    language: Language.SPANISH,
    genre: Genre.FANTASY,
    coverImageUrl: 'https://picsum.photos/seed/book1/400/600',
    pdfUrl: 'https://samplepdf.org/files/sample.pdf'
  },
  {
    id: 2,
    title: 'Clean Code',
    authorId: 2,
    isbn: '978-0-13-235088-4',
    publicationYear: '2008-08-01T00:00:00Z',
    publisher: 'Prentice Hall',
    pages: 464,
    description: 'A Handbook of Agile Software Craftsmanship',
    language: Language.ENGLISH,
    genre: Genre.NON_FICTION,
    coverImageUrl: 'https://picsum.photos/seed/book2/400/600',
    pdfUrl: 'https://samplepdf.org/files/sample.pdf'
  },
  {
    id: 3,
    title: 'Dune',
    authorId: 3,
    isbn: '978-0-441-17271-9',
    publicationYear: '1965-08-01T00:00:00Z',
    publisher: 'Chilton Books',
    pages: 412,
    description: 'Clásico de la ciencia ficción ambientado en el planeta desértico Arrakis',
    language: Language.ENGLISH,
    genre: Genre.SCIENCE_FICTION,
    coverImageUrl: 'https://picsum.photos/seed/book3/400/600',
    pdfUrl: 'https://samplepdf.org/files/sample.pdf'
  }
];

/**
 * Libro individual de prueba.
 *
 * @remarks
 * Instancia única de `Book` utilizada en pruebas de detalle y consulta por ID.
 */
export const mockBook: Book = mockBooks[0];

export { of };

