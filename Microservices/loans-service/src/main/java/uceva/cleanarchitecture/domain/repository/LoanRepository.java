package uceva.cleanarchitecture.domain.repository;

import uceva.cleanarchitecture.domain.entity.Loan;
import java.util.List;

public abstract class LoanRepository {
    public abstract Loan create(Loan loan);
    public abstract List<Loan> getAll();
    public abstract Loan getById(Integer id);
}