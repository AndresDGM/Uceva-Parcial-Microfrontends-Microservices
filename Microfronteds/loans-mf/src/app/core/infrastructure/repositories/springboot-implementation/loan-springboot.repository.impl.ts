import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';
import { LoanApiService } from '../services/loan-api.service';

/**
 * Implementación del repositorio de préstamos sobre el backend Spring Boot.
 *
 * @remarks
 * Pertenece a la **capa de Infrastructure** y adapta las respuestas
 * del `LoanApiService` al contrato del dominio `LoanRepository`.
 *
 * No contiene lógica de negocio: únicamente transforma datos
 * entre la fuente remota y el dominio.
 */
@Injectable()
export class LoanSpringbootRepositoryImpl extends LoanRepository {

  /** Servicio API inyectado */
  private loanApiService = inject(LoanApiService);

  /**
   * Crea un préstamo mediante el backend Spring Boot.
   *
   * @param loan - Préstamo a crear (sin ID)
   * @returns Observable que emite el préstamo creado
   */
  override create(loan: Omit<Loan, 'id'>): Observable<Loan> {
    return this.loanApiService.create(loan);
  }

  /**
   * Obtiene el listado completo de préstamos.
   *
   * @returns Observable que emite el listado de préstamos
   */
  override getAll(): Observable<Loan[]> {
    return this.loanApiService.getAll();
  }

  /**
   * Obtiene un préstamo por su ID.
   *
   * @param id - Identificador único del préstamo
   * @returns Observable que emite el préstamo encontrado o null
   */
  override getById(id: number): Observable<Loan | null> {
    return this.loanApiService.getById(id);
  }
}
