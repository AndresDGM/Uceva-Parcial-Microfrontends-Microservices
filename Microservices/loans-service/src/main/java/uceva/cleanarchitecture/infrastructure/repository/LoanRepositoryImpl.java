package uceva.cleanarchitecture.infrastructure.repository;

import uceva.cleanarchitecture.domain.entity.Loan;
import uceva.cleanarchitecture.domain.repository.LoanRepository;
import uceva.cleanarchitecture.infrastructure.datasource.LoanDatasource;
import java.util.List;

public class LoanRepositoryImpl extends LoanRepository {

    private final LoanDatasource loanDatasource;

    public LoanRepositoryImpl(LoanDatasource loanDatasource){
        this.loanDatasource = loanDatasource;
    }

    @Override
    public Loan create(Loan loan) {
        return loanDatasource.create(loan);
    }

    @Override
    public List<Loan> getAll() {
        return loanDatasource.getAll();
    }

    @Override
    public Loan getById(Integer id) {
        return loanDatasource.getById(id);
    }
}