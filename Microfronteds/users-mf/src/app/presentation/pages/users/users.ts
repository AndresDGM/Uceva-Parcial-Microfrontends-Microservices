import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CreateUser } from '../../../core/application/usecases/create-user';
import { GetAllUsers } from '../../../core/application/usecases/get-all-users';
import { GetUserById } from '../../../core/application/usecases/get-user-by-id';
import { User } from '../../../core/domain/models/user.model';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  private readonly getAllUsers = inject(GetAllUsers);
  private readonly getUserById = inject(GetUserById);
  private readonly createUser = inject(CreateUser);
  private readonly formBuilder = inject(FormBuilder);

  users: User[] = [];
  selectedUser: User | null = null;
  errorMessage = '';
  successMessage = '';

  readonly searchForm = this.formBuilder.nonNullable.group({
    id: ['', Validators.required],
  });

  readonly createForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(1)]],
    email: ['', [Validators.required, Validators.email]],
    engineering: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(clearMessages = true): void {
    if (clearMessages) {
      this.clearMessages();
    }

    this.getAllUsers.execute()
      .then((users) => {
        this.users = users;
      })
      .catch(() => {
        this.errorMessage = 'No fue posible cargar los usuarios.';
      });
  }

  searchUser(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.clearMessages();
    this.selectedUser = null;

    const id = this.searchForm.controls.id.value;

    this.getUserById.execute(id)
      .then((user) => {
        this.selectedUser = user;
      })
      .catch(() => {
        this.errorMessage = 'No fue posible encontrar el usuario.';
      });
  }

  submitUser(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.clearMessages();

    this.createUser.execute(this.createForm.getRawValue())
      .then((user) => {
        this.successMessage = `Usuario ${user.name} creado correctamente.`;
        this.createForm.reset({
          name: '',
          lastName: '',
          age: 0,
          email: '',
          engineering: '',
        });

        this.loadUsers(false);
      })
      .catch(() => {
        this.errorMessage = 'No fue posible crear el usuario.';
      });
  }

  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}