import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { BookListPage } from './book-list.page';
import { GetAllBooksUseCase } from '../../../core/application/use-cases/book/get-all-books.usecase';
import { GetAllBooksByGenreUseCase } from '../../../core/application/use-cases/book/get-all-books-by-genre.usecase';
import { GetBookByIdUseCase } from '../../../core/application/use-cases/book/get-book-by-id.usecase';
import { Genre } from '../../../core/domain/models/book.model';
import { mockBook, mockBooks } from '../../../mocks/activated-route.mock';

describe('BookListPage', () => {
  let component: BookListPage;
  let fixture: ComponentFixture<BookListPage>;
  let getAllBooksUseCase: jest.Mocked<GetAllBooksUseCase>;
  let getAllBooksByGenreUseCase: jest.Mocked<GetAllBooksByGenreUseCase>;
  let getBookByIdUseCase: jest.Mocked<GetBookByIdUseCase>;

  beforeEach(async () => {
    getAllBooksUseCase = { execute: jest.fn() } as unknown as jest.Mocked<GetAllBooksUseCase>;
    getAllBooksByGenreUseCase = { execute: jest.fn() } as unknown as jest.Mocked<GetAllBooksByGenreUseCase>;
    getBookByIdUseCase = { execute: jest.fn() } as unknown as jest.Mocked<GetBookByIdUseCase>;

    await TestBed.configureTestingModule({
      imports: [BookListPage],
      providers: [
        { provide: GetAllBooksUseCase, useValue: getAllBooksUseCase },
        { provide: GetAllBooksByGenreUseCase, useValue: getAllBooksByGenreUseCase },
        { provide: GetBookByIdUseCase, useValue: getBookByIdUseCase }
      ]
    })
      .overrideComponent(BookListPage, {
        set: { providers: [] }
      })
      .compileComponents();

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

  it('debe limpiar filtros y recargar libros con clearFilters', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    fixture.detectChanges();

    component.selectedGenre = Genre.FANTASY;
    component.searchIdInput = '10';
    component.clearFilters();

    expect(component.searchIdInput).toBe('');
    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(2);

    component.books = [];
    component.selectedGenre = '';
    component.clearFilters();
    expect(getAllBooksUseCase.execute).toHaveBeenCalledTimes(3);
  });

  it('debe abrir el modal de detalle al seleccionar una tarjeta de libro', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    fixture.detectChanges();

    component.onViewDetail(component.books[0]);

    expect(component.isModalOpen).toBe(true);
    expect(component.selectedBook).toEqual(component.books[0]);
    expect(document.body.style.overflow).toBe('hidden');

    component.closeModal();
    expect(component.isModalOpen).toBe(false);
    expect(component.selectedBook).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('debe consultar un libro por ID y abrir el modal con su detalle', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    getBookByIdUseCase.execute.mockReturnValue(of(mockBook));
    fixture.detectChanges();

    component.searchIdInput = '1';
    component.onSearchById();

    expect(getBookByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(component.isModalOpen).toBe(true);
    expect(component.selectedBook?.id).toBe(1);
    expect(component.isDetailLoading).toBe(false);
  });

  it('debe evitar consultas duplicadas cuando isDetailLoading es true', () => {
    component.isDetailLoading = true;
    component.searchIdInput = '1';
    component.onSearchById();

    expect(getBookByIdUseCase.execute).not.toHaveBeenCalled();
  });

  it('debe mostrar mensaje cuando el ID ingresado no es un entero positivo', () => {
    component.searchIdInput = '-5';
    component.onSearchById();

    expect(getBookByIdUseCase.execute).not.toHaveBeenCalled();
    expect(component.error).toContain('número entero positivo');
  });

  it('debe mostrar mensaje discreto cuando el ID buscado no existe', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    getBookByIdUseCase.execute.mockReturnValue(of(null));
    fixture.detectChanges();

    component.searchIdInput = '999';
    component.onSearchById();

    expect(getBookByIdUseCase.execute).toHaveBeenCalledWith(999);
    expect(component.isModalOpen).toBe(false);
    expect(component.error).toContain('No se encontró ningún libro con el ID 999');
  });

  it('debe solicitar el ID cuando el campo de búsqueda está vacío', () => {
    component.searchIdInput = '   ';
    component.onSearchById();

    expect(getBookByIdUseCase.execute).not.toHaveBeenCalled();
    expect(component.error).toContain('Ingresa un ID de libro');
  });

  it('debe mostrar error en el modal cuando falla la consulta por ID y permitir reintentar', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    getBookByIdUseCase.execute.mockReturnValueOnce(throwError(() => new Error('Backend error')));
    fixture.detectChanges();

    component.searchIdInput = '2';
    component.onSearchById();

    expect(component.isModalOpen).toBe(true);
    expect(component.modalError).toContain('Error al consultar el libro');

    getBookByIdUseCase.execute.mockReturnValueOnce(of(mockBooks[1]));
    component.retrySearchById();
    expect(getBookByIdUseCase.execute).toHaveBeenCalledTimes(2);
    expect(component.selectedBook?.id).toBe(2);
  });

  it('debe cerrar el modal con Escape o al hacer clic en el backdrop', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    fixture.detectChanges();

    component.onViewDetail(component.books[0]);
    expect(component.isModalOpen).toBe(true);

    component.onEscapeKey();
    expect(component.isModalOpen).toBe(false);

    component.onViewDetail(component.books[0]);
    const target = document.createElement('div');
    component.onBackdropClick({ target, currentTarget: target } as unknown as MouseEvent);
    expect(component.isModalOpen).toBe(false);
  });

  it('debe validar portada del modal, URL de PDF y formato de fecha', () => {
    getAllBooksUseCase.execute.mockReturnValue(of(mockBooks));
    fixture.detectChanges();

    const row = component.books[0];
    expect(component.hasValidModalCover(row)).toBe(true);
    component.onModalCoverError(row.id);
    expect(component.hasValidModalCover(row)).toBe(false);

    expect(component.hasValidPdfUrl('https://samplepdf.org/files/sample.pdf')).toBe(true);
    expect(component.hasValidPdfUrl('')).toBe(false);
    expect(component.hasValidPdfUrl(null)).toBe(false);

    expect(component.formatDate('1967-05-30T00:00:00Z')).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(component.formatDate('')).toBe('-');
    expect(component.formatDate('invalid')).toBe('-');
  });
});
