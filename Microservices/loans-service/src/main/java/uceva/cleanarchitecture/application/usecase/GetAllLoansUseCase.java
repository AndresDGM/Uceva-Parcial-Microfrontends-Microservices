package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Loan;
import uceva.cleanarchitecture.domain.repository.LoanRepository;
import java.util.List;

public class GetAllLoansUseCase {

    private final LoanRepository loanRepository;

    public GetAllLoansUseCase(LoanRepository loanRepository){
        this.loanRepository = loanRepository;
    }

    public List<Loan> execute(){
        return loanRepository.getAll();
    }
}