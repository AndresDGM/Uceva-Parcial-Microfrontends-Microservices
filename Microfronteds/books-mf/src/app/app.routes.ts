import { Routes } from '@angular/router';
import { BookListPage } from './presentation/pages/books/book-list.page';
import { BookDetailPage } from './presentation/pages/books/book-detail.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 */
export const routes: Routes = [
  {
    path: 'books',
    component: BookListPage,
    title: 'Libros'
  },
  {
    path: 'books/:id',
    component: BookDetailPage,
    title: 'Detalle del Libro'
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];