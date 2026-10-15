import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanTableRow } from '../../interfaces/loan.interface';

/**
 * Componente de tabla reutilizable para mostrar préstamos.
 *
 * @remarks
 * Recibe una lista de préstamos ya mapeados a LoanTableRow
 * y emite eventos para acciones: ver detalle, editar, eliminar.
 *
 * @example
 * ```html
 * <app-loan-table
 *   [loans]="loans"
 *   (viewDetail)="onViewDetail($event)"
 *   (edit)="onEdit($event)"
 *   (delete)="onDelete($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-loan-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-table.component.html',
  styleUrl: './loan-table.component.scss'
})
export class LoanTableComponent {
  /** Lista de préstamos para mostrar en la tabla */
  loans = input.required<LoanTableRow[]>();

  /** Indica si está cargando datos */
  isLoading = input(false);

  /** Mensaje cuando no hay préstamos */
  emptyMessage = input('No hay préstamos registrados');

  /** Icono para estado vacío */
  emptyIcon = input('📚');

  /** Evento emitido al hacer clic en ver detalle */
  viewDetail = output<LoanTableRow>();

  /** Evento emitido al hacer clic en editar */
  edit = output<LoanTableRow>();

  /** Evento emitido al hacer clic en eliminar */
  delete = output<LoanTableRow>();

  /** Indica si la tabla tiene datos */
  hasLoans = computed(() => this.loans().length > 0);

  /** Columnas de la tabla */
  columns = computed(() => [
    { key: 'id', header: 'ID', width: '80px' },
    { key: 'bookId', header: 'Libro ID', width: '100px' },
    { key: 'userId', header: 'Usuario ID', width: '100px' },
    { key: 'loanDate', header: 'Fecha Préstamo', width: '140px' },
    { key: 'returnDate', header: 'Fecha Devolución', width: '140px' },
    { key: 'status', header: 'Estado', width: '120px' },
    { key: 'actions', header: 'Acciones', width: '120px' }
  ]);

  /** Formatea fecha para mostrar */
  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /** Obtiene la clase CSS del badge de estado */
  getStatusClass(row: LoanTableRow): string {
    return row.statusClass || '';
  }

  /** Maneja clic en ver detalle */
  onViewDetail(row: LoanTableRow, event: Event): void {
    event.stopPropagation();
    this.viewDetail.emit(row);
  }

  /** Maneja clic en editar */
  onEdit(row: LoanTableRow, event: Event): void {
    event.stopPropagation();
    this.edit.emit(row);
  }

  /** Maneja clic en eliminar */
  onDelete(row: LoanTableRow, event: Event): void {
    event.stopPropagation();
    this.delete.emit(row);
  }

  /** TrackBy para ngFor */
  trackById(index: number, row: LoanTableRow): number {
    return row.id;
  }
}