import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoanDetailPage } from './loan-detail.page';
import { LoansService } from '../../services/loans/loans.service';
import { ActivatedRoute } from '@angular/router';
import { Loan } from '../../../core/domain/models/loan.model';

describe('LoanDetailPage', () => {
  let component: LoanDetailPage;
  let fixture: ComponentFixture<LoanDetailPage>;
  let loansService: jasmine.SpyObj<LoansService>;

  const mockLoan: Loan = {
    id: 1,
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-01',
    returnDate: '2026-10-15',
    status: 'ACTIVE'
  };

  beforeEach(async () => {
    loansService = jasmine.createSpyObj('LoansService', ['getLoanById']);

    await TestBed.configureTestingModule({
      imports: [LoanDetailPage],
      providers: [
        { provide: LoansService, useValue: loansService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? '1' : null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanDetailPage);
    component = fixture.componentInstance;
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar préstamo al inicializar con ID válido', () => {
    loansService.getLoanById.and.returnValue(of(mockLoan));

    fixture.detectChanges();

    expect(loansService.getLoanById).toHaveBeenCalledWith(1);
    expect(component.loan).toEqual(mockLoan);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('debe mostrar error si préstamo no existe (null)', () => {
    loansService.getLoanById.and.returnValue(of(null));

    fixture.detectChanges();

    expect(component.error).toContain('No se encontró el préstamo');
    expect(component.loan).toBeNull();
  });

  it('debe mostrar error si falla la carga', () => {
    loansService.getLoanById.and.returnValue(throwError(() => new Error('Network error')));

    fixture.detectChanges();

    expect(component.error).toContain('Error al cargar el préstamo');
  });

  it('debe formatear fecha correctamente', () => {
    expect(component.formatDate('2026-10-15')).toBe('15/10/2026');
    expect(component.formatDate('')).toBe('-');
  });

  it('debe obtener etiqueta de estado correctamente', () => {
    expect(component.getStatusLabel('ACTIVE')).toBe('Activo');
    expect(component.getStatusLabel('RETURNED')).toBe('Devuelto');
    expect(component.getStatusLabel('OVERDUE')).toBe('Vencido');
  });

  it('debe obtener clase CSS de estado correctamente', () => {
    expect(component.getStatusClass('ACTIVE')).toBe('status-active');
    expect(component.getStatusClass('RETURNED')).toBe('status-returned');
    expect(component.getStatusClass('OVERDUE')).toBe('status-overdue');
  });

  it('debe obtener icono de estado correctamente', () => {
    expect(component.getStatusIcon('ACTIVE')).toBe('📚');
    expect(component.getStatusIcon('RETURNED')).toBe('✅');
    expect(component.getStatusIcon('OVERDUE')).toBe('⚠️');
  });
});