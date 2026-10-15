package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import com.github.javafaker.Book;

import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class FindByPublicationYearUseCase {
    private final BooksRepository booksRepository;

    public FindByPublicationYearUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public List<Book> execute(int year) {
        return booksRepository.findByPublicationYear(year);
    }
}

