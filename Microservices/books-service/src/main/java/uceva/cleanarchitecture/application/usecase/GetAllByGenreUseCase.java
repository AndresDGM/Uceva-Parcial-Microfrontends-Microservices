package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

/**
 * Caso de uso para filtrar y listar libros según su género literario.
 * 
 * Permite segmentar el catálogo de libros según la categoría temática indicada.
 */
public class GetAllByGenreUseCase {

    /** Repositorio de libros utilizado para acceder a los datos. */
    private final BooksRepository booksRepository;

    /**
     * Constructor del caso de uso GetAllByGenreUseCase.
     *
     * @param booksRepository implementación del contrato de repositorio de libros
     */
    public GetAllByGenreUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    /**
     * Ejecuta el caso de uso para obtener los libros pertenecientes a un género.
     *
     * @param genre género literario a filtrar
     * @return lista de libros que coinciden con el género solicitado
     */
    public List<Book> execute(Genre genre) {
        return booksRepository.getAllGenre(genre);
    }
}
