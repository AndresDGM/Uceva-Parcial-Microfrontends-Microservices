import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoanCreatePage } from './loan-create.page';
import { LoansService } from '../../services/loans/loans.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoanCreatePage', () => {
  let component: LoanCreatePage;
  let fixture: ComponentFixture<LoanCreatePage>;
  let loansService: jest.Mocked<LoansService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    loansService = { createLoan: jest.fn() } as jest.Mocked<LoansService>;
    router = { navigate: jest.fn() } as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [LoanCreatePage, ReactiveFormsModule],
      providers: [
        { provide: LoansService, useValue: loansService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores por defecto', () => {
    expect(component.loanForm.get('status')?.value).toBe('ACTIVE');
    expect(component.loanForm.get('loanDate')?.value).toBeTruthy();
    expect(component.loanForm.get('returnDate')?.value).toBeTruthy();
  });

  it('debe marcar formulario como inválido si faltan campos requeridos', () => {
    component.loanForm.patchValue({ bookId: null, userId: null });
    expect(component.loanForm.invalid).toBe(true);
  });

  it('debe crear préstamo y navegar al detalle', () => {
    const createdLoan = { id: 4, bookId: 101, userId: 201, loanDate: '2026-10-15', returnDate: '2026-10-29', status: 'ACTIVE' };
    loansService.createLoan.mockReturnValue(of(createdLoan));

    component.loanForm.patchValue({
      bookId: 101,
      userId: 201,
      loanDate: '2026-10-15',
      returnDate: '2026-10-29',
      status: 'ACTIVE'
    });

    component.onSubmit();

    expect(loansService.createLoan).toHaveBeenCalled();
    expect(component.isSubmitting).toBe(false);
    expect(component.success).toBe(true);
  });

  it('debe mostrar error si falla la creación', () => {
    loansService.createLoan.mockReturnValue(throwError(() => new Error('Server error')));

    component.loanForm.patchValue({
      bookId: 101,
      userId: 201,
      loanDate: '2026-10-15',
      returnDate: '2026-10-29',
      status: 'ACTIVE'
    });

    component.onSubmit();

    expect(component.error).toContain('Error al crear el préstamo');
    expect(component.isSubmitting).toBe(false);
  });

  it('debe navegar atrás al hacer clic en cancelar', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/loans']);
  });
});
