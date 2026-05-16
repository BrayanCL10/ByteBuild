// src/lib/auth.ts
// Funciones de autenticación con Firebase

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  AuthError,
} from 'firebase/auth';
import { collection, doc, setDoc, getDoc, Firestore } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User, AuthUser, RegisterData } from '@/types/user';

/**
 * Mapea un usuario de Firebase a nuestro tipo User
 */
async function mapFirebaseUserToUser(firebaseUser: FirebaseUser): Promise<User> {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return {
      uid: firebaseUser.uid,
      ...userSnap.data(),
    } as User;
  }

  // Si no existe el documento, crear un usuario por defecto
  return {
    uid: firebaseUser.uid,
    nombre: '',
    apellido: '',
    correo: firebaseUser.email || '',
    ci: '',
    puntos: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Registrar un nuevo usuario
 */
export async function signUp(data: RegisterData): Promise<User> {
  try {
    // Crear usuario en Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.correo,
      data.password
    );

    const firebaseUser = userCredential.user;

    // Crear documento en Firestore
    const newUser: User = {
      uid: firebaseUser.uid,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      ci: data.ci,
      puntos: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);

    return newUser;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Error en registro:', authError.message);
    throw new Error(authError.message);
  }
}

/**
 * Iniciar sesión
 */
export async function signIn(email: string, password: string): Promise<User> {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    return mapFirebaseUserToUser(firebaseUser);
  } catch (error) {
    const authError = error as AuthError;
    console.error('Error en login:', authError.message);
    throw new Error(authError.message);
  }
}

/**
 * Cerrar sesión
 */
export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    const authError = error as AuthError;
    console.error('Error al cerrar sesión:', authError.message);
    throw new Error(authError.message);
  }
}

/**
 * Escuchar cambios de autenticación
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const user = await mapFirebaseUserToUser(firebaseUser);
        callback(user);
      } catch (error) {
        console.error('Error mapeando usuario:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
}

/**
 * Obtener usuario actual
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}
