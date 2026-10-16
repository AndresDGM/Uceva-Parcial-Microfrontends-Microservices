import { Routes } from '@angular/router';
import { LoanListPage } from './presentation/pages/loans/loan-list.page';
import { LoanCreatePage } from './presentation/pages/loans/loan-create.page';
import { LoanDetailPage } from './presentation/pages/loans/loan-detail.page';

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
    path: 'loans',
    component: LoanListPage,
    title: 'Préstamos'
  },
  {
    path: 'loans/create',
    component: LoanCreatePage,
    title: 'Nuevo Préstamo'
  },
  {
    path: 'loans/:id',
    component: LoanDetailPage,
    title: 'Detalle del Préstamo'
  },
  {
    path: '',
    redirectTo: '/loans',
    pathMatch: 'full'
  }
];
