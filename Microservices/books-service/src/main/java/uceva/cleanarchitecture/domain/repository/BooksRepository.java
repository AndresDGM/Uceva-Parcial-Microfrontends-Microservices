package uceva.cleanarchitecture.domain.repository;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;


public interface BooksRepository {
    public List<Book> getAll();
    public List<Book> getAllGenre(Genre genre);
    public Book getById(int id);
}
