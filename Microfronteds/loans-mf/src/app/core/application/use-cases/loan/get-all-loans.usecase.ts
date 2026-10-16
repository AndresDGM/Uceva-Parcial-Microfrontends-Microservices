import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../../../domain/models/loan.model';
import { LoanRepository } from '../../../domain/repositories/loan.repository';
import { LOAN_REPOSITORY_TOKEN } from '../../../domain/repositories/loan-repository.token';

/**
 * Caso de uso para obtener el listado completo de loans.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar todos los loans
 * del sistema.
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
 * this.getAllLoansUseCase.execute().subscribe(loans => {
 *   console.log('Loans retrieved:', loans.length);
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
export class GetAllLoansUseCase {

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
   * @returns Observable que emite el listado completo de loans del dominio.
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  execute(): Observable<Loan[]> {
    return this.loanRepository.getAll();
  }
}