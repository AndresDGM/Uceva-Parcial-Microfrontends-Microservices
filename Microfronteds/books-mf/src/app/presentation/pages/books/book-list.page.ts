import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookTableComponent } from '../../components/book-table/book-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { BookTableRow, mapBooksToTableRows } from '../../interfaces/book.interface';
import { GENRE_OPTIONS } from '../../interfaces/book-genre.interface';
import { Genre } from '../../../core/domain/models/book.model';
import { GetAllBooksUseCase } from '../../../core/application/use-cases/book/get-all-books.usecase';
import { GetAllBooksByGenreUseCase } from '../../../core/application/use-cases/book/get-all-books-by-genre.usecase';

/**
 * Página principal de catálogo y filtrado de libros.
 *
 * @remarks
 * Esta página es el punto de entrada del microfrontend de libros.
 * Consume los casos de uso `GetAllBooksUseCase` y `GetAllBooksByGenreUseCase`
 * para listar y filtrar los libros, mostrándolos mediante `BookTableComponent`.
 */
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookTableComponent, AlertComponent],
  templateUrl: './book-list.page.html',
  styleUrl: './book-list.page.scss'
})
export class BookListPage implements OnInit {
  /** Caso de uso para obtener todos los libros */
  private readonly getAllBooksUseCase = inject(GetAllBooksUseCase);

  /** Caso de uso para filtrar libros por género */
  private readonly getAllBooksByGenreUseCase = inject(GetAllBooksByGenreUseCase);

  /** Router para navegación a detalle */
  private readonly router = inject(Router);

  /** Libros para mostrar en la tabla */
  books: BookTableRow[] = [];

  /** Opciones de géneros literarios disponibles */
  readonly genreOptions = GENRE_OPTIONS;

  /** Género seleccionado actualmente en el filtro */
  selectedGenre: Genre | '' = '';

  /** ID de búsqueda rápida */
  searchId: number | null = null;

  /** Estado de carga */
  isLoading = false;

  /** Mensaje de error si ocurre algún fallo */
  error: string | null = null;

  ngOnInit(): void {
    this.loadBooks();
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
        this.error = 'Error al cargar los libros: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  /** Filtra los libros según el género literario seleccionado */
  onGenreChange(genre: Genre | ''): void {
    this.selectedGenre = genre;
    if (!genre) {
      this.loadBooks();
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.getAllBooksByGenreUseCase.execute(genre).subscribe({
      next: (books) => {
        this.books = mapBooksToTableRows(books);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al filtrar los libros por género: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  /** Navega al detalle de un libro buscado por su ID */
  onSearchById(): void {
    if (this.searchId && this.searchId > 0) {
      this.router.navigate(['/books', this.searchId]);
    }
  }

  /** Navega a la vista de detalle del libro seleccionado */
  onViewDetail(book: BookTableRow): void {
    this.router.navigate(['/books', book.id]);
  }
}

