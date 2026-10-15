import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { CreateUser } from './core/application/usecases/create-user';
import { GetAllUsers } from './core/application/usecases/get-all-users';
import { GetUserById } from './core/application/usecases/get-user-by-id';
import { UserRepository } from './core/domain/repositories/user.repository';
import { UserNodeRepository } from './core/infrastructure/repositories/node-implementation/user-node.repository';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    {
      provide: UserRepository,
      useClass: UserNodeRepository,
    },
    {
      provide: GetAllUsers,
      useFactory: (repository: UserRepository) =>
        new GetAllUsers(repository),
      deps: [UserRepository],
    },
    {
      provide: GetUserById,
      useFactory: (repository: UserRepository) =>
        new GetUserById(repository),
      deps: [UserRepository],
    },
    {
      provide: CreateUser,
      useFactory: (repository: UserRepository) =>
        new CreateUser(repository),
      deps: [UserRepository],
    },
  ],
};