package uceva.cleanarchitecture.domain.repository;

import java.util.List;

import com.github.javafaker.Book;

public interface BooksRepository {
    public Book findById(int id);
    public Book findByTitleRelated(String title);
    public List<Book> findByAuthorId(int authorId);
}
