import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetAllUsers } from './get-all-users';

describe('GetAllUsers', () => {
  it('should create an instance', () => {
    const repository = {} as UserRepository;

    expect(new GetAllUsers(repository)).toBeTruthy();
  });

  it('should return all users from the repository', async () => {
    const users: User[] = [
      {
        id: '1',
        name: 'Juan',
        lastName: 'Pérez',
        age: 25,
        email: 'juan@example.com',
        engineering: 'Software Engineering',
      },
    ];

    const repository = {
      getAll: jest.fn().mockResolvedValue(users),
    } as unknown as UserRepository;

    const useCase = new GetAllUsers(repository);

    await expect(useCase.execute()).resolves.toEqual(users);
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });
});