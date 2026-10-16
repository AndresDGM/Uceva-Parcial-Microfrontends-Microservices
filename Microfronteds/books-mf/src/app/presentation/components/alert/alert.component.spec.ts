import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar mensaje de error con clases e icono SVG correctos', () => {
    fixture.componentRef.setInput('type', 'error');
    fixture.componentRef.setInput('message', 'Error de prueba');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.alert')?.classList).toContain('alert-error');
    expect(compiled.textContent).toContain('Error de prueba');
    expect(compiled.querySelector('.alert-icon svg')).toBeTruthy();
  });

  it('debe mostrar mensaje de éxito con clases e icono SVG correctos', () => {
    fixture.componentRef.setInput('type', 'success');
    fixture.componentRef.setInput('message', 'Éxito de prueba');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.alert')?.classList).toContain('alert-success');
    expect(compiled.querySelector('.alert-icon svg')).toBeTruthy();
  });

  it('debe mostrar mensaje de advertencia con clases e icono SVG correctos', () => {
    fixture.componentRef.setInput('type', 'warning');
    fixture.componentRef.setInput('message', 'Advertencia de prueba');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.alert')?.classList).toContain('alert-warning');
    expect(compiled.querySelector('.alert-icon svg')).toBeTruthy();
  });

  it('debe mostrar mensaje informativo con clases e icono SVG correctos (por defecto)', () => {
    fixture.componentRef.setInput('message', 'Info de prueba');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.alert')?.classList).toContain('alert-info');
    expect(compiled.querySelector('.alert-icon svg')).toBeTruthy();
  });
});
