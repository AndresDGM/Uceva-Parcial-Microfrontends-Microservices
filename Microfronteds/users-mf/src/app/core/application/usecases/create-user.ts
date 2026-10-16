import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  execute(user: Omit<User, 'id'>): Promise<User> {
    return this.userRepository.create(user);
  }
}