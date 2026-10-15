/**
 * Interfaz que representa un préstamo en el sistema de biblioteca.
 *
 * Contiene la información necesaria para gestionar los préstamos de libros.
 *
 * @remarks
 * Cada préstamo debe tener un `id` único, referencias al libro y usuario,
 * fechas de préstamo y devolución, y un estado que indique su situación actual.
 *
 * @example
 * ```ts
 * const prestamo: Loan = {
 *   id: 1,
 *   bookId: 101,
 *   userId: 201,
 *   loanDate: '2026-10-15',
 *   returnDate: '2026-10-29',
 *   status: 'ACTIVE'
 * };
 * ```
 */
export interface Loan {
    /** Identificador único del préstamo */
    id: number;

    /** Identificador del libro asociado al préstamo */
    bookId: number;

    /** Identificador del usuario que solicita el préstamo */
    userId: number;

    /** Fecha en que se otorgó el préstamo (formato ISO: yyyy-MM-dd) */
    loanDate: string;

    /** Fecha en que se espera la devolución del libro (formato ISO: yyyy-MM-dd) */
    returnDate: string;

    /** Estado actual del préstamo (ej: ACTIVE, RETURNED, OVERDUE) */
    status: string;
}