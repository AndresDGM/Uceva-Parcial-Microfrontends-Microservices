import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { GetBookByIdUseCase } from './get-book-by-id.usecase';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { BOOK_REPOSITORY_TOKEN } from '../../../domain/repositories/book-repository.token';
import { Book, Genre, Language } from '../../../domain/models/book.model';

describe('GetBookByIdUseCase', () => {
  let useCase: GetBookByIdUseCase;

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

  const BookRepositoryMock: jest.Mocked<BookRepository> = {
    getAll: jest.fn(),
    getAllByGenre: jest.fn(),
    getById: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetBookByIdUseCase,
        { provide: BOOK_REPOSITORY_TOKEN, useValue: BookRepositoryMock }
      ]
    }).compileComponents();

    useCase = TestBed.inject(GetBookByIdUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetBookByIdUseCase);
  });

  it('debe obtener un libro por su ID', async () => {
    BookRepositoryMock.getById.mockReturnValue(of(book));

    const result = await firstValueFrom(useCase.execute(1));

    expect(BookRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(BookRepositoryMock.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(book);
    expect(result?.id).toBe(1);
  });

  it('debe retornar null cuando el libro no existe', async () => {
    BookRepositoryMock.getById.mockReturnValue(of(null));

    const result = await firstValueFrom(useCase.execute(999));

    expect(BookRepositoryMock.getById).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Failed to fetch book';
    BookRepositoryMock.getById.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = useCase.execute(1);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(BookRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(BookRepositoryMock.getById).toHaveBeenCalledWith(1);
  });
});

