import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { Role } from '../../shared/models/role';
import { API_BASE_URL } from '../config/api.config';
import { AuthUser, LoginRequest, LoginResponse } from './auth.models';
import { TokenStorage } from './token-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(TokenStorage);
  private readonly router = inject(Router);

  private readonly _user = signal<AuthUser | null>(this.storage.getUser());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  login(credentials: LoginRequest): Observable<AuthUser> {
    return this.http
      .post<LoginResponse>(`${API_BASE_URL}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          this.storage.save(res.accessToken, res.user);
          this._user.set(res.user);
        }),
        map((res) => res.user),
      );
  }

  logout(): void {
    this.storage.clear();
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  hasRole(...roles: Role[]): boolean {
    const current = this._user()?.role;
    return !!current && roles.includes(current);
  }
}