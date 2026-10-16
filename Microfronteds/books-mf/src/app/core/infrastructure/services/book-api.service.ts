import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Book, Genre } from '../../domain/models/book.model';

/**
 * Servicio de infraestructura para acceder a la API de libros.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa
 * como un **Data Source** que provee información desde el backend
 * Spring Boot (`books-service`) mediante peticiones HTTP.
 *
 * - No contiene lógica de negocio.
 * - No debe ser consumido directamente por los casos de uso.
 *
 * Es utilizado por repositorios de infraestructura que adaptan
 * los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class BookApiService {

  /** URL base del backend Spring Boot para libros */
  private readonly springBootUrl = `${environment.baseUrlSpringBoot}/api`;

  /** Headers comunes para las peticiones */
  private readonly httpHeaders = {
    'Content-Type': 'application/json'
  };

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Obtiene el listado de todos los libros mediante una petición HTTP GET.
   *
   * @returns Observable que emite un arreglo de `Book`
   *
   * @example
   * ```ts
   * this.bookApiService.getAll().subscribe(books => {
   *   console.log('Books retrieved:', books.length);
   * });
   * ```
   */
  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.springBootUrl}/books/`, { headers: this.httpHeaders })
      .pipe(
        tap(books => {
          console.log(`Retrieved ${books.length} books`);
        }),
        catchError(error => {
          console.error('Error fetching books:', error);
          return throwError(() => new Error('Failed to fetch books'));
        })
      );
  }

  /**
   * Obtiene los libros filtrados por género literario mediante una petición HTTP GET.
   *
   * @param genre - Género literario por el cual filtrar
   * @returns Observable que emite un arreglo de `Book` correspondientes al género
   *
   * @example
   * ```ts
   * this.bookApiService.getAllByGenre(Genre.FANTASY).subscribe(books => {
   *   console.log('Fantasy books retrieved:', books.length);
   * });
   * ```
   */
  getAllByGenre(genre: Genre): Observable<Book[]> {
    const genreKey =
      (Object.keys(Genre) as Array<keyof typeof Genre>).find(key => Genre[key] === genre) ?? genre;

    return this.httpClient.get<Book[]>(`${this.springBootUrl}/books/genre/${genreKey}`, { headers: this.httpHeaders })
      .pipe(
        tap(books => {
          console.log(`Retrieved ${books.length} books for genre ${genreKey}`);
        }),
        catchError(error => {
          console.error(`Error fetching books by genre ${genreKey}:`, error);
          return throwError(() => new Error('Failed to fetch books by genre'));
        })
      );
  }

  /**
   * Obtiene un libro específico por su ID mediante una petición HTTP GET.
   *
   * @param id - Identificador único del libro
   * @returns Observable que emite el `Book` encontrado o `null` si no existe
   *
   * @example
   * ```ts
   * this.bookApiService.getById(1).subscribe(book => {
   *   if (book) {
   *     console.log('Book found:', book);
   *   } else {
   *     console.log('Book not found');
   *   }
   * });
   * ```
   */
  getById(id: number): Observable<Book | null> {
    return this.httpClient.get<Book>(`${this.springBootUrl}/books/${id}`, { headers: this.httpHeaders })
      .pipe(
        tap(book => {
          console.log(`Book ${id} retrieved:`, book);
        }),
        catchError(error => {
          if (error.status === 404) {
            console.log(`Book ${id} not found`);
            return of(null);
          }
          console.error(`Error fetching book ${id}:`, error);
          return throwError(() => new Error('Failed to fetch book'));
        })
      );
  }
}

