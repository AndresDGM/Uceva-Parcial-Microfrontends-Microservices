import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { GetAllUsersUseCase } from "../../../application/usecases/get-all-users.usecase";
import { GetUserByIdUseCase } from "../../../application/usecases/get-user-by-id.usecase";
import { UserRepositoryImpl } from "../../repositories/user.repository.impl";
import { NodeUserDataSource } from "../../datasources/node-user.datasource";
import { CreateUserUseCase } from "../../../application/usecases/create-user.usecase";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new NodeUserDataSource();
    const userRepository = new UserRepositoryImpl(dataSource);

    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const userController = new UserController(
        getAllUsersUseCase,
        getUserByIdUseCase,
        createUserUseCase,
    );

    /**
     * @openapi
     * /api/users:
     *   get:
     *     summary: Obtener todos los usuarios
     *     tags:
     *       - Users
     *     responses:
     *       200:
     *         description: Lista de usuarios
     */
    router.get("/", userController.getAll);

    /**
     * @openapi
     * /api/users/{id}:
     *   get:
     *     summary: Obtener un usuario por ID
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *       404:
     *         description: Usuario no encontrado
     */
    router.get("/:id", userController.getById);
    
    /**
    * @openapi
    * /api/users:
    *   post:
    *     summary: Crear un usuario
    *     tags:
    *       - Users
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       201:
    *         description: Usuario creado
    */
    router.post("/", userController.create);
    
    return router;
  }
}