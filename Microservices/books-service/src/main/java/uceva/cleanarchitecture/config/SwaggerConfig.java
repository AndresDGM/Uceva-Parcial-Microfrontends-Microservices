package uceva.cleanarchitecture.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

/**
 * Configuración de OpenAPI / Swagger para la generación automática de la documentación interactiva de la API.
 */
@Configuration 
public class SwaggerConfig {
    
    /**
     * Define la especificación y metadatos generales de OpenAPI expuestos en Swagger UI.
     *
     * @return instancia configurada de {@link OpenAPI} con título, versión y descripción del microservicio
     */
    @Bean 
    public OpenAPI BooksOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Books Service API")
                        .version("1.0")
                        .description("Microservicio para la gestión y consulta de libros con Clean Architecture"));
    }
}
