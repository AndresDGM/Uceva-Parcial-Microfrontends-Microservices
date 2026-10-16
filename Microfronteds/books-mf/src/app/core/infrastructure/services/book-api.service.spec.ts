import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BookApiService } from './book-api.service';
import { Book, Genre, Language } from '../../domain/models/book.model';
import { environment } from '../../../../environments/environment';

describe('BookApiService', () => {
  let service: BookApiService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrlSpringBoot}/api/books`;

  const book: Book = {
    id: 1,
    title: 'Cien años de soledad',
    authorId: 1,
    isbn: '978-3-16-148410-0',
    publicationYear: '1967-05-30T00:00:00Z',
    publisher: 'Editorial Sudamericana',
    pages: 400,
    description: 'Una obra maestra de la literatura hispanoamericana',
    language: Language.SPANISH,
    genre: Genre.FANTASY,
    coverImageUrl: 'https://picsum.photos/seed/book1/400/600',
    pdfUrl: 'https://samplepdf.org/files/sample.pdf'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BookApiService
      ],
    });
    service = TestBed.inject(BookApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('debe obtener todos los libros vía GET', (done) => {
      const books = [book];

      service.getAll().subscribe(result => {
        expect(result.length).toBe(1);
        expect(result).toEqual(books);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/`);
      expect(req.request.method).toBe('GET');
      req.flush(books);
    });

    it('debe manejar el error cuando falla getAll', (done) => {
      service.getAll().subscribe({
        next: () => done.fail('No debería emitir un valor'),
        error: (error) => {
          expect(error.message).toBe('Failed to fetch books');
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getAllByGenre', () => {
    it('debe obtener los libros por género vía GET enviando la clave del enum', (done) => {
      const books = [book];

      service.getAllByGenre(Genre.FANTASY).subscribe(result => {
        expect(result.length).toBe(1);
        expect(result).toEqual(books);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/genre/FANTASY`);
      expect(req.request.method).toBe('GET');
      req.flush(books);
    });

    it('debe manejar el error cuando falla getAllByGenre', (done) => {
      service.getAllByGenre(Genre.FANTASY).subscribe({
        next: () => done.fail('No debería emitir un valor'),
        error: (error) => {
          expect(error.message).toBe('Failed to fetch books by genre');
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/genre/FANTASY`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getById', () => {
    it('debe obtener un libro por ID vía GET', (done) => {
      service.getById(1).subscribe(result => {
        expect(result).toEqual(book);
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(book);
    });

    it('debe retornar null cuando el libro no existe (404)', (done) => {
      service.getById(999).subscribe(result => {
        expect(result).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`${apiUrl}/999`);
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 404, statusText: 'Not Found' });
    });

    it('debe manejar el error cuando falla getById con error distinto a 404', (done) => {
      service.getById(1).subscribe({
        next: () => done.fail('No debería emitir un valor'),
        error: (error) => {
          expect(error.message).toBe('Failed to fetch book');
          done();
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });
});

