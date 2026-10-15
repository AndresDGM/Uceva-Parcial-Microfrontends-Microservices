package uceva.cleanarchitecture.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
class CreateLoanUseCaseTest {

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private CreateLoanUseCase createLoanUseCase;

    @BeforeEach
    void setUp() {
        // No need for MockitoAnnotations.openMocks(this) when using @ExtendWith
    }

    @Test
    void shouldCreateLoan() {
        // Given
        Loan inputLoan = new Loan(1, 101, 201, null, null, "ACTIVE");
        when(loanRepository.create(inputLoan)).thenReturn(inputLoan);

        // When
        Loan result = createLoanUseCase.execute(inputLoan);

        // Then
        assertNotNull(result);
        assertEquals(inputLoan.id, result.id);
        assertEquals(inputLoan.bookId, result.bookId);
        assertEquals(inputLoan.userId, result.userId);
        verify(loanRepository, times(1)).create(inputLoan);
    }
}