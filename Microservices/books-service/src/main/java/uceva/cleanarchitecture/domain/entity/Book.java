package uceva.cleanarchitecture.domain.entity;

import java.time.Instant;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Modelo que representa la entidad de un libro")
public class Book {
    @Schema(description = "Identificador único del libro", example = "1")
    private int id;
    @Schema(description = "Título de la obra", example = "Cien años de soledad")
    private String title;
    @Schema(description = "Identificador del autor del libro", example = "1")
    private int authorId;
    @Schema(description = "Número ISBN del libro", example = "978-3-16-148410-0")
    private String isbn;
    @Schema(description = "Año de publicación del libro", example = "1967-05-30T00:00:00Z")
    private Instant publicationYear;
    @Schema(description = "Editorial del libro", example = "Editorial Sudamericana")
    private String publisher;
    @Schema(description = "Número de páginas del libro", example = "400")
    private int pages;
    @Schema(description = "Descripción del libro", example = "Una obra maestra de la literatura hispanoamericana")
    private String description;
    @Schema(description = "Idioma del libro", example = "Spanish")
    private Language language;
    @Schema(description = "Género del libro", example = "Fantasy")
    private Genre genre;
    @Schema(description = "URL de la imagen de portada", example = "https://example.com/cover.jpg")
    private String coverImageUrl;
    @Schema(description = "URL del archivo PDF", example = "https://example.com/book.pdf")
    private String pdfUrl;

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

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getAuthorId() {
        return this.authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public String getIsbn() {
        return this.isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Instant getPublicationYear() {
        return this.publicationYear;
    }

    public void setPublicationYear(Instant publicationYear) {
        this.publicationYear = publicationYear;
    }

    public String getPublisher() {
        return this.publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getPages() {
        return this.pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Language getLanguage() {
        return this.language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Genre getGenre() {
        return this.genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getCoverImageUrl() {
        return this.coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getPdfUrl() {
        return this.pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }
}