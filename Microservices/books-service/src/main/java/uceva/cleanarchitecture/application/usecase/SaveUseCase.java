package uceva.cleanarchitecture.application.usecase;


import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class SaveUseCase {
    private final BooksRepository booksRepository;

    public SaveUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public void execute(Book book) {
        booksRepository.save(book);
    }
}

