import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { LoanApiService } from './loan-api.service';
import { Loan } from '../../domain/models/loan.model';
import { environment } from '../../../../environments/environment';

describe('LoanApiService', () => {
  let service: LoanApiService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrlSpringBoot}/api/loans`;

  const loan: Loan = {
    id: 1,
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-01',
    returnDate: '2026-10-15',
    status: 'ACTIVE'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        LoanApiService
      ],
    });
    service = TestBed.inject(LoanApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('debe crear un préstamo vía POST', (done) => {
      service.create(loan).subscribe(result => {
        expect(result).toEqual(loan);
        done();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(loan);
    });

    it('debe manejar el error cuando falla la creación (líneas 56-57)', (done) => {
      service.create(loan).subscribe({
        next: () => done.fail('No debería emitir un valor'),
        error: (error) => {
          expect(error.message).toBe('Failed to create loan');
          done();
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getAll', () => {
    it('debe obtener todos los préstamos vía GET', (done) => {
      const loans = [loan];

      service.getAll().subscribe(result => {
        expect(result.length).toBe(1);
        expect(result).toEqual(loans);
        done();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(loans);
    });

    it('debe manejar el error cuando falla getAll (líneas 81-82)', (done) => {
      service.getAll().subscribe({
        next: () => done.fail('No debería emitir un valor'),
        error: (error) => {
          expect(error.message).toBe('Failed to fetch loans');
          done();
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getById', () => {
    it('debe obtener un préstamo por ID vía GET', (done) => {
      service.getById(1).subscribe(result => {
        expect(result).toEqual(loan);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(loan);
    });

    it('debe retornar null cuando el préstamo no existe (404)', (done) => {
      service.getById(999).subscribe(result => {
        expect(result).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 404, statusText: 'Not Found' });
    });

    it('debe manejar el error cuando falla getById con error distinto a 404 (líneas 115-116)', (done) => {
      service.getById(1).subscribe({
        next: () => done.fail('No debería emitir un valor'),
        error: (error) => {
          expect(error.message).toBe('Failed to fetch loan');
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });
});