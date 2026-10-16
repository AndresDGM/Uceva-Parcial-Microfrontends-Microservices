import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../../domain/models/book.model';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { BOOK_REPOSITORY_TOKEN } from '../../../domain/repositories/book-repository.token';

/**
 * Caso de uso para obtener el listado completo de libros.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar todos los libros
 * del sistema.
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
 * this.getAllBooksUseCase.execute().subscribe(books => {
 *   console.log('Books retrieved:', books.length);
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
export class GetAllBooksUseCase {

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
   * @returns Observable que emite el listado completo de libros del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  execute(): Observable<Book[]> {
    return this.bookRepository.getAll();
  }
}

