package uceva.cleanarchitecture.infrastructure.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import uceva.cleanarchitecture.application.usecase.GetAllUseCase;
import uceva.cleanarchitecture.domain.entity.Book;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController 
@RequestMapping("/books")
@Tag(name = "Books", description = "Operaciones para la consulta y gestión de libros")
public class BooksController {
    private final GetAllUseCase getAllUseCase;

    public BooksController(GetAllUseCase getAllUseCase) {
        this.getAllUseCase = getAllUseCase;
    }

    @GetMapping("/{count}")
    @Operation(summary = "Obtener listado de libros", description = "Retorna una cantidad determinada de libros simulados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Listado de libros obtenido exitosamente"),
        @ApiResponse(responseCode = "400", description = "Parámetro count inválido"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public List<Book> getMethodName(@Parameter(description = "Número de libros a generar y obtener", example = "5") @PathVariable int count) {
        return getAllUseCase.execute(count);
    }
    
}
