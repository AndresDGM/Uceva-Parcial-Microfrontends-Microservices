import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { BookSpringbootRepositoryImpl } from './book-springboot.repository.impl';
import { BookApiService } from '../../services/book-api.service';
import { Book, Genre, Language } from '../../../domain/models/book.model';

describe('BookSpringbootRepositoryImpl', () => {
  let repository: BookSpringbootRepositoryImpl;

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

  const BookApiServiceMock: Partial<jest.Mocked<BookApiService>> = {
    getAll: jest.fn(),
    getAllByGenre: jest.fn(),
    getById: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BookSpringbootRepositoryImpl,
        { provide: BookApiService, useValue: BookApiServiceMock }
      ]
    }).compileComponents();

    repository = TestBed.inject(BookSpringbootRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeInstanceOf(BookSpringbootRepositoryImpl);
  });

  it('debe delegar getAll en el servicio API', async () => {
    BookApiServiceMock.getAll!.mockReturnValue(of([book]));

    const result = await firstValueFrom(repository.getAll());

    expect(BookApiServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([book]);
  });

  it('debe delegar getAllByGenre en el servicio API', async () => {
    BookApiServiceMock.getAllByGenre!.mockReturnValue(of([book]));

    const result = await firstValueFrom(repository.getAllByGenre(Genre.FANTASY));

    expect(BookApiServiceMock.getAllByGenre).toHaveBeenCalledTimes(1);
    expect(BookApiServiceMock.getAllByGenre).toHaveBeenCalledWith(Genre.FANTASY);
    expect(result).toEqual([book]);
  });

  it('debe delegar getById en el servicio API', async () => {
    BookApiServiceMock.getById!.mockReturnValue(of(book));

    const result = await firstValueFrom(repository.getById(1));

    expect(BookApiServiceMock.getById).toHaveBeenCalledTimes(1);
    expect(BookApiServiceMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(book);
  });

  it('debe retornar null cuando el libro no existe', async () => {
    BookApiServiceMock.getById!.mockReturnValue(of(null));

    const result = await firstValueFrom(repository.getById(999));

    expect(BookApiServiceMock.getById).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

  it('debe propagar el error del servicio API', async () => {
    const errorMessage = 'Failed to fetch books';
    BookApiServiceMock.getAll!.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = repository.getAll();
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(BookApiServiceMock.getAll).toHaveBeenCalledTimes(1);
  });
});

