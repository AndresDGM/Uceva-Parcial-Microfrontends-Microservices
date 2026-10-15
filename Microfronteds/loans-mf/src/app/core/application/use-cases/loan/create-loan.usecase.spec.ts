import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CreateLoanUseCase } from './create-loan.usecase';
import { LoanRepository } from '../../domain/repositories/loan.repository';
import { Loan } from '../../domain/models/loan.model';

describe('CreateLoanUseCase', () => {
  let useCase: CreateLoanUseCase;
  let loanRepository: jasmine.SpyObj<LoanRepository>;

  const newLoan: Omit<Loan, 'id'> = {
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-15',
    returnDate: '2026-10-29',
    status: 'ACTIVE'
  };

  const createdLoan: Loan = { id: 1, ...newLoan };

  beforeEach(() => {
    loanRepository = jasmine.createSpyObj('LoanRepository', ['create', 'getAll', 'getById']);

    TestBed.configureTestingModule({
      providers: [
        CreateLoanUseCase,
        { provide: LoanRepository, useValue: loanRepository }
      ]
    });

    useCase = TestBed.inject(CreateLoanUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe crear un préstamo delegando en el repositorio', () => {
    loanRepository.create.and.returnValue(of(createdLoan));

    let result: Loan | undefined;
    useCase.execute(newLoan).subscribe(loan => {
      result = loan;
    });

    expect(loanRepository.create).toHaveBeenCalledWith(newLoan);
    expect(result).toEqual(createdLoan);
    expect(result?.id).toBe(1);
  });

  it('debe propagar el error cuando el repositorio falla', () => {
    loanRepository.create.and.returnValue(throwError(() => new Error('Failed to create loan')));

    let error: Error | undefined;
    useCase.execute(newLoan).subscribe({
      error: err => {
        error = err;
      }
    });

    expect(error?.message).toBe('Failed to create loan');
  });
});
