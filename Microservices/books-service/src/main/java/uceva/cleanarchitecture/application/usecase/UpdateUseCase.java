package uceva.cleanarchitecture.application.usecase;


import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class UpdateUseCase {
    private final BooksRepository booksRepository;

    public UpdateUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public void execute(Book book) {
        booksRepository.update(book);
    }
}

