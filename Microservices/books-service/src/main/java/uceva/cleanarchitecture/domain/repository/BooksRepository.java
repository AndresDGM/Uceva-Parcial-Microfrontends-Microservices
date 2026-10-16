package uceva.cleanarchitecture.domain.repository;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;


public interface BooksRepository {
    public List<Book> getAll(int count);
}
