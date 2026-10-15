import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';

/**
 * Caso de uso para obtener un loan por su ID.
 *
 * @description
 * Este caso de uso pertenece a la **capa de aplicación** y encapsula
 * la acción de negocio encargada de recuperar un loan específico
 * del sistema mediante su identificador único.
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
 * this.getLoanByIdUseCase.execute(1).subscribe(loan => {
 *   if (loan) {
 *     console.log('Loan found:', loan);
 *   } else {
 *     console.log('Loan not found');
 *   }
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
export class GetLoanByIdUseCase {

  /**
   * Repositorio de loans inyectado por contrato.
   *
   * @remarks
   * La implementación concreta se define en la capa de infraestructura.
   */
  private loanRepository = inject(LoanRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador único del loan a buscar
   * @returns Observable que emite el Loan encontrado o null si no existe
   *
   * @remarks
   * - Delegación directa al repositorio.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  execute(id: number): Observable<Loan | null> {
    return this.loanRepository.getById(id);
  }
}