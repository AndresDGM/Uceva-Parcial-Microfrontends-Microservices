package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import com.github.javafaker.Book;

import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class FindByAuthorIdUseCase {
    private final BooksRepository booksRepository;

    public FindByAuthorIdUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public List<Book> execute(int authorId) {
        return booksRepository.findByAuthorId(authorId);
    }
}
