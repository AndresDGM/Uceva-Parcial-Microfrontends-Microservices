export type LoanStatus = 'ACTIVE' | 'RETURNED' | 'OVERDUE';

export const LOAN_STATUS_LABELS: Record<LoanStatus, string> = {
  ACTIVE: 'Activo',
  RETURNED: 'Devuelto',
  OVERDUE: 'Vencido'
};

export const LOAN_STATUS_CLASSES: Record<LoanStatus, string> = {
  ACTIVE: 'status-active',
  RETURNED: 'status-returned',
  OVERDUE: 'status-overdue'
};

export const LOAN_STATUS_ICONS: Record<LoanStatus, string> = {
  ACTIVE: '📚',
  RETURNED: '✅',
  OVERDUE: '⚠️'
};