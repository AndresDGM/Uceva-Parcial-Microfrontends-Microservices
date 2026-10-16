package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.repository.BooksRepository;

/**
 * Caso de uso para consultar un libro específico a partir de su ID.
 * 
 * Permite obtener el detalle bibliográfico de un libro puntual
 * mediante la delegación al repositorio de dominio.
 */
public class GetByIdUseCase {

    /** Repositorio de libros utilizado para acceder a los datos. */
    private final BooksRepository booksRepository;

    /**
     * Constructor del caso de uso GetByIdUseCase.
     *
     * @param booksRepository implementación del contrato de repositorio de libros
     */
    public GetByIdUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    /**
     * Ejecuta el caso de uso para buscar un libro por su identificador.
     *
     * @param id identificador único del libro a consultar
     * @return libro encontrado
     */
    public Book execute(int id) {
        return booksRepository.getById(id);
    }
}
