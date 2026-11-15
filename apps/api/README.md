# 🏋️‍♂️ Gym Management Flow - Backend API

> Sistema backend multi-tenant robusto, escalable y modular para la gestión integral de gimnasios, diseñado bajo estrictos estándares de arquitectura de software.

---

## 🚀 1. Stack Tecnológico

El proyecto está construido con tecnologías modernas y tipado estricto para garantizar mantenibilidad y alto rendimiento:

* **Runtime:** Node.js (con soporte nativo de módulos ESM y resolución `NodeNext`).
* **Lenguaje:** TypeScript (Strict Mode habilitado para máxima seguridad de tipos).
* **Framework Web:** Express.js (configuración desacoplada y modular).
* **ORM:** Prisma 7 (gestión de esquemas y migraciones centralizadas con `prisma.config.ts`).
* **Base de Datos:** PostgreSQL (`gym-db`).
* **Validación & Utilidades:** Dotenv, CORS, tsx (para desarrollo en caliente).

---

## 📂 2. Arquitectura y Estructura de Directorios

El proyecto adopta una **Arquitectura Modular basada en Dominios**, separando las responsabilidades por áreas de negocio (`modules/`) en lugar de agruparlas por conceptos técnicos dispersos.

```text
src/
├── @types/                 # Definiciones de tipos globales y extensiones de Express
├── config/                 # Configuraciones globales de infraestructura
│   └── prisma.ts           # Instancia singleton del cliente de Prisma
├── modules/                # 📂 Módulos de dominio de la aplicación (Escalabilidad horizontal)
│   ├── auth/               # (Próximamente) Autenticación y control de accesos
│   ├── gyms/               # (Próximamente) Gestión de gimnasios y multi-tenancy
│   └── users/              # (Próximamente) Gestión de usuarios y perfiles
├── shared/                 # Componentes transversales compartidos (Cross-cutting)
│   ├── errors/             # Clases de errores de negocio personalizados (AppError)
│   └── middlewares/        # Middlewares globales (Manejador de errores, validaciones)
├── app.ts                  # Fábrica y configuración de la aplicación Express
└── server.ts               # Punto de entrada HTTP (Arranca el servidor en el puerto configurado)
```

---

## ⚙️ 3. Decisiones de Diseño y Patrones Implementados

### A. Cliente de Prisma Singleton (`src/config/prisma.ts`)
Para evitar la saturación de conexiones simultáneas a PostgreSQL durante la recarga en caliente en desarrollo, se implementó el patrón Singleton. Una única instancia global de `PrismaClient` es compartida en toda la aplicación, registrando además logs de consultas y errores para debugging.

### B. Manejo Centralizado de Errores (`src/shared/`)
* **`AppError`**: Clase personalizada que extiende de `Error` nativo para manejar errores operacionales de negocio (con códigos de estado HTTP específicos y mensajes controlados).
* **`error.middleware.ts`**: Middleware global situado al final de la cadena de Express que intercepta cualquier excepción no controlada o error de negocio, devolviendo una respuesta JSON estandarizada y evitando la caída del proceso de Node.js.

### C. Desacoplamiento de Arranque (`app.ts` vs `server.ts`)
* `app.ts` configura middlewares globales, rutas y el interceptor de errores sin abrir puertos de red. Esto facilita la escritura futura de **tests de integración** limpios.
* `server.ts` se encarga exclusivamente de importar la aplicación y ponerla a escuchar en el puerto asignado mediante variables de entorno.

---

## 🗄️ 4. Modelo de Base de Datos (Prisma Schema)

La base de datos relacional (`gym-db`) soporta una arquitectura multi-tenant e incluye los siguientes modelos principales:
* **`User`**: Usuarios globales del sistema.
* **`Gym`**: Gimnasios independientes operando bajo el modelo multi-tenant.
* **`GymMembership`**: Relación de pertenencia entre usuarios y gimnasios, asociada a roles específicos.
* **`Role` & `Permission`**: Sistema granular de control de acceso basado en roles y permisos por gimnasio.

---

## 🛠️ 5. Guía de Inicio Rápido (Desarrollo)

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Configurar las variables de entorno:**
   Crea un archivo `.env` en la raíz con la conexión a tu base de datos:
   ```env
   PORT=4000
   DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/gym-db?schema=public"
   ```

3. **Ejecutar migraciones de base de datos:**
   ```bash
   npx prisma migrate dev --name init_gym_schema
   ```

4. **Iniciar el servidor en modo desarrollo:**
   ```bash
   pnpm dev
   ```