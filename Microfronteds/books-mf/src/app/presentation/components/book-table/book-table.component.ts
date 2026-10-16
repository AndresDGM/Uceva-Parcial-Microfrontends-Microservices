import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTableRow } from '../../interfaces/book.interface';

/**
 * Componente de tabla reutilizable para mostrar el catálogo de libros.
 *
 * @remarks
 * Recibe una lista de libros mapeados a `BookTableRow`
 * y emite eventos para ver el detalle de un libro.
 *
 * @example
 * ```html
 * <app-book-table
 *   [books]="books"
 *   [isLoading]="isLoading"
 *   (viewDetail)="onViewDetail($event)"
 * />
 * ```
 */
@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})
export class BookTableComponent {
  /** Lista de libros para mostrar en la tabla */
  books = input.required<BookTableRow[]>();

  /** Indica si está cargando datos */
  isLoading = input(false);

  /** Mensaje cuando no hay libros */
  emptyMessage = input('No hay libros registrados');

  /** Icono para estado vacío */
  emptyIcon = input('📚');

  /** Evento emitido al hacer clic en ver detalle */
  viewDetail = output<BookTableRow>();

  /** Indica si la tabla tiene datos */
  hasBooks = computed(() => this.books().length > 0);

  /** Columnas de la tabla */
  columns = computed(() => [
    { key: 'id', header: 'ID', width: '70px' },
    { key: 'title', header: 'Título', width: '240px' },
    { key: 'publisher', header: 'Editorial', width: '180px' },
    { key: 'isbn', header: 'ISBN', width: '160px' },
    { key: 'genre', header: 'Género', width: '150px' },
    { key: 'language', header: 'Idioma', width: '120px' },
    { key: 'pages', header: 'Páginas', width: '90px' },
    { key: 'publicationYear', header: 'Publicación', width: '120px' },
    { key: 'actions', header: 'Acciones', width: '100px' }
  ]);

  /** Formatea fecha ISO para mostrar */
  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /** Obtiene la clase CSS del badge de género */
  getGenreClass(row: BookTableRow): string {
    return row.genreClass || '';
  }

  /** Maneja clic en ver detalle */
  onViewDetail(row: BookTableRow, event: Event): void {
    event.stopPropagation();
    this.viewDetail.emit(row);
  }

  /** TrackBy para iteración de filas */
  trackById(index: number, row: BookTableRow): number {
    return row.id;
  }
}

