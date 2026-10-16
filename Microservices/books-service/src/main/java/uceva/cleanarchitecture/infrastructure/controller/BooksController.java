package uceva.cleanarchitecture.infrastructure.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import uceva.cleanarchitecture.application.usecase.GetAllByGenreUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllUseCase;
import uceva.cleanarchitecture.application.usecase.GetByIdUseCase;
import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Controlador REST que expone los endpoints para la gestión y consulta de libros.
 * <p>
 * Forma parte de la capa de infraestructura en la Arquitectura Limpia,
 * comunicándose con la capa de aplicación a través de los casos de uso.
 * </p>
 */
@RestController
@RequestMapping("/books")
@Tag(name = "Books", description = "Operaciones para la consulta y gestión de libros")
public class BooksController {

    /**
     * Caso de uso para obtener todos los libros disponibles.
     */
    private final GetAllUseCase getAllUseCase;

    /**
     * Caso de uso para obtener un libro específico por su identificador.
     */
    private final GetByIdUseCase getByIdUseCase;

    /**
     * Caso de uso para obtener libros filtrados por su género literario.
     */
    private final GetAllByGenreUseCase getAllByGenreUseCase;

    /**
     * Constructor para la inyección de dependencias de los casos de uso.
     *
     * @param getAllUseCase caso de uso para listar todos los libros
     * @param getByIdUseCase caso de uso para buscar libro por id
     * @param getAllByGenreUseCase caso de uso para listar libros por género
     */
    public BooksController(GetAllUseCase getAllUseCase, GetByIdUseCase getByIdUseCase,
            GetAllByGenreUseCase getAllByGenreUseCase) {
        this.getAllUseCase = getAllUseCase;
        this.getByIdUseCase = getByIdUseCase;
        this.getAllByGenreUseCase = getAllByGenreUseCase;
    }

    /**
     * Obtiene el listado completo de libros registrados.
     *
     * @return lista de objetos {@link Book}
     */
    @GetMapping("/")
    @Operation(summary = "Obtener listado de libros", description = "Retorna una lista de libros")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado de libros obtenido exitosamente"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public List<Book> getAllBooks() {
        return getAllUseCase.execute();
    }

    /**
     * Obtiene una lista de libros filtrados según el género especificado.
     *
     * @param genre género literario definido en {@link Genre}
     * @return lista de libros que pertenecen al género indicado
     */
    @GetMapping("/genre/{genre}")
    @Operation(summary = "Obtener listado de libros segun el genero", description = "Retorna una lista de libros segun el genero")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado de libros obtenido exitosamente"),
            @ApiResponse(responseCode = "400", description = "Parámetro genre inválido"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public List<Book> getAllByGenre(
            @Parameter(description = "Genero de los libros que quieres filtrar", example = "FANTASY") @PathVariable Genre genre) {
        return getAllByGenreUseCase.execute(genre);
    }

    /**
     * Obtiene la información detallada de un libro por su identificador único.
     *
     * @param id identificador numérico del libro
     * @return instancia de {@link Book} correspondiente al identificador, o {@code null} si no se encuentra
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtener libro segun el id", description = "Retorna un libro segun el id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Libro obtenido exitosamente"),
            @ApiResponse(responseCode = "400", description = "Parámetro id inválido"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public Book getById(
            @Parameter(description = "Id del libro que quieres consultar", example = "1") @PathVariable int id) {
        return getByIdUseCase.execute(id);
    }
}

