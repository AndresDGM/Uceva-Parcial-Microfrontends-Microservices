package uceva.cleanarchitecture.domain.entity;

import java.time.Instant;

public class Book {
    private int id;
    private String title;
    private int authorId;
    private String isbn;
    private Instant publicationYear;
    private String publisher;
    private int pages;
    private String description;
    private String language;
    private String genre;
    private String coverImageUrl;
    private String pdfUrl;

    public Book(int id, String title, int authorId, String isbn, Instant publicationYear, String publisher, int pages,
            String description, String language, String genre, String coverImageUrl, String pdfUrl) {
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

    public String getLanguage() {
        return this.language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getGenre() {
        return this.genre;
    }

    public void setGenre(String genre) {
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