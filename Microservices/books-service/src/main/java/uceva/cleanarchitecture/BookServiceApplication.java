package uceva.cleanarchitecture;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;
import uceva.cleanarchitecture.infrastructure.datasource.BooksDatasource;

@SpringBootApplication
public class BookServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookServiceApplication.class, args);
    }

    @PostConstruct 
    private static void initializeBooks() {
        BooksDatasource.generateBooks(100);
    }
}
