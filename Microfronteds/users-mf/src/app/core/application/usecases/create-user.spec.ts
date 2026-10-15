import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUser } from './create-user';

describe('CreateUser', () => {
  it('should create an instance', () => {
    const repository = {} as UserRepository;

    expect(new CreateUser(repository)).toBeTruthy();
  });

  it('should create a user through the repository', async () => {
    const newUser: Omit<User, 'id'> = {
      name: 'María',
      lastName: 'Gómez',
      age: 22,
      email: 'maria@example.com',
      engineering: 'Software Engineering',
    };

    const createdUser: User = {
      id: '4',
      ...newUser,
    };

    const repository = {
      create: jest.fn().mockResolvedValue(createdUser),
    } as unknown as UserRepository;

    const useCase = new CreateUser(repository);

    await expect(useCase.execute(newUser)).resolves.toEqual(createdUser);
    expect(repository.create).toHaveBeenCalledWith(newUser);
  });
});