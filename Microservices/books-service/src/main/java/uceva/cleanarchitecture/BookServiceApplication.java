package uceva.cleanarchitecture;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;
import uceva.cleanarchitecture.infrastructure.datasource.BooksDatasource;

/**
 * Clase principal de inicio para el microservicio de libros (Books Service).
 * <p>
 * Inicializa la aplicación Spring Boot y ejecuta la carga inicial de datos simulados
 * para la persistencia en memoria.
 * </p>
 */
@SpringBootApplication
public class BookServiceApplication {

    /**
     * Punto de entrada principal de la aplicación.
     *
     * @param args argumentos pasados por línea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(BookServiceApplication.class, args);
    }

    /**
     * Método de ciclo de vida ejecutado tras la inicialización del contexto de Spring.
     * Genera un conjunto inicial de libros de prueba para el datasource en memoria.
     */
    @PostConstruct 
    private static void initializeBooks() {
        BooksDatasource.generateBooks(100);
    }
}
