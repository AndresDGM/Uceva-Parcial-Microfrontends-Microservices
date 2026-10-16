package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class GetAllUseCase {
    private final BooksRepository booksRepository;

    public GetAllUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public List<Book> execute(int count) {
        return booksRepository.getAll(count);
    }
}
