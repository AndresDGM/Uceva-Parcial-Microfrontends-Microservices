import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Loan } from '../../../core/domain/models/loan.model';

/**
 * Servicio de presentación para gestión de préstamos.
 *
 * @remarks
 * Encapsula las llamadas HTTP al backend Spring Boot.
 * Usado por la capa de presentación (páginas y componentes).
 * No contiene lógica de negocio, solo comunicación con la API.
 */
@Injectable({ providedIn: 'root' })
export class LoansService {

  private readonly apiUrl = `${environment.baseUrlSpringBoot}/api/loans`;
  private http = inject(HttpClient);

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  createLoan(loan: Omit<Loan, 'id'>): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  updateLoan(id: number, loan: Partial<Loan>): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}`, loan);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}