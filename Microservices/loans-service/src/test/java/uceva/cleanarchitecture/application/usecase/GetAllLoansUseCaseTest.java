package uceva.cleanarchitecture.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import uceva.cleanarchitecture.domain.entity.Loan;
import uceva.cleanarchitecture.domain.repository.LoanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class GetAllLoansUseCaseTest {

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private GetAllLoansUseCase getAllLoansUseCase;

    @BeforeEach
    void setUp() {
        // No need for MockitoAnnotations.openMocks(this) when using @ExtendWith
    }

    @Test
    void shouldReturnAllLoans() {
        // Given
        Loan loan1 = new Loan(1, 101, 201, null, null, "ACTIVE");
        Loan loan2 = new Loan(2, 102, 202, null, null, "RETURNED");
        List<Loan> expectedLoans = Arrays.asList(loan1, loan2);
        when(loanRepository.getAll()).thenReturn(expectedLoans);

        // When
        List<Loan> result = getAllLoansUseCase.execute();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedLoans, result);
        verify(loanRepository, times(1)).getAll();
    }

    @Test
    void shouldReturnEmptyListWhenNoLoans() {
        // Given
        when(loanRepository.getAll()).thenReturn(java.util.Collections.emptyList());

        // When
        List<Loan> result = getAllLoansUseCase.execute();

        // Then
        assertNotNull(result);
        assertEquals(0, result.size());
        verify(loanRepository, times(1)).getAll();
    }
}