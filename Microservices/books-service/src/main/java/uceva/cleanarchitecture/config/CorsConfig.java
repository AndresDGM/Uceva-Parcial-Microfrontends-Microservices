package uceva.cleanarchitecture.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración de políticas CORS (Cross-Origin Resource Sharing) para la aplicación.
 * <p>
 * Permite que los microfrontends (por ejemplo, aplicaciones cliente en Angular corriendo en http://localhost:4200)
 * puedan consumir los endpoints de este microservicio.
 * </p>
 */
@Configuration 
public class CorsConfig implements WebMvcConfigurer {

    /**
     * Configura las reglas de acceso cruzado entre orígenes permitidos, métodos HTTP y encabezados.
     *
     * @param registry registro de mapeos CORS de Spring MVC
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200", "http://localhost:4202")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
