import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Genre } from '../models/genre.model';

/**
 * Contrato del repositorio de libros.
 *
 * @description
 * Define el contrato de acceso a datos para la entidad `Book`
 * dentro de la **capa de dominio**, siguiendo los principios de
 * Clean Architecture.
 *
 * Permite desacoplar la lógica de negocio de los detalles de
 * implementación de la infraestructura.
 *
 * @remarks
 * Las implementaciones pueden variar (API REST, GraphQL,
 * almacenamiento local, mocks, etc.) sin afectar a los casos de uso.
 *
 * @example
 * ```ts
 * // Inyección por contrato
 * private bookRepository = inject(BOOK_REPOSITORY_TOKEN);
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Book
 * @see Genre
 */
export interface BookRepository {
  /**
   * Obtiene el listado completo de libros disponibles en el sistema.
   *
   * @returns Observable que emite un arreglo de libros del dominio.
   *
   * @remarks
   * - No conoce la fuente de datos.
   * - No transforma entidades de presentación.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  getAll(): Observable<Book[]>;

  /**
   * Obtiene los libros filtrados según un género literario específico.
   *
   * @param genre - Género literario por el cual filtrar
   * @returns Observable que emite un arreglo de libros que pertenecen al género indicado.
   *
   * @remarks
   * - No conoce la fuente de datos.
   * - No transforma entidades de presentación.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  getAllByGenre(genre: Genre): Observable<Book[]>;

  /**
   * Obtiene un libro por su identificador único.
   *
   * @param id - Identificador único del libro
   * @returns Observable que emite el libro encontrado o null si no existe.
   *
   * @remarks
   * - No conoce la fuente de datos.
   * - No transforma entidades de presentación.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  getById(id: number): Observable<Book | null>;
}

