import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDataSource } from "../datasources/user.datasource";

export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly dataSource: UserDataSource) {
    super();
  }

  override getAll(): Promise<User[]> {
    return this.dataSource.getAll();
  }

  override getById(id: string): Promise<User | null> {
    return this.dataSource.getById(id);
  }

  override create(user: Omit<User, "id">): Promise<User> {
    return this.dataSource.create(user);
  }
}