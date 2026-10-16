import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { GetAllBooksUseCase } from './get-all-books.usecase';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { BOOK_REPOSITORY_TOKEN } from '../../../domain/repositories/book-repository.token';
import { Book, Genre, Language } from '../../../domain/models/book.model';

describe('GetAllBooksUseCase', () => {
  let useCase: GetAllBooksUseCase;

  const books: Book[] = [
    {
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
    },
    {
      id: 2,
      title: 'Clean Code',
      authorId: 2,
      isbn: '978-0-13-235088-4',
      publicationYear: '2008-08-01T00:00:00Z',
      publisher: 'Prentice Hall',
      pages: 464,
      description: 'A Handbook of Agile Software Craftsmanship',
      language: Language.ENGLISH,
      genre: Genre.NON_FICTION,
      coverImageUrl: 'https://picsum.photos/seed/book2/400/600',
      pdfUrl: 'https://samplepdf.org/files/sample.pdf'
    }
  ];

  const BookRepositoryMock: jest.Mocked<BookRepository> = {
    getAll: jest.fn(),
    getAllByGenre: jest.fn(),
    getById: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllBooksUseCase,
        { provide: BOOK_REPOSITORY_TOKEN, useValue: BookRepositoryMock }
      ]
    }).compileComponents();

    useCase = TestBed.inject(GetAllBooksUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllBooksUseCase);
  });

  it('debe obtener todos los libros del repositorio', async () => {
    BookRepositoryMock.getAll.mockReturnValue(of(books));

    const result = await firstValueFrom(useCase.execute());

    expect(BookRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(2);
    expect(result).toEqual(books);
  });

  it('debe retornar una lista vacía cuando no hay libros', async () => {
    BookRepositoryMock.getAll.mockReturnValue(of([]));

    const result = await firstValueFrom(useCase.execute());

    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Failed to fetch books';
    BookRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = useCase.execute();
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(BookRepositoryMock.getAll).toHaveBeenCalledTimes(1);
  });
});

