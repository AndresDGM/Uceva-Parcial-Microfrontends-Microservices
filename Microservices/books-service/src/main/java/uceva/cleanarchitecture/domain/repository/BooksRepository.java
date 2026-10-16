package uceva.cleanarchitecture.domain.repository;

import java.util.List;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;

/**
 * Contrato de repositorio para el dominio de libros.
 * 
 * Define las operaciones abstractas que deben implementar las capas de infraestructura
 * para el acceso y recuperación de datos de libros, desacoplando la lógica de negocio.
 */
public interface BooksRepository {

    /**
     * Obtiene el listado completo de libros disponibles en el sistema.
     *
     * @return lista de todos los libros
     */
    public List<Book> getAll();

    /**
     * Obtiene los libros filtrados según un género literario específico.
     *
     * @param genre género literario por el cual filtrar
     * @return lista de libros que pertenecen al género indicado
     */
    public List<Book> getAllGenre(Genre genre);

    /**
     * Busca y retorna un libro por su identificador único.
     *
     * @param id identificador único del libro
     * @return libro encontrado
     */
    public Book getById(int id);
}
