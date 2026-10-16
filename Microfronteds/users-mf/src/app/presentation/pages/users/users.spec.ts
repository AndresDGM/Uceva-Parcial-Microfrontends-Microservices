import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUser } from '../../../core/application/usecases/create-user';
import { GetAllUsers } from '../../../core/application/usecases/get-all-users';
import { GetUserById } from '../../../core/application/usecases/get-user-by-id';
import { User } from '../../../core/domain/models/user.model';
import { Users } from './users';

describe('Users', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;

  let getAllUsers: { execute: jest.Mock };
  let getUserById: { execute: jest.Mock };
  let createUser: { execute: jest.Mock };

  const users: User[] = [
    {
      id: '1',
      name: 'Juan',
      lastName: 'Pérez',
      age: 25,
      email: 'juan@example.com',
      engineering: 'Software Engineering',
    },
    {
      id: '2',
      name: 'Laura',
      lastName: 'Gómez',
      age: 22,
      email: 'laura@example.com',
      engineering: 'Systems Engineering',
    },
  ];

  const newUser: Omit<User, 'id'> = {
    name: 'María',
    lastName: 'Gómez',
    age: 22,
    email: 'maria@example.com',
    engineering: 'Software Engineering',
  };

  const createdUser: User = {
    id: '3',
    ...newUser,
  };

  beforeEach(async () => {
    getAllUsers = {
      execute: jest.fn().mockResolvedValue(users),
    };

    getUserById = {
      execute: jest.fn().mockResolvedValue(users[0]),
    };

    createUser = {
      execute: jest.fn().mockResolvedValue(createdUser),
    };

    await TestBed.configureTestingModule({
      imports: [Users],
      providers: [
        {
          provide: GetAllUsers,
          useValue: getAllUsers,
        },
        {
          provide: GetUserById,
          useValue: getUserById,
        },
        {
          provide: CreateUser,
          useValue: createUser,
        },
      ],
    })
      .overrideComponent(Users, {
        set: { providers: [] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    expect(getAllUsers.execute).toHaveBeenCalledTimes(1);
    expect(component.users).toEqual(users);
  });

  it('should search for a user by id', async () => {
    component.searchForm.setValue({ id: '1' });

    component.searchUser();

    await fixture.whenStable();

    expect(getUserById.execute).toHaveBeenCalledWith('1');
    expect(component.selectedUser).toEqual(users[0]);
    expect(component.errorMessage).toBe('');
  });

  it('should not search when the search form is invalid', () => {
    component.searchForm.setValue({ id: '' });

    component.searchUser();

    expect(getUserById.execute).not.toHaveBeenCalled();
    expect(component.searchForm.controls.id.touched).toBe(true);
  });

  it('should show an error when searching for a user fails', async () => {
    getUserById.execute.mockRejectedValueOnce(new Error('User not found'));

    component.searchForm.setValue({ id: '99' });

    component.searchUser();

    await fixture.whenStable();

    expect(component.selectedUser).toBeNull();
    expect(component.errorMessage).toBe(
      'No fue posible encontrar el usuario.',
    );
  });

  it('should create a user', async () => {
    component.createForm.setValue(newUser);

    component.submitUser();

    await fixture.whenStable();

    expect(createUser.execute).toHaveBeenCalledWith(newUser);
    expect(component.successMessage).toBe(
      'Usuario María creado correctamente.',
    );
  });

  it('should not create when the create form is invalid', () => {
    component.createForm.setValue({
      name: '',
      lastName: '',
      age: 0,
      email: '',
      engineering: '',
    });

    component.submitUser();

    expect(createUser.execute).not.toHaveBeenCalled();
    expect(component.createForm.controls.name.touched).toBe(true);
  });

  it('should show an error when creating a user fails', async () => {
    createUser.execute.mockRejectedValueOnce(new Error('Create failed'));

    component.createForm.setValue(newUser);

    component.submitUser();

    await fixture.whenStable();

    expect(component.errorMessage).toBe(
      'No fue posible crear el usuario.',
    );
  });

  it('should show an error when loading users fails', async () => {
    getAllUsers.execute.mockRejectedValueOnce(new Error('Load failed'));

    component.loadUsers();

    await fixture.whenStable();

    expect(component.errorMessage).toBe(
      'No fue posible cargar los usuarios.',
    );
  });

  it('should clear the selected user before searching again', async () => {
    component.selectedUser = users[0];
    component.searchForm.setValue({ id: '2' });

    getUserById.execute.mockResolvedValueOnce(users[1]);

    component.searchUser();

    await fixture.whenStable();

    expect(component.selectedUser).toEqual(users[1]);
  });

  it('should clear messages before loading users', async () => {
    component.errorMessage = 'Previous error';
    component.successMessage = 'Previous success';

    component.loadUsers();

    await fixture.whenStable();

    expect(component.errorMessage).toBe('');
    expect(component.successMessage).toBe('');
  });
});