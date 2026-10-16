package uceva.cleanarchitecture.infrastructure.repository;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;
import uceva.cleanarchitecture.domain.repository.BooksRepository;
import uceva.cleanarchitecture.infrastructure.datasource.BooksDatasource;

public class BooksRepositoryImpl implements BooksRepository {

    private final BooksDatasource booksDatasource;

    public BooksRepositoryImpl(BooksDatasource booksDatasource) {
        this.booksDatasource = booksDatasource;
    }

    @Override 
    public List<Book> getAll() {
        return booksDatasource.getAll();
    }
    
    @Override
    public List<Book> getAllGenre(Genre genre) {
        return booksDatasource.getAllGenre(genre);
    }

    @Override
    public Book getById(int id) {
        return booksDatasource.getById(id);
    }
}
