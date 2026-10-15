import { TestBed } from '@angular/core/testing';
import { of, throwError, firstValueFrom } from 'rxjs';
import { GetAllLoansUseCase } from './get-all-loans.usecase';
import { LoanRepository } from '../../domain/repositories/loan.repository';
import { Loan } from '../../domain/models/loan.model';

describe('GetAllLoansUseCase', () => {
  let useCase: GetAllLoansUseCase;
  let loanRepository: jasmine.SpyObj<LoanRepository>;

  const loans: Loan[] = [
    { id: 1, bookId: 101, userId: 201, loanDate: '2026-10-01', returnDate: '2026-10-15', status: 'ACTIVE' },
    { id: 2, bookId: 102, userId: 202, loanDate: '2026-09-20', returnDate: '2026-10-04', status: 'OVERDUE' },
    { id: 3, bookId: 103, userId: 203, loanDate: '2026-08-15', returnDate: '2026-08-29', status: 'RETURNED' }
  ];

  beforeEach(() => {
    loanRepository = jasmine.createSpyObj('LoanRepository', ['create', 'getAll', 'getById']);

    TestBed.configureTestingModule({
      providers: [
        GetAllLoansUseCase,
        { provide: LoanRepository, useValue: loanRepository }
      ]
    });

    useCase = TestBed.inject(GetAllLoansUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe obtener todos los préstamos del repositorio', async () => {
    loanRepository.getAll.and.returnValue(of(loans));

    const result = await firstValueFrom(useCase.execute());

    expect(loanRepository.getAll).toHaveBeenCalled();
    expect(result.length).toBe(3);
    expect(result).toEqual(loans);
  });

  it('debe retornar una lista vacía cuando no hay préstamos', async () => {
    loanRepository.getAll.and.returnValue(of([]));

    const result = await firstValueFrom(useCase.execute());

    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    loanRepository.getAll.and.returnValue(throwError(() => new Error('Failed to fetch loans')));

    await expect(firstValueFrom(useCase.execute())).rejects.toThrow('Failed to fetch loans');
  });
});
