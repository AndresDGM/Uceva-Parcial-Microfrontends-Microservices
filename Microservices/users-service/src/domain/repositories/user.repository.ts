import { User } from "../models/user.model";

export abstract class UserRepository {
  abstract getAll(): Promise<User[]>;

  abstract getById(id: string): Promise<User | null>;
}