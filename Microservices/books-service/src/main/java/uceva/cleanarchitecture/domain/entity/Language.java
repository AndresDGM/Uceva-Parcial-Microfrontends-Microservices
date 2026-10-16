package uceva.cleanarchitecture.domain.entity;

import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Idioma del libro")
public enum Language {
    ENGLISH("English"),
    SPANISH("Spanish"),
    FRENCH("French"),
    GERMAN("German"),
    ITALIAN("Italian"),
    PORTUGUESE("Portuguese"),
    CHINESE("Chinese"),
    JAPANESE("Japanese"),
    KOREAN("Korean"),
    RUSSIAN("Russian");

    private final String value;

    Language(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
