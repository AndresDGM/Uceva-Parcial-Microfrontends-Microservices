import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { Book, Genre, Language } from '../../../core/domain/models/book.model';
import { GetBookByIdUseCase } from '../../../core/application/use-cases/book/get-book-by-id.usecase';
import {
  BOOK_GENRE_CLASSES,
  BOOK_GENRE_ICONS,
  BOOK_GENRE_LABELS,
  BOOK_LANGUAGE_LABELS
} from '../../interfaces/book-genre.interface';

/**
 * Página de detalle de un libro.
 *
 * @remarks
 * Muestra la información bibliográfica completa de un libro específico,
 * su portada y enlace al documento digital en PDF.
 * Obtiene el ID de la ruta y ejecuta el caso de uso `GetBookByIdUseCase`.
 */
@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AlertComponent],
  templateUrl: './book-detail.page.html',
  styleUrl: './book-detail.page.scss'
})
export class BookDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly getBookByIdUseCase = inject(GetBookByIdUseCase);

  book: Book | null = null;
  isLoading = false;
  error: string | null = null;

  readonly genreLabels = BOOK_GENRE_LABELS;
  readonly genreClasses = BOOK_GENRE_CLASSES;
  readonly genreIcons = BOOK_GENRE_ICONS;
  readonly languageLabels = BOOK_LANGUAGE_LABELS;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && !isNaN(+idParam)) {
      this.loadBook(+idParam);
    } else {
      this.error = 'ID de libro no válido';
    }
  }

  /** Carga la información detallada del libro por su ID */
  loadBook(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.getBookByIdUseCase.execute(id).subscribe({
      next: (book) => {
        if (book) {
          this.book = book;
        } else {
          this.error = `No se encontró el libro con ID ${id}`;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el libro: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  /** Regresa a la página anterior en el historial */
  goBack(): void {
    window.history.back();
  }

  /** Formatea una fecha ISO a formato legible en español */
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

  /** Obtiene la etiqueta en español del género literario */
  getGenreLabel(genre: Genre | string): string {
    return this.genreLabels[genre as Genre] || genre;
  }

  /** Obtiene la clase CSS asociada al género literario */
  getGenreClass(genre: Genre | string): string {
    return this.genreClasses[genre as Genre] || '';
  }

  /** Obtiene el icono asociado al género literario */
  getGenreIcon(genre: Genre | string): string {
    return this.genreIcons[genre as Genre] || '📚';
  }

  /** Obtiene la etiqueta en español del idioma */
  getLanguageLabel(language: Language | string): string {
    return this.languageLabels[language as Language] || language;
  }
}

