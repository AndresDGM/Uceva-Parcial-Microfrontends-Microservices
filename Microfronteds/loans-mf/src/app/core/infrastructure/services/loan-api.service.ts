import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Loan } from '../../domain/models/loan.model';
import { tap, catchError } from 'rxjs/operators';

/**
 * Servicio de infraestructura para acceder a la API de loans.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa
 * como un **Data Source** que provee información desde el backend
 * Spring Boot mediante peticiones HTTP.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso.
 *
 * Es utilizado por repositorios de infraestructura que adaptan
 * los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class LoanApiService {

  /** URL base del backend SpringBoot para loans */
  private readonly springBootUrl = `${environment.baseUrlSpringBoot}/api`;

  /** Headers comunes para las peticiones */
  private httpHeaders = {
    'Content-Type': 'application/json'
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Crea un nuevo loan mediante una petición HTTP POST.
   *
   * @param loan - Objeto Loan sin ID (el backend lo generará)
   * @returns Observable que emite el Loan creado con su ID
   *
   * @example
   * ```ts
   * const loan: Loan = { bookId: 1, userId: 2, loanDate: '2026-10-15', returnDate: '2026-10-29', status: 'ACTIVE' };
   * this.loanApiService.create(loan).subscribe(createdLoan => {
   *   console.log('Loan created with ID:', createdLoan.id);
   * });
   * ```
   */
  create(loan: Omit<Loan, 'id'>): Observable<Loan> {
    return this.httpClient.post<Loan>(`${this.springBootUrl}/loans`, loan, { headers: this.httpHeaders })
      .pipe(
        tap(createdLoan => {
          console.log('Loan created:', createdLoan);
        }),
        catchError(error => {
          console.error('Error creating loan:', error);
          return throwError(() => new Error('Failed to create loan'));
        })
      );
  }

  /**
   * Obtiene el listado de todos los loan mediante una petición HTTP GET.
   *
   * @returns Observable que emite un arreglo de Loan
   *
   * @example
   * ```ts
   * this.loanApiService.getAll().subscribe(loans => {
   *   console.log('Loans retrieved:', loans.length);
   * });
   * ```
   */
  getAll(): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.springBootUrl}/loans`, { headers: this.httpHeaders })
      .pipe(
        tap(loans => {
          console.log(`Retrieved ${loans.length} loans`);
        }),
        catchError(error => {
          console.error('Error fetching loans:', error);
          return throwError(() => new Error('Failed to fetch loans'));
        })
      );
  }

  /**
   * Obtiene un loan específico por su ID mediante una petición HTTP GET.
   *
   * @param id - Identificador único del loan
   * @returns Observable que emite el Loan encontrado o null si no existe
   *
   * @example
   * ```ts
   * this.loanApiService.getById(1).subscribe(loan => {
   *   if (loan) {
   *     console.log('Loan found:', loan);
   *   } else {
   *     console.log('Loan not found');
   *   }
   * });
   * ```
   */
  getById(id: number): Observable<Loan | null> {
    return this.httpClient.get<Loan>(`${this.springBootUrl}/loans/${id}`, { headers: this.httpHeaders })
      .pipe(
        tap(loan => {
          console.log(`Loan ${id} retrieved:`, loan);
        }),
        catchError(error => {
          if (error.status === 404) {
            console.log(`Loan ${id} not found`);
            return [null];
          }
          console.error(`Error fetching loan ${id}:`, error);
          return throwError(() => new Error('Failed to fetch loan'));
        })
      );
  }
}