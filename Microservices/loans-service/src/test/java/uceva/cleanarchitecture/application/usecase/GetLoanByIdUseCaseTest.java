package uceva.cleanarchitecture.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import uceva.cleanarchitecture.domain.entity.Loan;
import uceva.cleanarchitecture.domain.repository.LoanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class GetLoanByIdUseCaseTest {

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private GetLoanByIdUseCase getLoanByIdUseCase;

    @BeforeEach
    void setUp() {
        // No need for MockitoAnnotations.openMocks(this) when using @ExtendWith
    }

    @Test
    void shouldReturnLoanWhenExists() {
        // Given
        Integer loanId = 1;
        Loan expectedLoan = new Loan(loanId, 101, 201, null, null, "ACTIVE");
        when(loanRepository.getById(loanId)).thenReturn(expectedLoan);

        // When
        Loan result = getLoanByIdUseCase.execute(loanId);

        // Then
        assertNotNull(result);
        assertEquals(expectedLoan.id, result.id);
        assertEquals(expectedLoan.bookId, result.bookId);
        assertEquals(expectedLoan.userId, result.userId);
        verify(loanRepository, times(1)).getById(loanId);
    }

    @Test
    void shouldReturnNullWhenLoanDoesNotExist() {
        // Given
        Integer loanId = 999;
        when(loanRepository.getById(loanId)).thenReturn(null);

        // When
        Loan result = getLoanByIdUseCase.execute(loanId);

        // Then
        assertNull(result);
        verify(loanRepository, times(1)).getById(loanId);
    }
}