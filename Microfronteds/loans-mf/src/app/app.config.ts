import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Domain
import { LoanRepository } from './core/domain/repositories/loan.repository';

// Infrastructure
import { LoanSpringbootRepositoryImpl } from './core/infrastructure/repositories/springboot-implementation/loan-springboot.repository.impl';

// Application
import { CreateLoanUseCase } from './core/application/use-cases/loan/create-loan.usecase';
import { GetAllLoansUseCase } from './core/application/use-cases/loan/get-all-loans.usecase';
import { GetLoanByIdUseCase } from './core/application/use-cases/loan/get-loan-by-id.usecase';

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
    { provide: LoanRepository, useClass: LoanSpringbootRepositoryImpl },
    CreateLoanUseCase,
    GetAllLoansUseCase,
    GetLoanByIdUseCase
  ]
};
