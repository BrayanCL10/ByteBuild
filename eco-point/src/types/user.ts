export interface User {
  uid: string;
  nombre: string;
  apellido: string;
  correo: string;
  ci: string;
  puntos: number;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  correo: string;
  ci: string;
  password: string;
}
