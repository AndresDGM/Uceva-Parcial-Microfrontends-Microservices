import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookTableComponent } from '../../components/book-table/book-table.component';
import { AlertComponent, AlertType } from '../../components/alert/alert.component';
import { BookTableRow, mapBooksToTableRows, mapBookToTableRow } from '../../interfaces/book.interface';
import { GENRE_OPTIONS } from '../../interfaces/book-genre.interface';
import { Genre } from '../../../core/domain/models/book.model';
import { BOOK_REPOSITORY_TOKEN } from '../../../core/domain/repositories/book-repository.token';
import { BookSpringbootRepositoryImpl } from '../../../core/infrastructure/repositories/springboot-implementation/book-springboot.repository.impl';
import { GetAllBooksUseCase } from '../../../core/application/use-cases/book/get-all-books.usecase';
import { GetAllBooksByGenreUseCase } from '../../../core/application/use-cases/book/get-all-books-by-genre.usecase';
import { GetBookByIdUseCase } from '../../../core/application/use-cases/book/get-book-by-id.usecase';

/**
 * Página principal de catálogo, búsqueda y detalle modal de libros.
 *
 * @remarks
 * Consume los casos de uso `GetAllBooksUseCase`, `GetAllBooksByGenreUseCase` y
 * `GetBookByIdUseCase` para presentar el catálogo en una cuadrícula de tarjetas
 * y mostrar el detalle completo en una ventana flotante accesible.
 *
 * Se expone como `BooksPage` en Module Federation para ser consumida
 * por el host.
 */
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookTableComponent, AlertComponent],
  providers: [
    { provide: BOOK_REPOSITORY_TOKEN, useClass: BookSpringbootRepositoryImpl },
    GetAllBooksUseCase,
    GetAllBooksByGenreUseCase,
    GetBookByIdUseCase
  ],
  templateUrl: './book-list.page.html',
  styleUrl: './book-list.page.scss'
})
export class BookListPage implements OnInit, OnDestroy {
  /** Caso de uso para obtener todos los libros */
  private readonly getAllBooksUseCase = inject(GetAllBooksUseCase);

  /** Caso de uso para filtrar libros por género */
  private readonly getAllBooksByGenreUseCase = inject(GetAllBooksByGenreUseCase);

  /** Caso de uso para consultar un libro por su ID */
  private readonly getBookByIdUseCase = inject(GetBookByIdUseCase);

  /** Referencia al botón de cierre del modal para gestión de foco */
  @ViewChild('modalCloseBtn') modalCloseBtn?: ElementRef<HTMLButtonElement>;

  /** Libros para mostrar en la cuadrícula */
  books: BookTableRow[] = [];

  /** Opciones de géneros literarios disponibles */
  readonly genreOptions = GENRE_OPTIONS;

  /** Género seleccionado actualmente en el filtro */
  selectedGenre: Genre | '' = '';

  /** Valor del campo de búsqueda por ID */
  searchIdInput = '';

  /** Estado de carga del catálogo */
  isLoading = false;

  /** Mensaje de error o aviso en la vista principal */
  error: string | null = null;

  /** Tipo de alerta para el mensaje de la vista principal */
  alertType: AlertType = 'error';

  /** Libro seleccionado para mostrar en la ventana flotante */
  selectedBook: BookTableRow | null = null;

  /** Indica si la ventana flotante de detalle está abierta */
  isModalOpen = false;

  /** Indica si se está consultando un libro por ID para el modal */
  isDetailLoading = false;

  /** Error ocurrido al consultar el detalle de un libro por ID */
  modalError: string | null = null;

  /** Último ID buscado para permitir reintentar en caso de fallo */
  lastSearchedId: number | null = null;

  /** Conjunto de IDs con error de carga de portada en el modal */
  private readonly failedModalCovers = new Set<number>();

  /** Elemento que tenía el foco antes de abrir el modal */
  private previouslyFocusedElement: HTMLElement | null = null;

  /** Inicializa el componente cargando el catálogo de libros */
  ngOnInit(): void {
    this.loadBooks();
  }

