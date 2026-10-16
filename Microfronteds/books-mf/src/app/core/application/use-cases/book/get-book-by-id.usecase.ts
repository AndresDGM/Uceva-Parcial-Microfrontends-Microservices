import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../../domain/models/book.model';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { BOOK_REPOSITORY_TOKEN } from '../../../domain/repositories/book-repository.token';

/**
 * Caso de uso para obtener un libro por su ID.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar un libro específico
 * del sistema mediante su identificador único.
 *
 * Desacopla la capa de presentación de los detalles de acceso a datos
 * mediante el contrato `BookRepository`.
 *
 * @remarks
 * - No depende de implementaciones concretas.
 * - No maneja estados de UI.
 * - Propaga errores al consumidor.
 *
 * @example
 * ```ts
 * this.getBookByIdUseCase.execute(1).subscribe(book => {
 *   if (book) {
 *     console.log('Book found:', book);
 *   } else {
 *     console.log('Book not found');
 *   }
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Book
 * @see BookRepository
 */
@Injectable()
export class GetBookByIdUseCase {

  /**
   * Repositorio de libros inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private bookRepository = inject(BOOK_REPOSITORY_TOKEN);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador único del libro a buscar
   * @returns Observable que emite el libro encontrado o null si no existe
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  execute(id: number): Observable<Book | null> {
    return this.bookRepository.getById(id);
  }
}

