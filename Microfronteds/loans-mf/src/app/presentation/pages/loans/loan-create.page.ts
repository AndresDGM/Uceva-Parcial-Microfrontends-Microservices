import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { LoansService } from '../../services/loans/loans.service';
import { Loan } from '../../../core/domain/models/loan.model';
import { LoanStatus } from '../../interfaces/loan-status.interface';

/**
 * Página para crear un nuevo préstamo.
 *
 * @remarks
 * Formulario reactivo para crear préstamos. Valida los campos
 * requeridos y envía los datos al servicio.
 */
@Component({
  selector: 'app-loan-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './loan-create.page.html',
  styleUrl: './loan-create.page.scss'
})
export class LoanCreatePage {
  private fb = inject(FormBuilder);
  private loansService = inject(LoansService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loanForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  success = false;

  statusOptions: LoanStatus[] = ['ACTIVE', 'RETURNED', 'OVERDUE'];

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);
    const returnDateStr = returnDate.toISOString().split('T')[0];

    this.loanForm = this.fb.group({
      bookId: [null, [Validators.required, Validators.min(1)]],
      userId: [null, [Validators.required, Validators.min(1)]],
      loanDate: [today, Validators.required],
      returnDate: [returnDateStr, Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.success = false;

    const loanData: Omit<Loan, 'id'> = {
      bookId: this.loanForm.value.bookId,
      userId: this.loanForm.value.userId,
      loanDate: this.loanForm.value.loanDate,
      returnDate: this.loanForm.value.returnDate,
      status: this.loanForm.value.status
    };

    this.loansService.createLoan(loanData).subscribe({
      next: (createdLoan) => {
        this.isSubmitting = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/loans', createdLoan.id]);
        }, 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = 'Error al crear el préstamo: ' + err.message;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/loans']);
  }
}