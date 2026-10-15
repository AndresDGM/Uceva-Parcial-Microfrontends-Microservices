import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { User } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserNodeRepository extends UserRepository {
  private readonly apiUrl = `${environment.baseUrlNode}/api/users`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  override getAll(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(this.apiUrl));
  }

  override getById(id: string): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(`${this.apiUrl}/${id}`)
    );
  }

  override create(user: Omit<User, 'id'>): Promise<User> {
    return firstValueFrom(
      this.http.post<User>(this.apiUrl, user)
    );
  }
}