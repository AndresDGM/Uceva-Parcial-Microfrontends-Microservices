import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'error' | 'success' | 'info' | 'warning';

/**
 * Componente de alerta reutilizable para mostrar mensajes de estado con iconos SVG.
 *
 * @remarks
 * Soporta 4 tipos: error, success, info, warning.
 *
 * @example
 * ```html
 * <app-alert type="error" message="Error al cargar libros" />
 * <app-alert type="success" message="Libros cargados correctamente" />
 * ```
 */
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  /** Tipo de alerta: error, success, info, warning */
  type = input<AlertType>('info');

  /** Mensaje a mostrar */
  message = input.required<string>();

  /** Clases CSS computadas según el tipo */
  alertClasses = computed(() => {
    const base = 'alert';
    const typeClass = `alert-${this.type()}`;
    return `${base} ${typeClass}`;
  });

  /** Clases del contenedor del icono */
  iconClasses = computed(() => `alert-icon alert-${this.type()}-icon`);
}
