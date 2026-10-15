import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

export class GetUserById {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
}