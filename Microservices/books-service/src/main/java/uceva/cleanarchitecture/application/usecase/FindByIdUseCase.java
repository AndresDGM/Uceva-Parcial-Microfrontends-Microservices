package uceva.cleanarchitecture.application.usecase;

import com.github.javafaker.Book;

import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class FindByIdUseCase {
    private final BooksRepository booksRepository;

    public FindByIdUseCase(uceva.cleanarchitecture.domain.repository.BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public Book execute(int id) {
        return booksRepository.findById(id);
    }
}
