import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTableRow } from '../../interfaces/book.interface';

/**
 * Componente de cuadrícula de tarjetas para mostrar el catálogo de libros.
 *
 * @remarks
 * Recibe una lista de libros mapeados a `BookTableRow` y presenta cada obra
 * en una tarjeta accesible con portada, título, autor y etiqueta de género.
 * Emite el evento `viewDetail` al seleccionar una tarjeta mediante clic o teclado.
 */
@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})
export class BookTableComponent {
  /** Lista de libros para mostrar en la cuadrícula */
  books = input.required<BookTableRow[]>();

  /** Indica si está cargando datos */
  isLoading = input(false);

  /** Título cuando no hay resultados */
  emptyTitle = input('Sin libros disponibles');

  /** Mensaje descriptivo cuando no hay libros */
  emptyMessage = input('No hay libros registrados en el catálogo.');

  /** Evento emitido al seleccionar una tarjeta para ver su detalle */
  viewDetail = output<BookTableRow>();

  /** Conjunto de IDs de libros cuya imagen de portada falló al cargar */
  private readonly failedCoverIds = new Set<number>();

  /** Indica si el catálogo tiene libros para mostrar */
  hasBooks = computed(() => this.books().length > 0);

  /** Verifica si un libro tiene una portada válida y sin error de carga */
  hasValidCover(book: BookTableRow): boolean {
    return Boolean(book.coverImageUrl && book.coverImageUrl.trim().length > 0 && !this.failedCoverIds.has(book.id));
  }

  /** Registra el fallo de carga de la portada de un libro para mostrar el placeholder SVG */
  onCoverError(bookId: number): void {
    this.failedCoverIds.add(bookId);
  }

  /** Obtiene la clase CSS del badge de género */
  getGenreClass(row: BookTableRow): string {
    return row.genreClass || '';
  }

  /** Maneja la selección de una tarjeta por clic o tecla Enter */
  onViewDetail(row: BookTableRow, event?: Event): void {
    event?.stopPropagation();
    this.viewDetail.emit(row);
  }

  /** Maneja la selección de una tarjeta mediante la barra espaciadora */
  onCardKeydownSpace(row: BookTableRow, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.viewDetail.emit(row);
  }

  /** TrackBy para iteración de tarjetas */
  trackById(index: number, row: BookTableRow): number {
    return row.id;
  }
}
