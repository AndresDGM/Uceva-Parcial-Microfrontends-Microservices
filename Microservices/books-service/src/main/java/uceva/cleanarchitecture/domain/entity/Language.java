package uceva.cleanarchitecture.domain.entity;

import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Enumeración que define los idiomas disponibles para los libros en el sistema.
 */
@Schema(description = "Idioma del libro")
public enum Language {

    /** Idioma inglés. */
    ENGLISH("English"),

    /** Idioma español. */
    SPANISH("Spanish"),

    /** Idioma francés. */
    FRENCH("French"),

    /** Idioma alemán. */
    GERMAN("German"),

    /** Idioma italiano. */
    ITALIAN("Italian"),

    /** Idioma portugués. */
    PORTUGUESE("Portuguese"),

    /** Idioma chino. */
    CHINESE("Chinese"),

    /** Idioma japonés. */
    JAPANESE("Japanese"),

    /** Idioma coreano. */
    KOREAN("Korean"),

    /** Idioma ruso. */
    RUSSIAN("Russian");

    /** Representación textual del idioma. */
    private final String value;

    /**
     * Constructor del enum Language.
     * @param value valor textual asociado
     */
    Language(String value) {
        this.value = value;
    }

    /**
     * Obtiene el valor textual del idioma para serialización JSON.
     * @return texto representativo del idioma
     */
    @JsonValue
    public String getValue() {
        return value;
    }
}
