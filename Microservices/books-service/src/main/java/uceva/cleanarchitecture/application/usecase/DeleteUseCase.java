package uceva.cleanarchitecture.application.usecase;

import uceva.cleanarchitecture.domain.repository.BooksRepository;

public class DeleteUseCase {
    private final BooksRepository booksRepository;

    public DeleteUseCase(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    public void execute(int id) {
        booksRepository.delete(id);
    }
}

