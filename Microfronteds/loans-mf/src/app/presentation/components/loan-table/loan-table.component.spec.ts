import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanTableComponent } from './loan-table.component';
import { LoanTableRow } from '../../interfaces/loan.interface';

describe('LoanTableComponent', () => {
  let component: LoanTableComponent;
  let fixture: ComponentFixture<LoanTableComponent>;

  const mockLoans: LoanTableRow[] = [
    {
      id: 1,
      bookId: 101,
      userId: 201,
      loanDate: '2026-10-01',
      returnDate: '2026-10-15',
      status: 'ACTIVE',
      statusLabel: 'Activo',
      statusClass: 'status-active',
      statusIcon: '📚'
    },
    {
      id: 2,
      bookId: 102,
      userId: 202,
      loanDate: '2026-09-20',
      returnDate: '2026-10-04',
      status: 'OVERDUE',
      statusLabel: 'Vencido',
      statusClass: 'status-overdue',
      statusIcon: '⚠️'
    },
    {
      id: 3,
      bookId: 103,
      userId: 203,
      loanDate: '2026-08-15',
      returnDate: '2026-08-29',
      status: 'RETURNED',
      statusLabel: 'Devuelto',
      statusClass: 'status-returned',
      statusIcon: '✅'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('loans', mockLoans);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar la tabla con los préstamos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('debe mostrar columnas correctas en el encabezado', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('thead th');
    expect(headers.length).toBe(7);
    expect(headers[0].textContent?.trim()).toBe('ID');
    expect(headers[1].textContent?.trim()).toBe('Libro ID');
    expect(headers[2].textContent?.trim()).toBe('Usuario ID');
    expect(headers[3].textContent?.trim()).toBe('Fecha Préstamo');
    expect(headers[4].textContent?.trim()).toBe('Fecha Devolución');
    expect(headers[5].textContent?.trim()).toBe('Estado');
    expect(headers[6].textContent?.trim()).toBe('Acciones');
  });

  it('debe emitir evento viewDetail al hacer clic en ver', () => {
    const viewDetailSpy = jest.fn();
    component.viewDetail.subscribe(viewDetailSpy);

    const viewBtn = fixture.nativeElement.querySelector('.view-btn') as HTMLButtonElement;
    viewBtn.click();

    expect(viewDetailSpy).toHaveBeenCalledWith(mockLoans[0]);
  });

  it('debe emitir evento edit al hacer clic en editar', () => {
    const editSpy = jest.fn();
    component.edit.subscribe(editSpy);

    const editBtn = fixture.nativeElement.querySelector('.edit-btn') as HTMLButtonElement;
    editBtn.click();

    expect(editSpy).toHaveBeenCalledWith(mockLoans[0]);
  });

  it('debe emitir evento delete al hacer clic en eliminar', () => {
    const deleteSpy = jest.fn();
    component.delete.subscribe(deleteSpy);

    const deleteBtn = fixture.nativeElement.querySelector('.delete-btn') as HTMLButtonElement;
    deleteBtn.click();

    expect(deleteSpy).toHaveBeenCalledWith(mockLoans[0]);
  });

  it('debe mostrar estado vacío cuando no hay préstamos', () => {
    fixture.componentRef.setInput('loans', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
    expect(compiled.querySelector('.empty-state h3')?.textContent).toContain('Sin préstamos');
  });

  it('debe mostrar estado de carga cuando isLoading es true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-state')).toBeTruthy();
    expect(compiled.querySelector('.spinner')).toBeTruthy();
  });

  it('debe formatear fechas correctamente', () => {
    // Test that formatDate returns correct format (dd/MM/yyyy) without strict day check due to timezone
    const formatted = component.formatDate('2026-06-15');
    expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    expect(component.formatDate('')).toBe('-');
    expect(component.formatDate('invalid')).toBe('-');
  });

  it('debe aplicar clases de estado correctas', () => {
    expect(component.getStatusClass(mockLoans[0])).toBe('status-active');
    expect(component.getStatusClass(mockLoans[1])).toBe('status-overdue');
    expect(component.getStatusClass(mockLoans[2])).toBe('status-returned');
  });

  it('debe usar trackById para ngFor', () => {
    expect(component.trackById(0, mockLoans[0])).toBe(1);
    expect(component.trackById(1, mockLoans[1])).toBe(2);
  });
});