import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}