package uceva.cleanarchitecture.infrastructure.datasource;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.github.javafaker.Faker;

import uceva.cleanarchitecture.domain.entity.Book;
import uceva.cleanarchitecture.domain.entity.Genre;
import uceva.cleanarchitecture.domain.entity.Language;


public class BooksDatasource {
    private static List<Book> books = new ArrayList<>();
    private static Faker faker = new Faker();
    private static final Random random = new Random();
    private static final String[] publishers = { "Penguin Random House", "HarperCollins", "Simon & Schuster",
            "Hachette Book Group", "Macmillan Publishers", "Scholastic", "Oxford University Press",
            "Cambridge University Press", "Wiley", "Springer" };
    private static final String[] isbns = { "978-3-16-148410-0", "978-0-06-112008-4", "978-0-7432-7356-5", "978-0-452-28423-4",
            "978-0-14-028329-7", "978-0-307-38912-1", "978-0-06-231500-7", "978-0-14-044913-6",
            "978-0-06-112241-5", "978-0-14-143960-0" };
    private static final String[] coverImageUrls = {
            "https://picsum.photos/seed/book1/400/600",
            "https://picsum.photos/seed/book2/400/600",
            "https://picsum.photos/seed/book3/400/600",
            "https://picsum.photos/seed/book4/400/600",
            "https://picsum.photos/seed/book5/400/600"
    };
    private static final String[] pdfUrls = {
            "https://assets.testfiles.dev/documents/sample-document.pdf",
            "https://pdftoolskit.org/samples/sample-1-page.pdf",
            "https://pdftoolskit.org/samples/sample-10-pages.pdf",
            "https://pdftoolskit.org/samples/sample-100-pages.pdf",
            "https://pdftoolskit.org/samples/sample-500-pages.pdf",
            "https://samplepdf.org/files/sample.pdf"
    };

    public List<Book> getAll() {
        return BooksDatasource.books;
    }

    public List<Book> getAllGenre(Genre genre) {
        List<Book> booksGenre = new ArrayList<>();
        for (Book book : books) {
            if(book.getGenre().equals(genre))
                booksGenre.add(book);
        }
        return booksGenre;
    }

    public Book getById(int id) {
        for (Book book : books) {
            if(book.getId() == id) return book;
        }
        throw new RuntimeException("No se encontro el libro con id: " + id);
    }

    private static  Book generateRandomBook(int id) {
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

    public static List<Book> generateBooks(int count) {
        for (int i = 0; i < count; i++) {
            books.add(generateRandomBook(i + 1));
        }
        return books;
    }
}
