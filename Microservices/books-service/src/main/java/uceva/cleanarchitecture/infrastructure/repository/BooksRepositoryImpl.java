package uceva.cleanarchitecture.infrastructure.repository;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;
import uceva.cleanarchitecture.domain.repository.BooksRepository;
import uceva.cleanarchitecture.infrastructure.datasource.BooksDatasource;

/**
 * Implementación concreta del repositorio de libros en la capa de infraestructura.
 * 
 * Conecta el contrato de dominio {@link BooksRepository} con la fuente de datos {@link BooksDatasource}.
 */
public class BooksRepositoryImpl implements BooksRepository {

    /** Fuente de datos de libros inyectada. */
    private final BooksDatasource booksDatasource;

    /**
     * Constructor de BooksRepositoryImpl.
     *
     * @param booksDatasource fuente de datos para la manipulación de libros
     */
    public BooksRepositoryImpl(BooksDatasource booksDatasource) {
        this.booksDatasource = booksDatasource;
    }

    /**
     * {@inheritDoc}
     */
    @Override 
    public List<Book> getAll() {
        return booksDatasource.getAll();
    }
    
    /**
     * {@inheritDoc}
     */
    @Override
    public List<Book> getAllGenre(Genre genre) {
        return booksDatasource.getAllGenre(genre);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Book getById(int id) {
        return booksDatasource.getById(id);
    }
}
