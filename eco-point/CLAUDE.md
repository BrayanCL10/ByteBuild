# Eco-Point - Documentación del Proyecto

## 📋 Descripción General

**Eco-Point** es una plataforma inteligente de reciclaje desarrollada para la Alcaldía de Cochabamba. Permite a los usuarios registrar sus depósitos de residuos en contenedores especializados y ganar puntos que pueden ser canjeados por recompensas.

## 🏗️ Stack Tecnológico

- **Framework**: Next.js 16.2.6
- **Lenguaje**: TypeScript 5
- **UI**: React 19.2.4 + Tailwind CSS 4
- **Backend**: Firebase (Authentication + Firestore)
- **Linting**: ESLint 9

## 📁 Estructura del Proyecto

```
eco-point/
├── src/
│   ├── app/              # Rutas de Next.js 13+
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Página de inicio/splash
│   │   ├── login/        # Autenticación
│   │   ├── register/     # Registro
│   │   ├── home/         # Dashboard principal
│   │   ├── admin/        # Panel administrativo
│   │   └── container/    # Detalles de contenedor
│   ├── components/       # Componentes React reutilizables
│   ├── lib/             # Utilidades y servicios
│   │   ├── firebase.ts  # Config de Firebase
│   │   ├── auth.ts      # Funciones de autenticación
│   │   └── points.ts    # Lógica de puntos
│   ├── data/            # Datos fake para desarrollo
│   └── types/           # Tipos TypeScript
├── public/              # Activos estáticos
└── package.json         # Dependencias

```

## 🔑 Características Principales

### 1. **Autenticación**
- Registro de nuevos usuarios
- Login con email/password
- Persistencia de sesión

### 2. **Registro de Residuos**
- Seleccionar tipo de residuo (plástico, papel, vidrio, orgánico, metal)
- Especificar peso en kg
- Ganar puntos automáticamente

### 3. **Sistema de Puntos**
- Puntos variables según tipo de residuo
- Acumulación de puntos por usuario
- Historial de depósitos

### 4. **Mapa Interactivo**
- Ubicación de contenedores cercanos
- Estado de cada contenedor
- Nivel de capacidad en tiempo real

### 5. **Panel Administrativo**
- Gestión de contenedores
- Estadísticas de reciclaje
- Reporte de usuarios

## 🔧 Configuración del Proyecto

### Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_USE_EMULATOR=false
```

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 📚 Estructura de Tipos

### User
```typescript
interface User {
  uid: string;
  nombre: string;
  apellido: string;
  correo: string;
  ci: string;
  puntos: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Container
```typescript
interface Container {
  id: string;
  nombre: string;
  tipo: 'plastico' | 'papel' | 'vidrio' | 'organico' | 'metal';
  ubicacion: { lat: number; lng: number; direccion: string };
  capacidad: number;
  nivelActual: number;
  estado: 'disponible' | 'lleno' | 'mantenimiento';
}
```

## 🔐 Funciones de Autenticación

### `signUp(data: RegisterData): Promise<User>`
Registra un nuevo usuario en Firebase y Firestore.

### `signIn(email: string, password: string): Promise<User>`
Inicia sesión y retorna los datos del usuario.

### `logOut(): Promise<void>`
Cierra la sesión actual.

### `onAuthChange(callback): () => void`
Escucha cambios de autenticación en tiempo real.

## 💰 Sistema de Puntos

### Puntos por Tipo de Residuo
- **Plástico**: 10 puntos/kg
- **Papel**: 5 puntos/kg
- **Vidrio**: 8 puntos/kg
- **Orgánico**: 3 puntos/kg
- **Metal**: 15 puntos/kg

### Funciones
- `calculatePoints(wasteType, weight)` - Calcula puntos
- `recordWaste(...)` - Registra residuos en Firestore
- `getUserWasteStats(userId)` - Obtiene estadísticas del usuario
- `calculateUserTotalPoints(userId)` - Total de puntos

## 🎨 Componentes Principales

- **Navbar** - Barra de navegación
- **AuthModal** - Modal de login/register
- **LoginForm** - Formulario de inicio de sesión
- **RegisterForm** - Formulario de registro
- **ContainerCard** - Tarjeta de contenedor
- **MapView** - Mapa interactivo
- **PointsCard** - Mostrar puntos del usuario
- **WasteCounter** - Registrar residuos
- **StatsChart** - Gráficos de estadísticas
- **AlertCard** - Alertas/notificaciones
- **QRGenerator** - Generador de códigos QR

## 🚀 Próximos Pasos

1. [ ] Implementar autenticación real con Firebase
2. [ ] Integrar Firestore para persistencia
3. [ ] Agregar mapa real (Leaflet/Google Maps)
4. [ ] Implementar notificaciones push
5. [ ] Crear panel administrativo completo
6. [ ] Agregar sistema de recompensas
7. [ ] Implementar pagos/canjes
8. [ ] Mobile responsive design
9. [ ] Tests unitarios y E2E
10. [ ] Deployment en producción

## 📞 Contacto

Para más información sobre este proyecto, contactar al equipo de desarrollo.

---

@AGENTS.md
