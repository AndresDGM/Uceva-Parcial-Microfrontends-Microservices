package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import com.github.javafaker.Book;

import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class FindByPublisherUseCase {
    private final BooksRepository booksRepository;

    public FindByPublisherUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public List<Book> execute(String publisher) {
        return booksRepository.findByPublisher(publisher);
    }
}

