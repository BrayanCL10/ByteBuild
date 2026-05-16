// src/lib/firebase.ts
// Configuración básica de Firebase para la aplicación Eco-Point

import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  Auth,
  connectAuthEmulator,
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  Firestore,
  connectFirestoreEmulator,
} from 'firebase/firestore';

// TODO: Reemplaza con tu configuración real de Firebase
// Obtén estos valores desde Firebase Console
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDummyKeyForDevelopment',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'eco-point.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'eco-point-dummy',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'eco-point.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:dummyappid',
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Inicializar Firebase solo en el cliente
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  // Conectar a emuladores en desarrollo si está disponible
  if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, 'localhost', 8080);
    } catch (error) {
      // Los emuladores ya están conectados o hay un error
      console.warn('Emuladores no disponibles:', error);
    }
  }
}

export { app, auth, db };
