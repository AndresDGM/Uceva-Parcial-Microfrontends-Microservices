package uceva.cleanarchitecture.domain.entity;

import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Idioma del libro")
public enum Language {
    ESPANOL("Español"),
    INGLES("Inglés"),
    FRANCES("Francés"),
    ALEMAN("Alemán"),
    ITALIANO("Italiano"),
    PORTUGUES("Portugués"),
    CHINO("Chino"),
    JAPONES("Japonés"),
    COREANO("Coreano"),
    RUSO("Ruso");

    private final String value;

    Language(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
