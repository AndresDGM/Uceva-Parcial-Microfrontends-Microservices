import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { GetAllBooksByGenreUseCase } from './get-all-books-by-genre.usecase';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { BOOK_REPOSITORY_TOKEN } from '../../../domain/repositories/book-repository.token';
import { Book, Genre, Language } from '../../../domain/models/book.model';

describe('GetAllBooksByGenreUseCase', () => {
  let useCase: GetAllBooksByGenreUseCase;

  const fantasyBooks: Book[] = [
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
        GetAllBooksByGenreUseCase,
        { provide: BOOK_REPOSITORY_TOKEN, useValue: BookRepositoryMock }
      ]
    }).compileComponents();

    useCase = TestBed.inject(GetAllBooksByGenreUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllBooksByGenreUseCase);
  });

  it('debe obtener los libros filtrados por género del repositorio', async () => {
    BookRepositoryMock.getAllByGenre.mockReturnValue(of(fantasyBooks));

    const result = await firstValueFrom(useCase.execute(Genre.FANTASY));

    expect(BookRepositoryMock.getAllByGenre).toHaveBeenCalledTimes(1);
    expect(BookRepositoryMock.getAllByGenre).toHaveBeenCalledWith(Genre.FANTASY);
    expect(result.length).toBe(1);
    expect(result).toEqual(fantasyBooks);
  });

  it('debe retornar una lista vacía cuando no hay libros para el género indicado', async () => {
    BookRepositoryMock.getAllByGenre.mockReturnValue(of([]));

    const result = await firstValueFrom(useCase.execute(Genre.HISTORY));

    expect(BookRepositoryMock.getAllByGenre).toHaveBeenCalledWith(Genre.HISTORY);
    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando el repositorio falla', async () => {
    const errorMessage = 'Failed to fetch books by genre';
    BookRepositoryMock.getAllByGenre.mockReturnValue(throwError(() => new Error(errorMessage)));

    const result = useCase.execute(Genre.FANTASY);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);

    expect(BookRepositoryMock.getAllByGenre).toHaveBeenCalledTimes(1);
    expect(BookRepositoryMock.getAllByGenre).toHaveBeenCalledWith(Genre.FANTASY);
  });
});

