import { Loan } from '../../../core/domain/models/loan.model';
import { LoanStatus } from './loan-status.interface';

export interface LoanFormData {
  bookId: number;
  userId: number;
  loanDate: string;
  returnDate: string;
  status: LoanStatus;
}

export type CreateLoanFormData = Omit<LoanFormData, 'status'> & { status?: LoanStatus };

export interface LoanTableRow extends Loan {
  statusLabel: string;
  statusClass: string;
  statusIcon: string;
}

export interface LoanDetailView extends Loan {
  statusLabel: string;
  statusClass: string;
  statusIcon: string;
}

export interface LoanFilter {
  search?: string;
  status?: LoanStatus;
  userId?: number;
  bookId?: number;
}

export interface LoanSort {
  field: keyof Loan;
  direction: 'asc' | 'desc';
}

export interface LoansPageState {
  loans: Loan[];
  filteredLoans: Loan[];
  isLoading: boolean;
  error: string | null;
  filter: LoanFilter;
  sort: LoanSort;
}

export const DEFAULT_LOAN_SORT: LoanSort = {
  field: 'loanDate',
  direction: 'desc'
};

export const DEFAULT_LOAN_FILTER: LoanFilter = {};

export function mapLoanToTableRow(loan: Loan): LoanTableRow {
  return {
    ...loan,
    statusLabel: LOAN_STATUS_LABELS[loan.status as LoanStatus] || loan.status,
    statusClass: LOAN_STATUS_CLASSES[loan.status as LoanStatus] || '',
    statusIcon: LOAN_STATUS_ICONS[loan.status as LoanStatus] || ''
  };
}

export function mapLoansToTableRows(loans: Loan[]): LoanTableRow[] {
  return loans.map(mapLoanToTableRow);
}

import { LOAN_STATUS_LABELS, LOAN_STATUS_CLASSES, LOAN_STATUS_ICONS } from './loan-status.interface';