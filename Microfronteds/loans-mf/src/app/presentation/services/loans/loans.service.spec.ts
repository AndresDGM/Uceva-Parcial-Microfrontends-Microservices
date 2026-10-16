import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoansService } from './loans.service';
import { environment } from '../../../../environments/environment';
import { Loan } from '../../../core/domain/models/loan.model';

describe('LoansService', () => {
  let service: LoansService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrlSpringBoot}/api/loans`;

  const mockLoan: Loan = {
    id: 1,
    bookId: 101,
    userId: 201,
    loanDate: '2026-10-01',
    returnDate: '2026-10-15',
    status: 'ACTIVE'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoansService]
    });
    service = TestBed.inject(LoansService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllLoans', () => {
    it('debe obtener todos los préstamos vía GET', (done) => {
      const mockLoans: Loan[] = [mockLoan];

      service.getAllLoans().subscribe((loans) => {
        expect(loans).toEqual(mockLoans);
        expect(loans.length).toBe(1);
        done();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockLoans);
    });

    it('debe propagar el error cuando falla la petición', (done) => {
      service.getAllLoans().subscribe({
        next: () => {
          expect(true).toBe(false);
          done();
        },
        error: (error) => {
          expect(error.status).toBe(500);
          done();
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getLoanById', () => {
    it('debe obtener un préstamo por ID vía GET', (done) => {
      service.getLoanById(1).subscribe((loan) => {
        expect(loan).toEqual(mockLoan);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLoan);
    });

    it('debe propagar el error 404 cuando el préstamo no existe', (done) => {
      service.getLoanById(999).subscribe({
        next: () => {
          expect(true).toBe(false);
          done();
        },
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createLoan', () => {
    it('debe crear un préstamo vía POST', (done) => {
      const newLoan: Omit<Loan, 'id'> = {
        bookId: 101,
        userId: 201,
        loanDate: '2026-10-01',
        returnDate: '2026-10-15',
        status: 'ACTIVE'
      };

      service.createLoan(newLoan).subscribe((loan) => {
        expect(loan).toEqual(mockLoan);
        done();
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newLoan);
      req.flush(mockLoan);
    });

    it('debe propagar el error cuando falla la creación', (done) => {
      const newLoan: Omit<Loan, 'id'> = {
        bookId: 101,
        userId: 201,
        loanDate: '2026-10-01',
        returnDate: '2026-10-15',
        status: 'ACTIVE'
      };

      service.createLoan(newLoan).subscribe({
        next: () => {
          expect(true).toBe(false);
          done();
        },
        error: (error) => {
          expect(error.status).toBe(400);
          done();
        }
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateLoan', () => {
    it('debe actualizar un préstamo vía PUT', (done) => {
      const changes: Partial<Loan> = { status: 'RETURNED' };
      const updatedLoan: Loan = { ...mockLoan, status: 'RETURNED' };

      service.updateLoan(1, changes).subscribe((loan) => {
        expect(loan).toEqual(updatedLoan);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(changes);
      req.flush(updatedLoan);
    });

    it('debe propagar el error cuando falla la actualización', (done) => {
      service.updateLoan(1, { status: 'RETURNED' }).subscribe({
        next: () => {
          expect(true).toBe(false);
          done();
        },
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteLoan', () => {
    it('debe eliminar un préstamo vía DELETE', (done) => {
      service.deleteLoan(1).subscribe((result) => {
        expect(result).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('debe propagar el error cuando falla la eliminación', (done) => {
      service.deleteLoan(999).subscribe({
        next: () => {
          expect(true).toBe(false);
          done();
        },
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
});