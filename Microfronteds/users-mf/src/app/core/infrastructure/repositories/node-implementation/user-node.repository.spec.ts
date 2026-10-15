import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { User } from '../../../domain/models/user.model';
import { environment } from '../../../../../environments/environment';
import { UserNodeRepository } from './user-node.repository';

describe('UserNodeRepository', () => {
  let repository: UserNodeRepository;
  let httpTesting: HttpTestingController;

  const apiUrl = `${environment.baseUrlNode}/api/users`;

  const user: User = {
    id: '1',
    name: 'Juan',
    lastName: 'Pérez',
    age: 25,
    email: 'juan@example.com',
    engineering: 'Software Engineering',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserNodeRepository,
      ],
    });

    repository = TestBed.inject(UserNodeRepository);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create an instance', () => {
    expect(repository).toBeTruthy();
  });

  it('should get all users', async () => {
    const users = [user];

    const promise = repository.getAll();

    const request = httpTesting.expectOne(apiUrl);

    expect(request.request.method).toBe('GET');

    request.flush(users);

    await expect(promise).resolves.toEqual(users);
  });

  it('should get a user by id', async () => {
    const promise = repository.getById('1');

    const request = httpTesting.expectOne(`${apiUrl}/1`);

    expect(request.request.method).toBe('GET');

    request.flush(user);

    await expect(promise).resolves.toEqual(user);
  });

  it('should create a user', async () => {
    const newUser: Omit<User, 'id'> = {
      name: 'María',
      lastName: 'Gómez',
      age: 22,
      email: 'maria@example.com',
      engineering: 'Software Engineering',
    };

    const createdUser: User = {
      id: '4',
      ...newUser,
    };

    const promise = repository.create(newUser);

    const request = httpTesting.expectOne(apiUrl);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newUser);

    request.flush(createdUser);

    await expect(promise).resolves.toEqual(createdUser);
  });
});