  /** Libera el bloqueo de scroll del documento al destruir el componente */
  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  /** Cierra el modal al presionar la tecla Escape */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isModalOpen && !this.isDetailLoading) {
      this.closeModal();
    }
  }

  /** Carga el listado completo de libros */
  loadBooks(): void {
    this.isLoading = true;
    this.error = null;
    this.selectedGenre = '';

    this.getAllBooksUseCase.execute().subscribe({
      next: (books) => {
        this.books = mapBooksToTableRows(books);
        this.isLoading = false;
      },
      error: (err) => {
        this.alertType = 'error';
        this.error = 'Error al cargar los libros: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  /** Filtra los libros según el género literario seleccionado */
  onGenreChange(genre: Genre | ''): void {
    this.selectedGenre = genre;
    this.error = null;

    if (!genre) {
      this.loadBooks();
      return;
    }

    this.isLoading = true;

    this.getAllBooksByGenreUseCase.execute(genre).subscribe({
      next: (books) => {
        this.books = mapBooksToTableRows(books);
        this.isLoading = false;
      },
      error: (err) => {
        this.alertType = 'error';
        this.error = 'Error al filtrar los libros por género: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  /** Limpia los filtros activos y restaura el catálogo completo */
  clearFilters(): void {
    this.searchIdInput = '';
    this.error = null;
    if (this.selectedGenre !== '') {
      this.loadBooks();
    } else if (this.books.length === 0) {
      this.loadBooks();
    }
  }

  /** Busca un libro por su ID y abre directamente el modal de detalle */
  onSearchById(): void {
    if (this.isDetailLoading) {
      return;
    }

    const trimmed = String(this.searchIdInput ?? '').trim();
    if (!trimmed) {
      this.alertType = 'warning';
      this.error = 'Ingresa un ID de libro para realizar la búsqueda.';
      return;
    }

    const parsedId = Number(trimmed);
    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      this.alertType = 'warning';
      this.error = 'El ID del libro debe ser un número entero positivo.';
      return;
    }

    this.error = null;
    this.lastSearchedId = parsedId;
    this.saveActiveFocus();
    this.isModalOpen = true;
    this.isDetailLoading = true;
    this.modalError = null;
    this.selectedBook = null;
    this.lockBodyScroll();

    this.getBookByIdUseCase.execute(parsedId).subscribe({
      next: (book) => {
        this.isDetailLoading = false;
        if (book) {
          this.selectedBook = mapBookToTableRow(book);
          this.focusModalCloseButton();
        } else {
          this.closeModal();
          this.alertType = 'info';
          this.error = `No se encontró ningún libro con el ID ${parsedId}.`;
        }
      },
      error: (err) => {
        this.isDetailLoading = false;
        this.modalError = 'Error al consultar el libro: ' + err.message;
        this.focusModalCloseButton();
      }
    });
  }

  /** Reintenta la última búsqueda por ID desde el modal */
  retrySearchById(): void {
    if (this.lastSearchedId !== null) {
      this.searchIdInput = String(this.lastSearchedId);
      this.onSearchById();
    }
  }

  /** Abre la ventana flotante con el detalle completo del libro seleccionado */
  onViewDetail(book: BookTableRow): void {
    this.error = null;
    this.saveActiveFocus();
    this.selectedBook = book;
    this.modalError = null;
    this.isDetailLoading = false;
    this.isModalOpen = true;
    this.lockBodyScroll();
    this.focusModalCloseButton();
  }

  /** Cierra la ventana flotante y restaura el foco y el desplazamiento */
  closeModal(): void {
    this.isModalOpen = false;
    this.isDetailLoading = false;
    this.modalError = null;
    this.selectedBook = null;
    this.unlockBodyScroll();
    this.restorePreviousFocus();
  }

  /** Cierra el modal al hacer clic en el fondo oscuro si no hay carga activa */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && !this.isDetailLoading) {
      this.closeModal();
    }
  }

  /** Verifica si la portada del libro en el modal es válida */
  hasValidModalCover(book: BookTableRow): boolean {
    return Boolean(
      book.coverImageUrl &&
      book.coverImageUrl.trim().length > 0 &&
      !this.failedModalCovers.has(book.id)
    );
  }

  /** Registra error de carga de portada en el modal */
  onModalCoverError(bookId: number): void {
    this.failedModalCovers.add(bookId);
  }

  /** Verifica si la URL del documento digital PDF es válida */
  hasValidPdfUrl(url: string | undefined | null): boolean {
    if (!url) return false;
    const trimmed = url.trim();
    return trimmed.startsWith('http://') || trimmed.startsWith('https://');
  }

  /** Formatea fecha ISO a formato dd/MM/yyyy */
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

  /** Guarda el elemento HTML con foco activo antes de abrir el modal */
  private saveActiveFocus(): void {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      this.previouslyFocusedElement = document.activeElement;
    }
  }

  /** Traslada el foco del teclado al botón de cierre del modal */
  private focusModalCloseButton(): void {
    setTimeout(() => {
      this.modalCloseBtn?.nativeElement?.focus();
    }, 0);
  }

  /** Restaura el foco al elemento que estaba activo antes de abrir el modal */
  private restorePreviousFocus(): void {
    if (this.previouslyFocusedElement) {
      setTimeout(() => {
        this.previouslyFocusedElement?.focus();
        this.previouslyFocusedElement = null;
      }, 0);
    }
  }

  /** Bloquea el desplazamiento vertical del documento de fondo */
  private lockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  /** Restaura el desplazamiento vertical del documento de fondo */
  private unlockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}

export { BookListPage as BooksPage };

