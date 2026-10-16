package uceva.cleanarchitecture.domain.entity;

import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Género del libro")
public enum Genre {
    FICCION("Ficción"),
    NO_FICCION("No Ficción"),
    MISTERIO("Misterio"),
    ROMANCE("Romance"),
    CIENCIA_FICCION("Ciencia Ficción"),
    FANTASIA("Fantasía"),
    BIOGRAFIA("Biografía"),
    HISTORIA("Historia"),
    AUTOAYUDA("Autoayuda"),
    INFANTIL("Infantil");

    private final String value;

    Genre(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
