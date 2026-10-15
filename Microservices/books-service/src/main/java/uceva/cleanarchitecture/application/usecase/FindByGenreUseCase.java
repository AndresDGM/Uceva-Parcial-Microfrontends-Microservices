package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import com.github.javafaker.Book;

import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class FindByGenreUseCase {
    private final BooksRepository booksRepository;

    public FindByGenreUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public List<Book> execute(String genre) {
        return booksRepository.findByGenre(genre);
    }
}

