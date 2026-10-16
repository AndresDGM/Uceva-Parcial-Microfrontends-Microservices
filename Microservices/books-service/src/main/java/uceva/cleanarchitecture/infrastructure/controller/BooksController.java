package uceva.cleanarchitecture.infrastructure.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uceva.cleanarchitecture.application.usecase.GetAllUseCase;
import uceva.cleanarchitecture.domain.entity.Book;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController 
@RequestMapping("/books")
public class BooksController {
    private final GetAllUseCase getAllUseCase;

    public BooksController(GetAllUseCase getAllUseCase) {
        this.getAllUseCase = getAllUseCase;
    }

    @GetMapping("/{count}")
    public List<Book> getMethodName(@PathVariable int count) {
        return getAllUseCase.execute(count);
    }
    
}
