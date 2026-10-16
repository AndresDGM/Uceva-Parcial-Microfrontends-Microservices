import { User } from "../../domain/models/user.model";

export abstract class UserDataSource {
  abstract getAll(): Promise<User[]>;

  abstract getById(id: string): Promise<User | null>;

  abstract create(user: Omit<User, "id">): Promise<User>;
}