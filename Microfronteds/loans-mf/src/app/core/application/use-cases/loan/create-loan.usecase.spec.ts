import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { CreateLoanUseCase } from './create-loan.usecase';
import { LoanRepository } from '../../../domain/repositories/loan.repository';
import { LOAN_REPOSITORY_TOKEN } from '../../../domain/repositories/loan-repository.token';
import { Loan } from '../../../domain/models/loan.model';

describe('CreateLoanUseCase', () => {
  let useCase: CreateLoanUseCase;

  const newLoan: Omit<Loan, 'id'> = {
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-15',
    returnDate: '2026-10-29',
    status: 'ACTIVE'
  };

  const createdLoan: Loan = { id: 1, ...newLoan };
  const LoanRepositoryMock: jest.Mocked<LoanRepository> = { create: jest.fn(), getAll: jest.fn(), getById: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        CreateLoanUseCase,
        { provide: LOAN_REPOSITORY_TOKEN, useValue: LoanRepositoryMock }
      ]
    }).compileComponents();

    useCase = TestBed.inject(CreateLoanUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(CreateLoanUseCase);
  });

  it('debe crear un préstamo delegando en el repositorio', async () => {
    LoanRepositoryMock.create.mockReturnValue(of(createdLoan));

    const result = await firstValueFrom(useCase.execute(newLoan));

    expect(LoanRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(LoanRepositoryMock.create).toHaveBeenCalledWith(newLoan);
    expect(result).toEqual(createdLoan);
    expect(result.id).toBe(1);
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Failed to create loan';
    LoanRepositoryMock.create.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = useCase.execute(newLoan);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(LoanRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(LoanRepositoryMock.create).toHaveBeenCalledWith(newLoan);
  });
});