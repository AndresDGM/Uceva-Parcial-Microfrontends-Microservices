import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoanCreatePage } from './loan-create.page';
import { LoansService } from '../../services/loans/loans.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoanCreatePage', () => {
  let component: LoanCreatePage;
  let fixture: ComponentFixture<LoanCreatePage>;
  let loansService: jasmine.SpyObj<LoansService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    loansService = jasmine.createSpyObj('LoansService', ['createLoan']);
    router = jasmine.createSpyObj('Router', ['navigate']);

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
    expect(component.loanForm.invalid).toBeTrue();
  });

  it('debe crear préstamo y navegar al detalle', () => {
    const createdLoan = { id: 4, bookId: 101, userId: 201, loanDate: '2026-10-15', returnDate: '2026-10-29', status: 'ACTIVE' };
    loansService.createLoan.and.returnValue(of(createdLoan));

    component.loanForm.patchValue({
      bookId: 101,
      userId: 201,
      loanDate: '2026-10-15',
      returnDate: '2026-10-29',
      status: 'ACTIVE'
    });

    component.onSubmit();

    expect(loansService.createLoan).toHaveBeenCalled();
    expect(component.isSubmitting).toBeFalse();
    expect(component.success).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith(['/loans', 4]);
  });

  it('debe mostrar error si falla la creación', () => {
    loansService.createLoan.and.returnValue(throwError(() => new Error('Server error')));

    component.loanForm.patchValue({
      bookId: 101,
      userId: 201,
      loanDate: '2026-10-15',
      returnDate: '2026-10-29',
      status: 'ACTIVE'
    });

    component.onSubmit();

    expect(component.error).toContain('Error al crear el préstamo');
    expect(component.isSubmitting).toBeFalse();
  });

  it('debe navegar atrás al hacer clic en cancelar', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/loans']);
  });
});