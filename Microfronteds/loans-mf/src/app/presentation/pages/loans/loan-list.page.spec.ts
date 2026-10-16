import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoanListPage } from './loan-list.page';
import { LoansService } from '../../services/loans/loans.service';
import { Loan } from '../../../core/domain/models/loan.model';
import { ActivatedRoute } from '@angular/router';

describe('LoanListPage', () => {
  let component: LoanListPage;
  let fixture: ComponentFixture<LoanListPage>;
  let loansService: jest.Mocked<LoansService>;

  const mockLoans: Loan[] = [
    { id: 1, bookId: 101, userId: 201, loanDate: '2026-10-01', returnDate: '2026-10-15', status: 'ACTIVE' },
    { id: 2, bookId: 102, userId: 202, loanDate: '2026-09-20', returnDate: '2026-10-04', status: 'OVERDUE' },
    { id: 3, bookId: 103, userId: 203, loanDate: '2026-08-15', returnDate: '2026-08-29', status: 'RETURNED' }
  ];

  beforeEach(async () => {
    loansService = { getAllLoans: jest.fn(), deleteLoan: jest.fn() } as jest.Mocked<LoansService>;

    // Mock window.confirm
    global.confirm = jest.fn(() => true);

    await TestBed.configureTestingModule({
      imports: [LoanListPage],
      providers: [
        { provide: LoansService, useValue: loansService },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanListPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar préstamos al inicializar', () => {
    loansService.getAllLoans.mockReturnValue(of(mockLoans));

    fixture.detectChanges();

    expect(loansService.getAllLoans).toHaveBeenCalled();
    expect(component.loans.length).toBe(3);
    expect(component.isLoading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('debe mostrar error cuando falla la carga', () => {
    loansService.getAllLoans.mockReturnValue(throwError(() => new Error('Failed to fetch')));

    fixture.detectChanges();

    expect(component.error).toContain('Error al cargar los préstamos');
    expect(component.isLoading).toBe(false);
  });

  it('debe eliminar préstamo y actualizar lista', () => {
    loansService.getAllLoans.mockReturnValue(of(mockLoans));
    loansService.deleteLoan.mockReturnValue(of(void 0));

    fixture.detectChanges();

    component.onDelete(component.loans[0]);

    expect(loansService.deleteLoan).toHaveBeenCalledWith(1);
    expect(component.loans.length).toBe(2);
    expect(component.loans.find(l => l.id === 1)).toBeUndefined();
  });

  it('debe mostrar error al fallar eliminación', () => {
    loansService.getAllLoans.mockReturnValue(of(mockLoans));
    loansService.deleteLoan.mockReturnValue(throwError(() => new Error('Delete failed')));

    fixture.detectChanges();

    component.onDelete(component.loans[0]);

    expect(component.error).toContain('Error al eliminar el préstamo');
  });
});