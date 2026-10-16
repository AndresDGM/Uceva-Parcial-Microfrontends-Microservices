import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, Genre } from '../../../domain/models/book.model';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { BookApiService } from '../../services/book-api.service';

/**
 * Implementación del repositorio de libros sobre el backend Spring Boot.
 *
 * @remarks
 * Pertenece a la **capa de Infrastructure** y adapta las respuestas
 * del `BookApiService` al contrato del dominio `BookRepository`.
 *
 * No contiene lógica de negocio: únicamente delega y adapta datos
 * entre la fuente remota y el dominio.
 */
@Injectable()
export class BookSpringbootRepositoryImpl implements BookRepository {

  /** Servicio API inyectado */
  private readonly bookApiService = inject(BookApiService);

  /**
   * Obtiene el listado completo de libros desde el backend Spring Boot.
   *
   * @returns Observable que emite el listado de libros
   */
  getAll(): Observable<Book[]> {
    return this.bookApiService.getAll();
  }

  /**
   * Obtiene los libros filtrados por género literario desde el backend Spring Boot.
   *
   * @param genre - Género literario por el cual filtrar
   * @returns Observable que emite el listado de libros del género indicado
   */
  getAllByGenre(genre: Genre): Observable<Book[]> {
    return this.bookApiService.getAllByGenre(genre);
  }

  /**
   * Obtiene un libro por su ID desde el backend Spring Boot.
   *
   * @param id - Identificador único del libro
   * @returns Observable que emite el libro encontrado o null
   */
  getById(id: number): Observable<Book | null> {
    return this.bookApiService.getById(id);
  }
}

