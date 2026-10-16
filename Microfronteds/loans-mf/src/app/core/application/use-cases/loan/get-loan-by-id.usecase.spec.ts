import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { GetLoanByIdUseCase } from './get-loan-by-id.usecase';
import { LoanRepository } from '../../../domain/repositories/loan.repository';
import { LOAN_REPOSITORY_TOKEN } from '../../../domain/repositories/loan-repository.token';
import { Loan } from '../../../domain/models/loan.model';

describe('GetLoanByIdUseCase', () => {
  let useCase: GetLoanByIdUseCase;

  const loan: Loan = {
    id: 1,
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-01',
    returnDate: '2026-10-15',
    status: 'ACTIVE'
  };

  const LoanRepositoryMock: jest.Mocked<LoanRepository> = { create: jest.fn(), getAll: jest.fn(), getById: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetLoanByIdUseCase,
        { provide: LOAN_REPOSITORY_TOKEN, useValue: LoanRepositoryMock }
      ]
    }).compileComponents();

    useCase = TestBed.inject(GetLoanByIdUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetLoanByIdUseCase);
  });

  it('debe obtener un préstamo por su ID', async () => {
    LoanRepositoryMock.getById.mockReturnValue(of(loan));

    const result = await firstValueFrom(useCase.execute(1));

    expect(LoanRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(LoanRepositoryMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(loan);
    expect(result?.id).toBe(1);
  });

  it('debe retornar null cuando el préstamo no existe', async () => {
    LoanRepositoryMock.getById.mockReturnValue(of(null));

    const result = await firstValueFrom(useCase.execute(999));

    expect(result).toBeNull();
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Failed to fetch loan';
    LoanRepositoryMock.getById.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = useCase.execute(1);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(LoanRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(LoanRepositoryMock.getById).toHaveBeenCalledWith(1);
  });
});