package uceva.cleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import uceva.cleanarchitecture.domain.entity.Loan;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

public class LoanDatasource {

    private final List<Loan> loans = new ArrayList<>();
    private final AtomicInteger idCounter = new AtomicInteger(1);
    private final Faker faker = new Faker();
    private final Random random = new Random();
    private final String[] statuses = {"ACTIVE", "RETURNED", "OVERDUE"};

    public LoanDatasource() {
        // Initialize with some sample data for demonstration
        for (int i = 0; i < 5; i++) {
            loans.add(createMockLoan(i + 1));
        }
    }

    public List<Loan> getAll() {
        // Return a copy to prevent external modification of internal list
        return new ArrayList<>(loans);
    }

    public Loan create(Loan loan) {
        // Assign ID if not present (simulating auto-generated ID)
        if (loan.id == null) {
            loan.id = idCounter.getAndIncrement();
        }
        // Remove any existing loan with same ID (to simulate update behavior)
        loans.removeIf(l -> l.id != null && l.id.equals(loan.id));
        loans.add(loan);
        return loan;
    }

    public Loan getById(Integer id) {
        return loans.stream()
                .filter(l -> l.id != null && l.id.equals(id))
                .findFirst()
                .orElse(null);
    }

    private Loan createMockLoan(Integer id) {
        LocalDate loanDate = LocalDate.now().minusDays(random.nextInt(30));
        LocalDate returnDate = loanDate.plusDays(random.nextInt(7, 21)); // 1-3 weeks loan period
        
        // Randomly assign status
        String status = statuses[random.nextInt(statuses.length)];
        
        return new Loan(
                id,
                random.nextInt(1000) + 1, // bookId: 1-1000
                random.nextInt(500) + 1,  // userId: 1-500
                loanDate,
                returnDate,
                status
        );
    }
}