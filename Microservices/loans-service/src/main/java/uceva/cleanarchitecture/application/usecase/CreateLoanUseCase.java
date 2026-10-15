package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Loan;
import uceva.cleanarchitecture.domain.repository.LoanRepository;

public class CreateLoanUseCase {

    private final LoanRepository loanRepository;

    public CreateLoanUseCase(LoanRepository loanRepository){
        this.loanRepository = loanRepository;
    }

    public Loan execute(Loan loan){
        return loanRepository.create(loan);
    }
}