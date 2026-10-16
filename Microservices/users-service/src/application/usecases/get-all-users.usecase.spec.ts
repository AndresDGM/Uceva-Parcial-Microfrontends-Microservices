import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";
import { GetAllUsersUseCase } from "./get-all-users.usecase";

describe("GetAllUsersUseCase", () => {
  it("debe retornar todos los usuarios del repositorio", async () => {
    const users: User[] = [
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
    ];

    const repository: UserRepository = {
        getAll: jest.fn().mockResolvedValue(users),
        getById: jest.fn(),
        create: jest.fn(),
    };

    const useCase = new GetAllUsersUseCase(repository);

    const result = await useCase.execute();

    expect(result).toEqual(users);
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });
});