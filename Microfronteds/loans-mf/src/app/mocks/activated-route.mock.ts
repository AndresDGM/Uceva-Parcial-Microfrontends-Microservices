import { ConvertToParamMap, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Loan } from '../core/domain/models/loan.model';

/**
 * Crea un `ActivatedRoute` simulado para pruebas unitarias.
 *
 * @param id - Valor del parámetro `id` de la ruta
 * @returns Objeto parcial de `ActivatedRoute` con `paramMap`
 *
 * @remarks
 * Se usa para probar páginas que leen parámetros
 * de la URL como `LoanDetailPage`.
 */
export function createActivatedRouteMock(id: string | null): ActivatedRoute {
  return {
    snapshot: {
      paramMap: new ConvertToParamMap(id ? { id } : {})
    }
  } as unknown as ActivatedRoute;
}

/**
 * Lista de loans de prueba.
 *
 * @remarks
 * Datos ficticios utilizados en las pruebas unitarias.
 */
export const mockLoans: Loan[] = [
  { id: 1, bookId: 101, userId: 201, loanDate: '2026-10-01', returnDate: '2026-10-15', status: 'ACTIVE' },
  { id: 2, bookId: 102, userId: 202, loanDate: '2026-09-20', returnDate: '2026-10-04', status: 'OVERDUE' },
  { id: 3, bookId: 103, userId: 203, loanDate: '2026-08-15', returnDate: '2026-08-29', status: 'RETURNED' }
];

/**
 * Loan individual de prueba.
 *
 * @remarks
 * Préstamo sin ID tal como lo envía el formulario.
 */
export const mockNewLoan: Omit<Loan, 'id'> = {
  bookId: 104,
  userId: 204,
  loanDate: '2026-10-15',
  returnDate: '2026-10-29',
  status: 'ACTIVE'
};

/**
 * Loan creado de prueba (con ID asignado).
 */
export const mockCreatedLoan: Loan = {
  id: 4,
  ...mockNewLoan
};

export { of };
