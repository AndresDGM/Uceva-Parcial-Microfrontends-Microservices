import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUserById } from './get-user-by-id';

describe('GetUserById', () => {
  it('should create an instance', () => {
    const repository = {} as UserRepository;

    expect(new GetUserById(repository)).toBeTruthy();
  });

  it('should return the requested user from the repository', async () => {
    const user: User = {
      id: '1',
      name: 'Juan',
      lastName: 'Pérez',
      age: 25,
      email: 'juan@example.com',
      engineering: 'Software Engineering',
    };

    const repository = {
      getById: jest.fn().mockResolvedValue(user),
    } as unknown as UserRepository;

    const useCase = new GetUserById(repository);

    await expect(useCase.execute('1')).resolves.toEqual(user);
    expect(repository.getById).toHaveBeenCalledWith('1');
  });
});