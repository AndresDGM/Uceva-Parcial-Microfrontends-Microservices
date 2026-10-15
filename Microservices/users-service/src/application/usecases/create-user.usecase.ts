import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";

export type CreateUserInput = Omit<User, "id">;

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(user: CreateUserInput): Promise<User> {
    return this.userRepository.create(user);
  }
}