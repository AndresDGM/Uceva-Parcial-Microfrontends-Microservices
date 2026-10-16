package uceva.cleanarchitecture.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import uceva.cleanarchitecture.application.usecase.GetAllUseCase;
import uceva.cleanarchitecture.domain.repository.BooksRepository;
import uceva.cleanarchitecture.infrastructure.datasource.BooksDatasource;
import uceva.cleanarchitecture.infrastructure.repository.BooksRepositoryImpl;

@Configuration
public class AppConfig {

    @Bean
    BooksDatasource booksDatasource(){
        return new BooksDatasource();
    }

    @Bean
    BooksRepository booksRepository(BooksDatasource booksDatasource) {
        return new BooksRepositoryImpl(booksDatasource);
    }

    @Bean
    GetAllUseCase getAllBooksUseCase(BooksRepository booksRepository) {
        return new GetAllUseCase(booksRepository);
    }
}