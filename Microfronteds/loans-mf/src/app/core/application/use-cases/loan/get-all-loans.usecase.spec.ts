import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { GetAllLoansUseCase } from './get-all-loans.usecase';
import { LoanRepository } from '../../../domain/repositories/loan.repository';
import { LOAN_REPOSITORY_TOKEN } from '../../../domain/repositories/loan-repository.token';
import { Loan } from '../../../domain/models/loan.model';

describe('GetAllLoansUseCase', () => {
  let useCase: GetAllLoansUseCase;

  const loans: Loan[] = [
    { id: 1, bookId: 101, userId: 201, loanDate: '2026-10-01', returnDate: '2026-10-15', status: 'ACTIVE' },
    { id: 2, bookId: 102, userId: 202, loanDate: '2026-09-20', returnDate: '2026-10-04', status: 'OVERDUE' },
    { id: 3, bookId: 103, userId: 203, loanDate: '2026-08-15', returnDate: '2026-08-29', status: 'RETURNED' }
  ];

  const LoanRepositoryMock: jest.Mocked<LoanRepository> = { create: jest.fn(), getAll: jest.fn(), getById: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllLoansUseCase,
        { provide: LOAN_REPOSITORY_TOKEN, useValue: LoanRepositoryMock }
      ]
    }).compileComponents();

    useCase = TestBed.inject(GetAllLoansUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllLoansUseCase);
  });

  it('debe obtener todos los préstamos del repositorio', async () => {
    LoanRepositoryMock.getAll.mockReturnValue(of(loans));

    const result = await firstValueFrom(useCase.execute());

    expect(LoanRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(3);
    expect(result).toEqual(loans);
  });

  it('debe retornar una lista vacía cuando no hay préstamos', async () => {
    LoanRepositoryMock.getAll.mockReturnValue(of([]));

    const result = await firstValueFrom(useCase.execute());

    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Failed to fetch loans';
    LoanRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = useCase.execute();
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(LoanRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});