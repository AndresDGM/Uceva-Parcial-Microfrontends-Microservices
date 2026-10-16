import { InjectionToken } from '@angular/core';
import { LoanRepository } from './loan.repository';

export const LOAN_REPOSITORY_TOKEN = new InjectionToken<LoanRepository>('LoanRepository');