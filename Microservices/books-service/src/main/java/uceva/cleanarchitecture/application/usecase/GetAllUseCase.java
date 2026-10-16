package uceva.cleanarchitecture.application.usecase;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

/**
 * Caso de uso para obtener el listado completo de libros disponibles.
 * 
 * Orquesta la solicitud hacia el repositorio de libros sin acoplarse
 * a detalles de infraestructura.
 */
public class GetAllUseCase {

    /** Repositorio de libros utilizado para acceder a los datos. */
    private final BooksRepository booksRepository;

    /**
     * Constructor del caso de uso GetAllUseCase.
     *
     * @param booksRepository implementación del contrato de repositorio de libros
     */
    public GetAllUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    /**
     * Ejecuta el caso de uso para recuperar todos los libros.
     *
     * @return lista completa de libros
     */
    public List<Book> execute() {
        return booksRepository.getAll();
    }
}
