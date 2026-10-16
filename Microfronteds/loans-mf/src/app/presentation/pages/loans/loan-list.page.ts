import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoanTableComponent } from '../../components/loan-table/loan-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { LoanTableRow } from '../../interfaces/loan.interface';
import { LoansService } from '../../services/loans/loans.service';
import { mapLoansToTableRows } from '../../interfaces/loan.interface';

/**
 * Página principal de listado de préstamos.
 *
 * @remarks
 * Esta página es el punto de entrada del microfrontend de préstamos.
 * Consume el servicio `LoansService` para obtener los préstamos
 * y los muestra mediante el componente `LoanTableComponent`.
 *
 * Se expone como `LoansPage` en Module Federation para ser consumida
 * por el host (Client-Host-Angular).
 */
@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoanTableComponent, AlertComponent],
  templateUrl: './loan-list.page.html',
  styleUrl: './loan-list.page.scss'
})
export class LoanListPage implements OnInit {
  /** Servicio de presentación para obtener préstamos */
  private loansService = inject(LoansService);

  /** Préstamos para mostrar en la tabla */
  loans: LoanTableRow[] = [];

  /** Estado de carga */
  isLoading = false;

  /** Error si ocurre */
  error: string | null = null;

  ngOnInit(): void {
    this.loadLoans();
  }

  /** Carga la lista de préstamos desde el servicio */
  loadLoans(): void {
    this.isLoading = true;
    this.error = null;

    this.loansService.getAllLoans().subscribe({
      next: (loans) => {
        this.loans = mapLoansToTableRows(loans);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los préstamos: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  /** Maneja la acción de ver detalle */
  onViewDetail(loan: LoanTableRow): void {
    // Navegación manejada por RouterLink en la tabla
  }

  /** Maneja la acción de editar */
  onEdit(loan: LoanTableRow): void {
    // TODO: Implementar navegación a edición
    console.log('Editar préstamo:', loan.id);
  }

  /** Maneja la acción de eliminar */
  onDelete(loan: LoanTableRow): void {
    if (confirm(`¿Está seguro de eliminar el préstamo #${loan.id}?`)) {
      this.loansService.deleteLoan(loan.id).subscribe({
        next: () => {
          this.loans = this.loans.filter(l => l.id !== loan.id);
        },
        error: (err) => {
          this.error = 'Error al eliminar el préstamo: ' + err.message;
        }
      });
    }
  }
}