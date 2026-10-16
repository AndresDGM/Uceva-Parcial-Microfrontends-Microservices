import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../../../domain/models/loan.model';
import { LoanRepository } from '../../../domain/repositories/loan.repository';
import { LOAN_REPOSITORY_TOKEN } from '../../../domain/repositories/loan-repository.token';

/**
 * Caso de uso para crear un nuevo loan.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de crear un loan en el sistema.
 *
 * Desacopla la capa de presentación de los detalles de acceso a datos
 * mediante el contrato `LoanRepository`.
 *
 * @remarks
 * - No depende de implementaciones concretas.
 * - No maneja estados de UI.
 * - Propaga errores al consumidor.
 *
 * @example
 * ```ts
 * const newLoan: Omit<Loan, 'id'> = { bookId: 1, userId: 2, loanDate: '2026-10-15', returnDate: '2026-10-29', status: 'ACTIVE' };
 * this.createLoanUseCase.execute(newLoan).subscribe(createdLoan => {
 *   console.log('Loan created:', createdLoan);
 * });
 * ```
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Loan
 * @see LoanRepository
 */
@Injectable()
export class CreateLoanUseCase {

  /**
   * Repositorio de loans inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private loanRepository = inject(LOAN_REPOSITORY_TOKEN);

  /**
   * Ejecuta el caso de uso.
   *
   * @param loan - Loan a crear (sin ID)
   * @returns Observable que emite el Loan creado con su ID asignado
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  execute(loan: Omit<Loan, 'id'>): Observable<Loan> {
    return this.loanRepository.create(loan);
  }
}