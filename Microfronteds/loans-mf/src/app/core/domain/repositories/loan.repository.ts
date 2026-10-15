import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

/**
 * Contrato del repositorio de préstamos.
 *
 * @description
 * Define el contrato de acceso a datos para la entidad `Loan`
 * dentro de la **capa de dominio**, siguiendo los principios de
 * Clean Architecture.
 *
 * Permite desacoplar la lógica de negocio de los detalles de
 * implementación de la infraestructura.
 *
 * @remarks
 * Las implementaciones pueden variar (API REST, GraphQL,
 * almacenamiento local, mocks, etc.) sin afectar a los casos de uso.
 *
 * @example
 * ```ts
 * // Inyección por contrato
 * constructor(private loanRepository: LoanRepository) {}
 * ```
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Loan
 */
export abstract class LoanRepository {

  /**
   * Crea un nuevo préstamo.
   *
   * @param loan - Objeto préstamo a crear (sin ID, ya que lo genera el backend)
   * @returns Observable que emite el préstamo creado con su ID asignado
   *
   * @remarks
   * - No conoce la fuente de datos.
   * - No transforma entidades de presentación.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  abstract create(loan: Omit<Loan, 'id'>): Observable<Loan>;

  /**
   * Obtiene el listado completo de préstamos.
   *
   * @returns Observable que emite un arreglo de préstamos del dominio.
   *
   * @remarks
   * - No conoce la fuente de datos.
   * - No transforma entidades de presentación.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  abstract getAll(): Observable<Loan[]>;

  /**
   * Obtiene un préstamo por su ID.
   *
   * @param id - Identificador único del préstamo
   * @returns Observable que emite el préstamo encontrado o null si no existe
   *
   * @remarks
   * - No conoce la fuente de datos.
   * - No transforma entidades de presentación.
   * - Mantiene el dominio independiente de la infraestructura.
   */
  abstract getById(id: number): Observable<Loan | null>;
}