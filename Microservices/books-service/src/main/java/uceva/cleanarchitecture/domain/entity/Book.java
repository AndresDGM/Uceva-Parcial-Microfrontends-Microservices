package uceva.cleanarchitecture.domain.entity;

import java.time.Instant;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Entidad de dominio que representa un libro dentro del sistema.
 * 
 * Contiene toda la información bibliográfica, metadatos y enlaces de acceso
 * digital correspondientes a la obra.
 */
@Schema(description = "Modelo que representa la entidad de un libro")
public class Book {

    /** Identificador único del libro en el sistema. */
    @Schema(description = "Identificador único del libro", example = "1")
    private int id;

    /** Título oficial de la obra literaria. */
    @Schema(description = "Título de la obra", example = "Cien años de soledad")
    private String title;

    /** Identificador del autor de la obra. */
    @Schema(description = "Identificador del autor del libro", example = "1")
    private int authorId;

    /** Código estándar internacional del libro (ISBN). */
    @Schema(description = "Número ISBN del libro", example = "978-3-16-148410-0")
    private String isbn;

    /** Fecha y hora exacta de publicación de la obra. */
    @Schema(description = "Año de publicación del libro", example = "1967-05-30T00:00:00Z")
    private Instant publicationYear;

    /** Editorial encargada de la publicación del libro. */
    @Schema(description = "Editorial del libro", example = "Editorial Sudamericana")
    private String publisher;

    /** Cantidad total de páginas que componen el libro. */
    @Schema(description = "Número de páginas del libro", example = "400")
    private int pages;

    /** Sinopsis o descripción resumida del contenido del libro. */
    @Schema(description = "Descripción del libro", example = "Una obra maestra de la literatura hispanoamericana")
    private String description;

    /** Idioma en el cual se encuentra escrito el libro. */
    @Schema(description = "Idioma del libro", example = "Spanish")
    private Language language;

    /** Género o categoría literaria a la que pertenece la obra. */
    @Schema(description = "Género del libro", example = "Fantasy")
    private Genre genre;

    /** URL pública de la imagen de portada del libro. */
    @Schema(description = "URL de la imagen de portada", example = "https://example.com/cover.jpg")
    private String coverImageUrl;

    /** URL de descarga o visualización del documento digital en PDF. */
    @Schema(description = "URL del archivo PDF", example = "https://example.com/book.pdf")
    private String pdfUrl;

    /**
     * Constructor completo para instanciar la entidad Book.
     *
     * @param id Identificador único del libro
     * @param title Título de la obra
     * @param authorId Identificador del autor
     * @param isbn Código ISBN
     * @param publicationYear Fecha de publicación
     * @param publisher Casa editorial
     * @param pages Cantidad de páginas
     * @param description Sinopsis o descripción
     * @param language Idioma de la obra
     * @param genre Género literario
     * @param coverImageUrl URL de la imagen de portada
     * @param pdfUrl URL del archivo PDF
     */
    public Book(int id, String title, int authorId, String isbn, Instant publicationYear, String publisher, int pages,
            String description, Language language, Genre genre, String coverImageUrl, String pdfUrl) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.isbn = isbn;
        this.publicationYear = publicationYear;
        this.publisher = publisher;
        this.pages = pages;
        this.description = description;
        this.language = language;
        this.genre = genre;
        this.coverImageUrl = coverImageUrl;
        this.pdfUrl = pdfUrl;
    }

    /**
     * Obtiene el identificador único del libro.
     * @return id del libro
     */
    public int getId() {
        return this.id;
    }

    /**
     * Establece el identificador único del libro.
     * @param id identificador del libro
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Obtiene el título del libro.
     * @return título de la obra
     */
    public String getTitle() {
        return this.title;
    }

    /**
     * Establece el título del libro.
     * @param title título de la obra
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Obtiene el identificador del autor del libro.
     * @return identificador del autor
     */
    public int getAuthorId() {
        return this.authorId;
    }

    /**
     * Establece el identificador del autor del libro.
     * @param authorId identificador del autor
     */
    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    /**
     * Obtiene el código ISBN del libro.
     * @return código ISBN
     */
    public String getIsbn() {
        return this.isbn;
    }

    /**
     * Establece el código ISBN del libro.
     * @param isbn código ISBN
     */
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    /**
     * Obtiene la fecha de publicación del libro.
     * @return fecha de publicación
     */
    public Instant getPublicationYear() {
        return this.publicationYear;
    }

    /**
     * Establece la fecha de publicación del libro.
     * @param publicationYear fecha de publicación
     */
    public void setPublicationYear(Instant publicationYear) {
        this.publicationYear = publicationYear;
    }

    /**
     * Obtiene la editorial del libro.
     * @return editorial
     */
    public String getPublisher() {
        return this.publisher;
    }

    /**
     * Establece la editorial del libro.
     * @param publisher editorial
     */
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    /**
     * Obtiene el número de páginas del libro.
     * @return cantidad de páginas
     */
    public int getPages() {
        return this.pages;
    }

    /**
     * Establece el número de páginas del libro.
     * @param pages cantidad de páginas
     */
    public void setPages(int pages) {
        this.pages = pages;
    }

    /**
     * Obtiene la descripción o sinopsis del libro.
     * @return descripción del libro
     */
    public String getDescription() {
        return this.description;
    }

    /**
     * Establece la descripción o sinopsis del libro.
     * @param description descripción del libro
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Obtiene el idioma del libro.
     * @return enum Language correspondiente
     */
    public Language getLanguage() {
        return this.language;
    }

    /**
     * Establece el idioma del libro.
     * @param language enum Language correspondiente
     */
    public void setLanguage(Language language) {
        this.language = language;
    }

    /**
     * Obtiene el género literario del libro.
     * @return enum Genre correspondiente
     */
    public Genre getGenre() {
        return this.genre;
    }

    /**
     * Establece el género literario del libro.
     * @param genre enum Genre correspondiente
     */
    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    /**
     * Obtiene la URL de la portada del libro.
     * @return enlace a la imagen de portada
     */
    public String getCoverImageUrl() {
        return this.coverImageUrl;
    }

    /**
     * Establece la URL de la portada del libro.
     * @param coverImageUrl enlace a la imagen de portada
     */
    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    /**
     * Obtiene la URL del archivo PDF del libro.
     * @return enlace al documento digital
     */
    public String getPdfUrl() {
        return this.pdfUrl;
    }

    /**
     * Establece la URL del archivo PDF del libro.
     * @param pdfUrl enlace al documento digital
     */
    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }
}