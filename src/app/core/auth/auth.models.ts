import { Role } from '../../shared/models/role';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  role: Role;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}