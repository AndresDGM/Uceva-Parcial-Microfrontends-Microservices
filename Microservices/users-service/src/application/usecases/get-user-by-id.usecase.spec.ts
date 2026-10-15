import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";
import { GetUserByIdUseCase } from "./get-user-by-id.usecase";

describe("GetUserByIdUseCase", () => {
  it("debe retornar un usuario cuando existe", async () => {
    const user: User = {
      id: "1",
      name: "Andrés",
      lastName: "Gómez",
      age: 22,
      email: "andres@example.com",
      engineering: "Ingeniería de Sistemas",
    };

    const repository: UserRepository = {
        getAll: jest.fn(),
        getById: jest.fn().mockResolvedValue(user),
        create: jest.fn(),
    };

    const useCase = new GetUserByIdUseCase(repository);

    const result = await useCase.execute("1");

    expect(result).toEqual(user);
    expect(repository.getById).toHaveBeenCalledWith("1");
    expect(repository.getById).toHaveBeenCalledTimes(1);
  });

  it("debe retornar null cuando el usuario no existe", async () => {
    const repository: UserRepository = {
        getAll: jest.fn(),
        getById: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
    };

    const useCase = new GetUserByIdUseCase(repository);

    const result = await useCase.execute("999");

    expect(result).toBeNull();
    expect(repository.getById).toHaveBeenCalledWith("999");
  });
});