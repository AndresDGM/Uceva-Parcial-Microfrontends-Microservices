import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, Genre } from '../../../domain/models/book.model';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { BOOK_REPOSITORY_TOKEN } from '../../../domain/repositories/book-repository.token';

/**
 * Caso de uso para obtener libros filtrados por género literario.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar los libros que coinciden
 * con un género literario específico.
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
 * this.getAllBooksByGenreUseCase.execute(Genre.FANTASY).subscribe(books => {
 *   console.log('Fantasy books retrieved:', books.length);
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Book
 * @see Genre
 * @see BookRepository
 */
@Injectable()
export class GetAllBooksByGenreUseCase {

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
   * @param genre - Género literario por el cual filtrar los libros
   * @returns Observable que emite el listado de libros pertenecientes al género indicado.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  execute(genre: Genre): Observable<Book[]> {
    return this.bookRepository.getAllByGenre(genre);
  }
}

