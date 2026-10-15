import { TestBed } from '@angular/core/testing';
import { of, throwError, firstValueFrom } from 'rxjs';
import { GetLoanByIdUseCase } from './get-loan-by-id.usecase';
import { LoanRepository } from '../../domain/repositories/loan.repository';
import { Loan } from '../../domain/models/loan.model';

describe('GetLoanByIdUseCase', () => {
  let useCase: GetLoanByIdUseCase;
  let loanRepository: jasmine.SpyObj<LoanRepository>;

  const loan: Loan = {
    id: 1,
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-01',
    returnDate: '2026-10-15',
    status: 'ACTIVE'
  };

  beforeEach(() => {
    loanRepository = jasmine.createSpyObj('LoanRepository', ['create', 'getAll', 'getById']);

    TestBed.configureTestingModule({
      providers: [
        GetLoanByIdUseCase,
        { provide: LoanRepository, useValue: loanRepository }
      ]
    });

    useCase = TestBed.inject(GetLoanByIdUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe obtener un préstamo por su ID', async () => {
    loanRepository.getById.and.returnValue(of(loan));

    const result = await firstValueFrom(useCase.execute(1));

    expect(loanRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(loan);
    expect(result?.id).toBe(1);
  });

  it('debe retornar null cuando el préstamo no existe', async () => {
    loanRepository.getById.and.returnValue(of(null));

    const result = await firstValueFrom(useCase.execute(999));

    expect(result).toBeNull();
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    loanRepository.getById.and.returnValue(throwError(() => new Error('Failed to fetch loan')));

    await expect(firstValueFrom(useCase.execute(1))).rejects.toThrow('Failed to fetch loan');
  });
});
