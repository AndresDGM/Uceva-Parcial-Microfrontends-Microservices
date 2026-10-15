import { User } from "../../domain/models/user.model";
import { UserDataSource } from "./user.datasource";

export class NodeUserDataSource extends UserDataSource {
  private readonly users: User[] = [
    {
      id: "1",
      name: "Andrés",
      lastName: "Gómez",
      age: 22,
      email: "andres@example.com",
      engineering: "Ingeniería de Sistemas",
    },
    {
      id: "2",
      name: "Laura",
      lastName: "Martínez",
      age: 21,
      email: "laura@example.com",
      engineering: "Ingeniería de Software",
    },
    {
      id: "3",
      name: "Carlos",
      lastName: "Rodríguez",
      age: 23,
      email: "carlos@example.com",
      engineering: "Ingeniería de Sistemas",
    },
  ];

  override async getAll(): Promise<User[]> {
    return this.users;
  }

  override async getById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}