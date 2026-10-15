import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../application/usecases/get-all-users.usecase";
import { GetUserByIdUseCase } from "../../../application/usecases/get-user-by-id.usecase";
import { CreateUserUseCase } from "../../../application/usecases/create-user.usecase";

export class UserController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.getAllUsersUseCase.execute();

    res.status(200).json(users);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      error: "El ID del usuario es obligatorio",
    });
    return;
  }

  const user = await this.getUserByIdUseCase.execute(id);

  if (!user) {
    res.status(404).json({
      error: "Usuario no encontrado",
    });
    return;
  }

  res.status(200).json(user);
  };

  create = async (req: Request, res: Response): Promise<void> => {
  const user = await this.createUserUseCase.execute(req.body);

  res.status(201).json(user);
  };
}