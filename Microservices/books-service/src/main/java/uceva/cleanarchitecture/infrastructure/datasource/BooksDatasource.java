package uceva.cleanarchitecture.infrastructure.datasource;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.github.javafaker.Faker;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;
import uceva.cleanarchitecture.domain.entity.Language;

/**
 * Fuente de datos en memoria para la simulación y gestión de libros.
 * 
 * Actúa como origen de datos simulado (Mock Data Source) utilizando la librería
 * JavaFaker y colecciones predefinidas para proveer información realista en memoria.
 */
public class BooksDatasource {

    /** Colección estática en memoria que almacena los libros generados. */
    private static List<Book> books = new ArrayList<>();

    /** Instancia de generador de datos aleatorios Faker. */
    private static Faker faker = new Faker();

    /** Generador de números aleatorios para selecciones de listas y rangos. */
    private static final Random random = new Random();

    /** Listado predefinido de editoriales reconocidas. */
    private static final String[] publishers = { "Penguin Random House", "HarperCollins", "Simon & Schuster",
            "Hachette Book Group", "Macmillan Publishers", "Scholastic", "Oxford University Press",
            "Cambridge University Press", "Wiley", "Springer" };

    /** Listado de códigos ISBN de ejemplo. */
    private static final String[] isbns = { "978-3-16-148410-0", "978-0-06-112008-4", "978-0-7432-7356-5", "978-0-452-28423-4",
            "978-0-14-028329-7", "978-0-307-38912-1", "978-0-06-231500-7", "978-0-14-044913-6",
            "978-0-06-112241-5", "978-0-14-143960-0" };

    /** Listado de URLs de portadas de muestra usando imágenes de Picsum. */
    private static final String[] coverImageUrls = {
            "https://picsum.photos/seed/book1/400/600",
            "https://picsum.photos/seed/book2/400/600",
            "https://picsum.photos/seed/book3/400/600",
            "https://picsum.photos/seed/book4/400/600",
            "https://picsum.photos/seed/book5/400/600"
    };

    /** Listado de URLs públicas de archivos PDF de prueba. */
    private static final String[] pdfUrls = {
            "https://assets.testfiles.dev/documents/sample-document.pdf",
            "https://pdftoolskit.org/samples/sample-1-page.pdf",
            "https://pdftoolskit.org/samples/sample-10-pages.pdf",
            "https://pdftoolskit.org/samples/sample-100-pages.pdf",
            "https://pdftoolskit.org/samples/sample-500-pages.pdf",
            "https://samplepdf.org/files/sample.pdf"
    };

    /**
     * Retorna la lista de todos los libros almacenados en memoria.
     *
     * @return lista de libros
     */
    public List<Book> getAll() {
        return BooksDatasource.books;
    }

    /**
     * Filtra los libros en memoria que coinciden con un género literario específico.
     *
     * @param genre género literario por el cual filtrar
     * @return lista de libros filtrados por el género
     */
    public List<Book> getAllGenre(Genre genre) {
        List<Book> booksGenre = new ArrayList<>();
        for (Book book : books) {
            if (book.getGenre().equals(genre)) {
                booksGenre.add(book);
            }
        }
        return booksGenre;
    }

    /**
     * Busca un libro en la colección por su identificador único.
     *
     * @param id identificador único del libro
     * @return libro correspondiente al ID
     * @throws RuntimeException si no existe ningún libro con el ID solicitado
     */
    public Book getById(int id) {
        for (Book book : books) {
            if (book.getId() == id) {
                return book;
            }
        }
        throw new RuntimeException("No se encontro el libro con id: " + id);
    }

    /**
     * Genera aleatoriamente una instancia de libro con datos realistas simulados.
     *
     * @param id identificador numérico consecutivo para el libro
     * @return instancia de Book con valores aleatorios
     */
    private static Book generateRandomBook(int id) {
        int authorId = random.nextInt(100) + 1;
        int pages = random.nextInt(1000) + 50;
        String description = faker.lorem().paragraph();
        String title = faker.book().title();
        Genre genre = Genre.values()[random.nextInt(Genre.values().length)];
        Language language = Language.values()[random.nextInt(Language.values().length)];
        String publisher = publishers[random.nextInt(publishers.length)];
        String isbn = isbns[random.nextInt(isbns.length)];
        String coverImageUrl = coverImageUrls[random.nextInt(coverImageUrls.length)];
        String pdfUrl = pdfUrls[random.nextInt(pdfUrls.length)];
        Instant publicationDate = faker.date().past(3650, java.util.concurrent.TimeUnit.DAYS).toInstant();

        return new Book(
                id,
                title,
                authorId,
                isbn,
                publicationDate,
                publisher,
                pages,
                description,
                language,
                genre,
                coverImageUrl,
                pdfUrl);
    }

    /**
     * Genera y carga en memoria una cantidad determinada de libros simulados.
     *
     * @param count número de libros a generar y almacenar
     * @return lista de libros generados
     */
    public static List<Book> generateBooks(int count) {
        for (int i = 0; i < count; i++) {
            books.add(generateRandomBook(i + 1));
        }
        return books;
    }
}
