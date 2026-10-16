import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BookDetailPage } from './book-detail.page';
import { GetBookByIdUseCase } from '../../../core/application/use-cases/book/get-book-by-id.usecase';
import { createActivatedRouteMock, mockBook } from '../../../mocks/activated-route.mock';
import { Genre, Language } from '../../../core/domain/models/book.model';

describe('BookDetailPage', () => {
  let component: BookDetailPage;
  let fixture: ComponentFixture<BookDetailPage>;
  let getBookByIdUseCase: jest.Mocked<GetBookByIdUseCase>;

  const setupComponent = async (routeId: string | null = '1') => {
    getBookByIdUseCase = { execute: jest.fn() } as unknown as jest.Mocked<GetBookByIdUseCase>;

    await TestBed.configureTestingModule({
      imports: [BookDetailPage],
      providers: [
        { provide: GetBookByIdUseCase, useValue: getBookByIdUseCase },
        { provide: ActivatedRoute, useValue: createActivatedRouteMock(routeId) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailPage);
    component = fixture.componentInstance;
  };

  it('debe crearse correctamente y cargar el libro por ID', async () => {
    await setupComponent('1');
    getBookByIdUseCase.execute.mockReturnValue(of(mockBook));

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(getBookByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(component.book).toEqual(mockBook);
    expect(component.isLoading).toBe(false);
    expect(component.error).toBeNull();
  });

  it('debe mostrar error cuando el libro no existe (retorna null)', async () => {
    await setupComponent('999');
    getBookByIdUseCase.execute.mockReturnValue(of(null));

    fixture.detectChanges();

    expect(component.book).toBeNull();
    expect(component.error).toContain('No se encontró el libro con ID 999');
    expect(component.isLoading).toBe(false);
  });

  it('debe mostrar error cuando falla el caso de uso', async () => {
    await setupComponent('1');
    getBookByIdUseCase.execute.mockReturnValue(throwError(() => new Error('Server error')));

    fixture.detectChanges();

    expect(component.error).toContain('Error al cargar el libro');
    expect(component.isLoading).toBe(false);
  });

  it('debe mostrar error cuando el parámetro ID en la ruta no es válido', async () => {
    await setupComponent(null);

    fixture.detectChanges();

    expect(component.error).toBe('ID de libro no válido');
    expect(getBookByIdUseCase.execute).not.toHaveBeenCalled();
  });

  it('debe formatear fechas y obtener etiquetas de género e idioma correctamente', async () => {
    await setupComponent('1');
    getBookByIdUseCase.execute.mockReturnValue(of(mockBook));
    fixture.detectChanges();

    expect(component.formatDate('1967-05-30T00:00:00Z')).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(component.formatDate('')).toBe('-');
    expect(component.formatDate('invalid')).toBe('-');

    expect(component.getGenreLabel(Genre.FANTASY)).toBe('Fantasía');
    expect(component.getGenreClass(Genre.FANTASY)).toBe('genre-fantasy');
    expect(component.getLanguageLabel(Language.SPANISH)).toBe('Español');
    expect(component.hasValidPdfUrl(mockBook.pdfUrl)).toBe(true);
    expect(component.hasValidPdfUrl('')).toBe(false);
  });

  it('debe manejar error de carga de portada mostrando el placeholder SVG', async () => {
    await setupComponent('1');
    getBookByIdUseCase.execute.mockReturnValue(of(mockBook));
    fixture.detectChanges();

    component.onCoverError();
    expect(component.hasValidCover(mockBook)).toBe(false);
  });

  it('debe invocar window.history.back al llamar goBack', async () => {
    await setupComponent('1');
    const historySpy = jest.spyOn(window.history, 'back').mockImplementation(() => {});

    component.goBack();

    expect(historySpy).toHaveBeenCalled();
    historySpy.mockRestore();
  });
});
