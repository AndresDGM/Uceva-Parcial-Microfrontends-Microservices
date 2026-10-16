import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { LoanSpringbootRepositoryImpl } from './loan-springboot.repository.impl';
import { LoanApiService } from '../../services/loan-api.service';
import { Loan } from '../../../domain/models/loan.model';

describe('LoanSpringbootRepositoryImpl', () => {
  let repository: LoanSpringbootRepositoryImpl;

  const loan: Loan = {
    id: 1,
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-01',
    returnDate: '2026-10-15',
    status: 'ACTIVE'
  };

  const LoanApiServiceMock: jest.Mocked<LoanApiService> = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LoanSpringbootRepositoryImpl,
        { provide: LoanApiService, useValue: LoanApiServiceMock }
      ]
    }).compileComponents();

    repository = TestBed.inject(LoanSpringbootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeInstanceOf(LoanSpringbootRepositoryImpl);
  });

  it('debe delegar create en el servicio API', async () => {
    LoanApiServiceMock.create.mockReturnValue(of(loan));

    const result = await firstValueFrom(repository.create(loan));

    expect(LoanApiServiceMock.create).toHaveBeenCalledTimes(1);
    expect(LoanApiServiceMock.create).toHaveBeenCalledWith(loan);
    expect(result).toEqual(loan);
  });

  it('debe delegar getAll en el servicio API', async () => {
    LoanApiServiceMock.getAll.mockReturnValue(of([loan]));

    const result = await firstValueFrom(repository.getAll());

    expect(LoanApiServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([loan]);
  });

  it('debe delegar getById en el servicio API', async () => {
    LoanApiServiceMock.getById.mockReturnValue(of(loan));

    const result = await firstValueFrom(repository.getById(1));

    expect(LoanApiServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(LoanApiServiceMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(loan);
  });

  it('debe retornar null cuando el préstamo no existe', async () => {
    LoanApiServiceMock.getById.mockReturnValue(of(null));

    const result = await firstValueFrom(repository.getById(999));

    expect(result).toBeNull();
  });

  it('debe propagar el error del servicio API', async () => {
    const errorMessage = 'Failed to fetch loans';
    LoanApiServiceMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = repository.getAll();
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(LoanApiServiceMock.getAll).toHaveBeenCalledTimes(1);
  });
});