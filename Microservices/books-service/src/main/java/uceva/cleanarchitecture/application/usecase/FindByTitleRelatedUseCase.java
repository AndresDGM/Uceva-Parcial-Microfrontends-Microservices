package uceva.cleanarchitecture.application.usecase;

import com.github.javafaker.Book;

import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class FindByTitleRelatedUseCase {
    private final BooksRepository booksRepository;

    public FindByTitleRelatedUseCase(uceva.cleanarchitecture.domain.repository.BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public Book execute(String title) {
        return booksRepository.findByTitleRelated(title);
    }
}
