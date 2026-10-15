import { TestBed } from '@angular/core/testing';
import { of, throwError, firstValueFrom } from 'rxjs';
import { LoanSpringbootRepositoryImpl } from './loan-springboot.repository.impl';
import { LoanApiService } from '../../services/loan-api.service';
import { Loan } from '../../../domain/models/loan.model';

describe('LoanSpringbootRepositoryImpl', () => {
  let repository: LoanSpringbootRepositoryImpl;
  let apiService: jasmine.SpyObj<LoanApiService>;

  const loan: Loan = {
    id: 1,
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-01',
    returnDate: '2026-10-15',
    status: 'ACTIVE'
  };

  beforeEach(() => {
    apiService = jasmine.createSpyObj('LoanApiService', ['create', 'getAll', 'getById']);

    TestBed.configureTestingModule({
      providers: [
        LoanSpringbootRepositoryImpl,
        { provide: LoanApiService, useValue: apiService }
      ]
    });

    repository = TestBed.inject(LoanSpringbootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar create en el servicio API', async () => {
    apiService.create.and.returnValue(of(loan));

    const result = await firstValueFrom(repository.create(loan));

    expect(apiService.create).toHaveBeenCalledWith(loan);
    expect(result).toEqual(loan);
  });

  it('debe delegar getAll en el servicio API', async () => {
    apiService.getAll.and.returnValue(of([loan]));

    const result = await firstValueFrom(repository.getAll());

    expect(apiService.getAll).toHaveBeenCalled();
    expect(result).toEqual([loan]);
  });

  it('debe delegar getById en el servicio API', async () => {
    apiService.getById.and.returnValue(of(loan));

    const result = await firstValueFrom(repository.getById(1));

    expect(apiService.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(loan);
  });

  it('debe retornar null cuando el préstamo no existe', async () => {
    apiService.getById.and.returnValue(of(null));

    const result = await firstValueFrom(repository.getById(999));

    expect(result).toBeNull();
  });

  it('debe propagar el error del servicio API', async () => {
    apiService.getAll.and.returnValue(throwError(() => new Error('Failed to fetch loans')));

    await expect(firstValueFrom(repository.getAll())).rejects.toThrow('Failed to fetch loans');
  });
});
