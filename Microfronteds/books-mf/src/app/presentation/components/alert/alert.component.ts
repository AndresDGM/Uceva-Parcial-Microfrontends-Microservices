import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'error' | 'success' | 'info' | 'warning';

/**
 * Componente de alerta reutilizable para mostrar mensajes de estado.
 *
 * @remarks
 * Soporta 4 tipos: error, success, info, warning.
 * Usa las clases CSS del design system compartido.
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

  /** Icono según el tipo */
  icon = computed(() => {
    switch (this.type()) {
      case 'error': return '✕';
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'info':
      default: return 'ℹ';
    }
  });

  /** Clases del icono */
  iconClasses = computed(() => `alert-icon alert-${this.type()}-icon`);
}

