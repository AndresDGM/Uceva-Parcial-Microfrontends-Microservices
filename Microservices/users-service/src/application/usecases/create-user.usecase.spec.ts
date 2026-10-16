import { describe, expect, it, jest } from "@jest/globals";
import { User } from "../../domain/models/user.model";
import { UserRepository } from "../../domain/repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";

describe("CreateUserUseCase", () => {
  it("debe crear y retornar un usuario", async () => {
    const user: User = {
      id: "4",
      name: "María",
      lastName: "Gómez",
      age: 22,
      email: "maria@example.com",
      engineering: "Ingeniería de Sistemas",
    };

    const repository: UserRepository = {
        getAll: jest.fn<UserRepository["getAll"]>().mockResolvedValue([]),
        getById: jest.fn<UserRepository["getById"]>().mockResolvedValue(null),
        create: jest.fn<UserRepository["create"]>().mockResolvedValue(user),
    };

    const useCase = new CreateUserUseCase(repository);

    const result = await useCase.execute({
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      engineering: user.engineering,
    });

    expect(result).toEqual(user);
    expect(repository.create).toHaveBeenCalledWith({
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      engineering: user.engineering,
    });
    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});