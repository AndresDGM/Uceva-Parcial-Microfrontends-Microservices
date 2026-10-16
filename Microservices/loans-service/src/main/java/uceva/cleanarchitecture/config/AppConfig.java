package uceva.cleanarchitecture.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uceva.cleanarchitecture.application.usecase.CreateLoanUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllLoansUseCase;
import uceva.cleanarchitecture.application.usecase.GetLoanByIdUseCase;
import uceva.cleanarchitecture.domain.entity.Loan;
import uceva.cleanarchitecture.domain.repository.LoanRepository;
import uceva.cleanarchitecture.infrastructure.datasource.LoanDatasource;
import uceva.cleanarchitecture.infrastructure.repository.LoanRepositoryImpl;

@Configuration
public class AppConfig {

    @Bean
    LoanDatasource loanDatasource(){
        return new LoanDatasource();
    }

    @Bean
    LoanRepository loanRepository(LoanDatasource loanDatasource) {
        return new LoanRepositoryImpl(loanDatasource);
    }

    @Bean
    CreateLoanUseCase createLoanUseCase(LoanRepository loanRepository) {
        return new CreateLoanUseCase(loanRepository);
    }

    @Bean
    GetAllLoansUseCase getAllLoansUseCase(LoanRepository loanRepository) {
        return new GetAllLoansUseCase(loanRepository);
    }

    @Bean
    GetLoanByIdUseCase getLoanByIdUseCase(LoanRepository loanRepository) {
        return new GetLoanByIdUseCase(loanRepository);
    }
}