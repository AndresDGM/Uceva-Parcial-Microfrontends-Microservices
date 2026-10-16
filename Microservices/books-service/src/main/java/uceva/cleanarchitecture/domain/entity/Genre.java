package uceva.cleanarchitecture.domain.entity;

import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Enumeración que define los géneros literarios soportados en el sistema.
 */
@Schema(description = "Género del libro")
public enum Genre {

    /** Género de ficción narrativa general. */
    FICTION("Fiction"),

    /** Género de no ficción, hechos reales y ensayos. */
    NON_FICTION("Non-Fiction"),

    /** Género de misterio, suspenso y crimen. */
    MYSTERY("Mystery"),

    /** Género de romance y relaciones amorosas. */
    ROMANCE("Romance"),

    /** Género de ciencia ficción, tecnología y futuros especulativos. */
    SCIENCE_FICTION("Science Fiction"),

    /** Género de fantasía, mundos mágicos y mitología. */
    FANTASY("Fantasy"),

    /** Género de biografía y memorias de personajes. */
    BIOGRAPHY("Biography"),

    /** Género de historia y acontecimientos del pasado. */
    HISTORY("History"),

    /** Género de autoayuda, superación personal y bienestar. */
    SELF_HELP("Self-Help"),

    /** Género de literatura infantil y juvenil. */
    CHILDREN("Children");

    /** Representación textual legible del género. */
    private final String value;

    /**
     * Constructor del enum Genre.
     * @param value valor textual asociado
     */
    Genre(String value) {
        this.value = value;
    }

    /**
     * Obtiene el valor textual del género para serialización JSON.
     * @return texto representativo del género
     */
    @JsonValue
    public String getValue() {
        return value;
    }
}
