package uceva.cleanarchitecture.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import uceva.cleanarchitecture.application.usecase.GetAllByGenreUseCase;
import uceva.cleanarchitecture.application.usecase.GetAllUseCase;
import uceva.cleanarchitecture.application.usecase.GetByIdUseCase;
import uceva.cleanarchitecture.domain.repository.BooksRepository;
import uceva.cleanarchitecture.infrastructure.datasource.BooksDatasource;
import uceva.cleanarchitecture.infrastructure.repository.BooksRepositoryImpl;

/**
 * Clase de configuración de Spring para el registro y cableado de dependencias (Beans)
 * en el contexto de Arquitectura Limpia.
 * <p>
 * Define la creación del datasource, la implementación del repositorio y los casos de uso
 * de la capa de aplicación, facilitando la inversión de control.
 * </p>
 */
@Configuration
public class AppConfig {

    /**
     * Registra el componente {@link BooksDatasource} que gestiona la fuente de datos en memoria.
     *
     * @return nueva instancia de {@link BooksDatasource}
     */
    @Bean
    BooksDatasource booksDatasource(){
        return new BooksDatasource();
    }

    /**
     * Registra la implementación de {@link BooksRepository} utilizando el datasource en memoria.
     *
     * @param booksDatasource fuente de datos inyectada
     * @return implementación {@link BooksRepositoryImpl}
     */
    @Bean
    BooksRepository booksRepository(BooksDatasource booksDatasource) {
        return new BooksRepositoryImpl(booksDatasource);
    }

    /**
     * Registra el caso de uso {@link GetAllUseCase} para listar todos los libros.
     *
     * @param booksRepository repositorio de libros
     * @return instancia de {@link GetAllUseCase}
     */
    @Bean
    GetAllUseCase getAllBooksUseCase(BooksRepository booksRepository) {
        return new GetAllUseCase(booksRepository);
    }

    /**
     * Registra el caso de uso {@link GetAllByGenreUseCase} para consultar libros filtrando por género.
     *
     * @param booksRepository repositorio de libros
     * @return instancia de {@link GetAllByGenreUseCase}
     */
    @Bean 
    GetAllByGenreUseCase getAllByGenreUseCase(BooksRepository booksRepository){
        return new GetAllByGenreUseCase(booksRepository);
    }

    /**
     * Registra el caso de uso {@link GetByIdUseCase} para consultar un libro por su identificador único.
     *
     * @param booksRepository repositorio de libros
     * @return instancia de {@link GetByIdUseCase}
     */
    @Bean 
    GetByIdUseCase getByIdUseCase(BooksRepository booksRepository){
        return new GetByIdUseCase(booksRepository);
    }
}