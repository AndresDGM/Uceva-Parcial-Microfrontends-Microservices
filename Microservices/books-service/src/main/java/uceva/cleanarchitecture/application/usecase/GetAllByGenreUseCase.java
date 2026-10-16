package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class GetAllByGenreUseCase {
    private final BooksRepository booksRepository;

    public GetAllByGenreUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public List<Book> execute(Genre genre) {
        return booksRepository.getAllGenre(genre);
    }
}
