package uceva.cleanarchitecture.domain.entity;

import com.fasterxml.jackson.annotation.JsonValue;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Género del libro")
public enum Genre {
    FICTION("Fiction"),
    NON_FICTION("Non-Fiction"),
    MYSTERY("Mystery"),
    ROMANCE("Romance"),
    SCIENCE_FICTION("Science Fiction"),
    FANTASY("Fantasy"),
    BIOGRAPHY("Biography"),
    HISTORY("History"),
    SELF_HELP("Self-Help"),
    CHILDREN("Children");

    private final String value;

    Genre(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
