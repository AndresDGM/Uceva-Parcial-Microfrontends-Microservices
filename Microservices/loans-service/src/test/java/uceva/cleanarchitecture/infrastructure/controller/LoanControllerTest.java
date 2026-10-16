package uceva.cleanarchitecture.infrastructure.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import uceva.cleanarchitecture.application.usecase.CreateLoanUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllLoansUseCase;
import uceva.cleanarchitecture.application.usecase.GetLoanByIdUseCase;
import uceva.cleanarchitecture.domain.entity.Loan;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class LoanControllerTest {

    @Mock
    private CreateLoanUseCase createLoanUseCase;

    @Mock
    private GetAllLoansUseCase getAllLoansUseCase;

    @Mock
    private GetLoanByIdUseCase getLoanByIdUseCase;

    @InjectMocks
    private LoanController loanController;

    @BeforeEach
    void setUp() {
        // No need for MockitoAnnotations.openMocks(this) when using @ExtendWith
    }

    @Test
    void shouldCreateLoanViaPost() {
        // Given
        Loan inputLoan = new Loan(null, 101, 201, null, null, "ACTIVE");
        Loan expectedLoan = new Loan(1, 101, 201, null, null, "ACTIVE");
        when(createLoanUseCase.execute(inputLoan)).thenReturn(expectedLoan);

        // When
        Loan result = loanController.createLoan(inputLoan);

        // Then
        assertNotNull(result);
        assertEquals(expectedLoan.id, result.id);
        assertEquals(expectedLoan.bookId, result.bookId);
        assertEquals(expectedLoan.userId, result.userId);
        verify(createLoanUseCase, times(1)).execute(inputLoan);
    }

    @Test
    void shouldReturnAllLoansViaGet() {
        // Given
        Loan loan1 = new Loan(1, 101, 201, null, null, "ACTIVE");
        Loan loan2 = new Loan(2, 102, 202, null, null, "RETURNED");
        List<Loan> expectedLoans = Arrays.asList(loan1, loan2);
        when(getAllLoansUseCase.execute()).thenReturn(expectedLoans);

        // When
        List<Loan> result = loanController.getAllLoans();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedLoans, result);
        verify(getAllLoansUseCase, times(1)).execute();
    }

    @Test
    void shouldReturnLoanByIdViaGet() {
        // Given
        Integer id = 1;
        Loan expectedLoan = new Loan(id, 101, 201, null, null, "ACTIVE");
        when(getLoanByIdUseCase.execute(id)).thenReturn(expectedLoan);

        // When
        Loan result = loanController.getLoanById(id);

        // Then
        assertNotNull(result);
        assertEquals(expectedLoan.id, result.id);
        assertEquals(expectedLoan.bookId, result.bookId);
        assertEquals(expectedLoan.userId, result.userId);
        verify(getLoanByIdUseCase, times(1)).execute(id);
    }

    @Test
    void shouldReturnNullWhenLoanNotFound() {
        // Given
        Integer id = 999;
        when(getLoanByIdUseCase.execute(id)).thenReturn(null);

        // When
        Loan result = loanController.getLoanById(id);

        // Then
        assertNull(result);
        verify(getLoanByIdUseCase, times(1)).execute(id);
    }
}