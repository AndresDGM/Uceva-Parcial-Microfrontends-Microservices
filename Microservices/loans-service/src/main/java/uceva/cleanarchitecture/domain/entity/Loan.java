package uceva.cleanarchitecture.domain.entity;

import java.time.LocalDate;

public class Loan {
    public Integer id;
    public Integer bookId;
    public Integer userId;
    public LocalDate loanDate;
    public LocalDate returnDate;
    public String status;

    public Loan(Integer id, Integer bookId, Integer userId, LocalDate loanDate, LocalDate returnDate, String status){
        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
        this.status = status;
    }
}