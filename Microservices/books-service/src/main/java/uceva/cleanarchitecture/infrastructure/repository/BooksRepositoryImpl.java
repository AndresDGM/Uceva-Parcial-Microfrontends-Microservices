package uceva.cleanarchitecture.infrastructure.repository;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.repository.BooksRepository;
import uceva.cleanarchitecture.infrastructure.datasource.BooksDatasource;

public class BooksRepositoryImpl implements BooksRepository {

    private final BooksDatasource booksDatasource;

    public BooksRepositoryImpl(BooksDatasource booksDatasource) {
        this.booksDatasource = booksDatasource;
    }

    @Override 
    public List<Book> getAll(int count) {
        return booksDatasource.getAll(count);
    }
    
}
