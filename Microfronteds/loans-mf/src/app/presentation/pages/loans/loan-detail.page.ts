import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { LoansService } from '../../services/loans/loans.service';
import { Loan } from '../../../core/domain/models/loan.model';
import { LOAN_STATUS_LABELS, LOAN_STATUS_CLASSES, LOAN_STATUS_ICONS } from '../../interfaces/loan-status.interface';

/**
 * Página de detalle de un préstamo.
 *
 * @remarks
 * Muestra la información completa de un préstamo específico.
 * Obtiene el ID de la ruta y consulta el servicio para obtener los datos.
 */
@Component({
  selector: 'app-loan-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AlertComponent],
  templateUrl: './loan-detail.page.html',
  styleUrl: './loan-detail.page.scss'
})
export class LoanDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private loansService = inject(LoansService);

  loan: Loan | null = null;
  isLoading = false;
  error: string | null = null;

  readonly statusLabels = LOAN_STATUS_LABELS;
  readonly statusClasses = LOAN_STATUS_CLASSES;
  readonly statusIcons = LOAN_STATUS_ICONS;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadLoan(+idParam);
    } else {
      this.error = 'ID de préstamo no válido';
    }
  }

  loadLoan(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.loansService.getLoanById(id).subscribe({
      next: (loan) => {
        if (loan) {
          this.loan = loan;
        } else {
          this.error = `No se encontró el préstamo con ID ${id}`;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el préstamo: ' + err.message;
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getStatusLabel(status: string): string {
    return this.statusLabels[status as keyof typeof this.statusLabels] || status;
  }

  getStatusClass(status: string): string {
    return this.statusClasses[status as keyof typeof this.statusClasses] || '';
  }

  getStatusIcon(status: string): string {
    return this.statusIcons[status as keyof typeof this.statusIcons] || '';
  }
}