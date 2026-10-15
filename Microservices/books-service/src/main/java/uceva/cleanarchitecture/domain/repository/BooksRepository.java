package uceva.cleanarchitecture.domain.repository;

import java.util.List;

import com.github.javafaker.Book;

public interface BooksRepository {
    public Book findById(int id);
    public Book findByTitleRelated(String title);
    public List<Book> findByAuthorId(int authorId);
    public List<Book> findByGenre(String genre);
    public List<Book> findByPublicationYear(int year);
    public List<Book> findByPublisher(String publisher);
    public List<Book> findByLanguage(String language);
    public List<Book> getAll();
    public void save(Book book);
    public void update(Book book);
    public void delete(int id);
}
