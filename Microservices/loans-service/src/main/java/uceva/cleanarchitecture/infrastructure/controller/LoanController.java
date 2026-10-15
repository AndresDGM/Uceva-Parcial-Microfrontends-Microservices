package uceva.cleanarchitecture.infrastructure.controller;

import org.springframework.web.bind.annotation.*;
import uceva.cleanarchitecture.application.usecase.CreateLoanUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllLoansUseCase;
import uceva.cleanarchitecture.application.usecase.GetLoanByIdUseCase;
import uceva.cleanarchitecture.domain.entity.Loan;
import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {

    private final CreateLoanUseCase createLoanUseCase;
    private final GetAllLoansUseCase getAllLoansUseCase;
    private final GetLoanByIdUseCase getLoanByIdUseCase;

    public LoanController(CreateLoanUseCase createLoanUseCase,
                          GetAllLoansUseCase getAllLoansUseCase,
                          GetLoanByIdUseCase getLoanByIdUseCase) {
        this.createLoanUseCase = createLoanUseCase;
        this.getAllLoansUseCase = getAllLoansUseCase;
        this.getLoanByIdUseCase = getLoanByIdUseCase;
    }

    @PostMapping
    public Loan createLoan(@RequestBody Loan loan) {
        return createLoanUseCase.execute(loan);
    }

    @GetMapping
    public List<Loan> getAllLoans() {
        return getAllLoansUseCase.execute();
    }

    @GetMapping("/{id}")
    public Loan getLoanById(@PathVariable Integer id) {
        return getLoanByIdUseCase.execute(id);
    }
}