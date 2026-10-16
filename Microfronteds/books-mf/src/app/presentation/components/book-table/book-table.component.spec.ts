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

  it('debe mostrar la tabla con los libros', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('debe mostrar columnas correctas en el encabezado', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('thead th');
    expect(headers.length).toBe(9);
    expect(headers[0].textContent?.trim()).toBe('ID');
    expect(headers[1].textContent?.trim()).toBe('Título');
    expect(headers[2].textContent?.trim()).toBe('Editorial');
    expect(headers[3].textContent?.trim()).toBe('ISBN');
    expect(headers[4].textContent?.trim()).toBe('Género');
    expect(headers[5].textContent?.trim()).toBe('Idioma');
    expect(headers[6].textContent?.trim()).toBe('Páginas');
    expect(headers[7].textContent?.trim()).toBe('Publicación');
    expect(headers[8].textContent?.trim()).toBe('Acciones');
  });

  it('debe emitir evento viewDetail al hacer clic en ver', () => {
    const viewDetailSpy = jest.fn();
    component.viewDetail.subscribe(viewDetailSpy);

    const viewBtn = fixture.nativeElement.querySelector('.view-btn') as HTMLButtonElement;
    viewBtn.click();

    expect(viewDetailSpy).toHaveBeenCalledWith(mockRows[0]);
  });

  it('debe mostrar estado vacío cuando no hay libros', () => {
    fixture.componentRef.setInput('books', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
    expect(compiled.querySelector('.empty-state h3')?.textContent).toContain('Sin libros');
  });

  it('debe mostrar estado de carga cuando isLoading es true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-state')).toBeTruthy();
    expect(compiled.querySelector('.spinner')).toBeTruthy();
  });

  it('debe formatear fechas correctamente', () => {
    const formatted = component.formatDate('1967-05-30T00:00:00Z');
    expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(component.formatDate('')).toBe('-');
    expect(component.formatDate('invalid')).toBe('-');
  });

  it('debe aplicar clases de género correctas', () => {
    expect(component.getGenreClass(mockRows[0])).toBe('genre-fantasy');
    expect(component.getGenreClass(mockRows[1])).toBe('genre-non-fiction');
    expect(component.getGenreClass(mockRows[2])).toBe('genre-science-fiction');
  });

  it('debe usar trackById para iteración de filas', () => {
    expect(component.trackById(0, mockRows[0])).toBe(1);
    expect(component.trackById(1, mockRows[1])).toBe(2);
  });
});

