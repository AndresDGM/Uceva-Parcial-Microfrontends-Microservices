package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class GetByIdUseCase {
    private final BooksRepository booksRepository;

    public GetByIdUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public Book execute(int id) {
        return booksRepository.getById(id);
    }
}
