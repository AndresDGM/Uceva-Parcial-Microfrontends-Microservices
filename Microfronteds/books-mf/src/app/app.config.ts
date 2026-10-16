import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Domain
import { BOOK_REPOSITORY_TOKEN } from './core/domain/repositories/book-repository.token';

// Infrastructure
import { BookSpringbootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/book-springboot.repository.impl';

// Application
import { GetAllBooksUseCase } from './core/application/use-cases/book/get-all-books.usecase';
import { GetAllBooksByGenreUseCase } from './core/application/use-cases/book/get-all-books-by-genre.usecase';
import { GetBookByIdUseCase } from './core/application/use-cases/book/get-book-by-id.usecase';

/**
 * Configuración principal de la aplicación Angular.
 *
 * @remarks
 * Este objeto define los *providers* globales utilizados
 * en el arranque de la aplicación mediante la API
 * `bootstrapApplication`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: BOOK_REPOSITORY_TOKEN, useClass: BookSpringbootRepositoryImpl },
    GetAllBooksUseCase,
    GetAllBooksByGenreUseCase,
    GetBookByIdUseCase
  ]
};