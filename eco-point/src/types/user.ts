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
  id_usuario?: string;
  id_rol?: number;
  estado?: number;
  username?: string;
  url_foto_perfil?: string;
  google_id?: string;
  fecha_nac?: string;
  genero?: string;
  telefono?: string;
  puntos_totales?: number;
  puntos_canjeados?: number;
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
