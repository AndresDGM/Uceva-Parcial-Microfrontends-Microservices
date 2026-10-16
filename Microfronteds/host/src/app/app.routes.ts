import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes remotos expuestos mediante Module Federation.
 *
 * Incluye:
 * - Rutas de navegación principales (`users`, `books`, `loans`)
 * - Redirección por defecto para rutas no existentes
 */
export const routes: Routes = [
  /**
   * Ruta de usuarios.
   *
   * @remarks
   * Renderiza el componente `Users` (`UsersPage`) desde `users-mf`.
   */
  {
    path: 'users',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './UsersPage',
      }).then((m) => m.UsersPage ?? m.Users),
  },

  /**
   * Ruta de libros.
   *
   * @remarks
   * Renderiza el componente `BookListPage` (`BooksPage`) desde `books-mf`.
   */
  {
    path: 'books',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './BooksPage',
      }).then((m) => m.BooksPage ?? m.BookListPage),
  },

  /**
   * Ruta de préstamos.
   *
   * @remarks
   * Renderiza el componente `LoanListPage` (`LoansPage`) desde `loans-mf`.
   */
  {
    path: 'loans',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './LoansPage',
      }).then((m) => m.LoanListPage ?? m.LoansPage),
  },

  /**
   * Ruta de creación de préstamo.
   */
  {
    path: 'loans/create',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './LoanCreatePage',
      }).then((m) => m.LoanCreatePage),
  },

  /**
   * Ruta de detalle de préstamo.
   */
  {
    path: 'loans/:id',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './LoanDetailPage',
      }).then((m) => m.LoanDetailPage),
  },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de libros.
   */
  { path: '**', redirectTo: 'books' },
];