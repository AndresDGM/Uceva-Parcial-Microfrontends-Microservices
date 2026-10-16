import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTableComponent } from './book-table.component';
import { BookTableRow, mapBooksToTableRows } from '../../interfaces/book.interface';
import { mockBooks } from '../../../mocks/activated-route.mock';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;

  const mockRows: BookTableRow[] = mapBooksToTableRows(mockBooks);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('books', mockRows);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar la cuadrícula de tarjetas con los libros', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.book-card');
    expect(cards.length).toBe(3);
  });

  it('debe mostrar portada, título, autor y género en cada tarjeta sin metadatos de detalle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = compiled.querySelector('.book-card') as HTMLElement;

    expect(firstCard.querySelector('.book-card-title')?.textContent?.trim()).toBe(mockRows[0].title);
    expect(firstCard.querySelector('.book-card-author')?.textContent?.trim()).toBe(`Autor #${mockRows[0].authorId}`);
    expect(firstCard.querySelector('.genre-badge')?.textContent?.trim()).toBe(mockRows[0].genreLabel);
    expect(firstCard.textContent).not.toContain(mockRows[0].isbn);
  });

  it('debe emitir evento viewDetail al hacer clic en una tarjeta', () => {
    const viewDetailSpy = jest.fn();
    component.viewDetail.subscribe(viewDetailSpy);

    const firstCard = fixture.nativeElement.querySelector('.book-card') as HTMLElement;
    firstCard.click();

    expect(viewDetailSpy).toHaveBeenCalledWith(mockRows[0]);
  });

  it('debe emitir evento viewDetail al presionar Space en una tarjeta', () => {
    const viewDetailSpy = jest.fn();
    component.viewDetail.subscribe(viewDetailSpy);

    const event = new KeyboardEvent('keydown', { key: ' ' });
    component.onCardKeydownSpace(mockRows[0], event);

    expect(viewDetailSpy).toHaveBeenCalledWith(mockRows[0]);
  });

  it('debe mostrar placeholder SVG cuando la portada falla al cargar', () => {
    component.onCoverError(mockRows[0].id);
    fixture.detectChanges();

    expect(component.hasValidCover(mockRows[0])).toBe(false);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.book-cover-placeholder svg')).toBeTruthy();
  });

  it('debe mostrar estado vacío cuando no hay libros', () => {
    fixture.componentRef.setInput('books', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
    expect(compiled.querySelector('.empty-state h3')?.textContent).toContain('Sin libros disponibles');
  });

  it('debe mostrar estado de carga cuando isLoading es true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-state')).toBeTruthy();
    expect(compiled.querySelector('.spinner')).toBeTruthy();
  });

  it('debe aplicar clases de género correctas', () => {
    expect(component.getGenreClass(mockRows[0])).toBe('genre-fantasy');
    expect(component.getGenreClass(mockRows[1])).toBe('genre-non-fiction');
    expect(component.getGenreClass(mockRows[2])).toBe('genre-science-fiction');
  });

  it('debe usar trackById para iteración de tarjetas', () => {
    expect(component.trackById(0, mockRows[0])).toBe(1);
    expect(component.trackById(1, mockRows[1])).toBe(2);
  });
});
