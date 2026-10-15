package uceva.cleanarchitecture.application.usecase;

import java.util.List;


import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class FindByLanguageUseCase {
    private final BooksRepository booksRepository;

    public FindByLanguageUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public List<Book> execute(String language) {
        return booksRepository.findByLanguage(language);
    }
}

