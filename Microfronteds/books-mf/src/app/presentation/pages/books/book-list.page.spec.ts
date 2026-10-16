import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BookListPage } from './book-list.page';
import { GetAllBooksUseCase } from '../../../core/application/use-cases/book/get-all-books.usecase';
import { GetAllBooksByGenreUseCase } from '../../../core/application/use-cases/book/get-all-books-by-genre.usecase';
import { Genre } from '../../../core/domain/models/book.model';
import { mockBooks } from '../../../mocks/activated-route.mock';

describe('BookListPage', () => {
  let component: BookListPage;
  let fixture: ComponentFixture<BookListPage>;
  let getAllBooksUseCase: jest.Mocked<GetAllBooksUseCase>;
  let getAllBooksByGenreUseCase: jest.Mocked<GetAllBooksByGenreUseCase>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    getAllBooksUseCase = { execute: jest.fn() } as unknown as jest.Mocked<GetAllBooksUseCase>;
    getAllBooksByGenreUseCase = { execute: jest.fn() } as unknown as jest.Mocked<GetAllBooksByGenreUseCase>;
    router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [BookListPage],
      providers: [
        { provide: GetAllBooksUseCase, useValue: getAllBooksUseCase },
        { provide: GetAllBooksByGenreUseCase, useValue: getAllBooksByGenreUseCase },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListPage);
    component = fixture.componentInstance;
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los libros al inicializar', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));

    fixture.detectChanges();

    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(1);
    expect(component.books.length).toBe(3);
    expect(component.isLoading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('debe mostrar error cuando falla la carga inicial de libros', () => {
    getAllBooksUseCase.execute.mockReturnValue(throwError(() => new Error('Failed to fetch books')));

    fixture.detectChanges();

    expect(component.error).toContain('Error al cargar los libros');
    expect(component.isLoading).toBe(false);
  });

  it('debe filtrar los libros por género cuando se selecciona un género', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    const fantasyBooks = [mockBooks[0]];
    getAllBooksByGenreUseCase.execute.mockReturnValue(of(fantasyBooks));

    fixture.detectChanges();
    component.onGenreChange(Genre.FANTASY);

    expect(getAllBooksByGenreUseCase.execute).toHaveBeenCalledWith(Genre.FANTASY);
    expect(component.books.length).toBe(1);
    expect(component.books[0].genre).toBe(Genre.FANTASY);
    expect(component.isLoading).toBe(false);
  });

  it('debe recargar todos los libros cuando se limpia el filtro de género', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    fixture.detectChanges();

    component.onGenreChange('');

    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(2);
    expect(component.selectedGenre).toBe('');
  });

  it('debe mostrar error cuando falla el filtrado por género', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    getAllBooksByGenreUseCase.execute.mockReturnValue(
      throwError(() => new Error('Failed to fetch books by genre'))
    );

    fixture.detectChanges();
    component.onGenreChange(Genre.FANTASY);

    expect(component.error).toContain('Error al filtrar los libros por género');
    expect(component.isLoading).toBe(false);
  });

  it('debe navegar al detalle del libro al hacer clic en ver detalle', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    fixture.detectChanges();

    component.onViewDetail(component.books[0]);

    expect(router.navigate).toHaveBeenCalledWith(['/books', 1]);
  });

  it('debe navegar al detalle cuando se busca un ID válido', () => {
    component.searchId = 5;
    component.onSearchById();

    expect(router.navigate).toHaveBeenCalledWith(['/books', 5]);
  });

  it('no debe navegar cuando searchId es inválido', () => {
    component.searchId = null;
    component.onSearchById();

    expect(router.navigate).not.toHaveBeenCalled();
  });
});

