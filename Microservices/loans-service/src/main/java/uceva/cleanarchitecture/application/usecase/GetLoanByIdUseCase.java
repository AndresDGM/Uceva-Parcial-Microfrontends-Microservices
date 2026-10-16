package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Loan;
import uceva.cleanarchitecture.domain.repository.LoanRepository;

public class GetLoanByIdUseCase {

    private final LoanRepository loanRepository;

    public GetLoanByIdUseCase(LoanRepository loanRepository){
        this.loanRepository = loanRepository;
    }

    public Loan execute(Integer id){
        return loanRepository.getById(id);
    }
}