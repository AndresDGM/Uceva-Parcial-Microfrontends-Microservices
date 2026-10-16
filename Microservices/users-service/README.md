# Microservicio de Usuarios (users-service)

## Descripción general

El **microservicio users-service** es un servicio REST desarrollado en Node.js + TypeScript que implementa la funcionalidad de gestión de usuarios para la plataforma Uceva. Sigue el patrón de **Clean Architecture** y consta de tres casos de uso principales.

## Casos de uso

1. **Crear Usuario** - Permite crear un nuevo usuario
2. **Obtener Todos los Usuarios** - Recupera la lista completa de usuarios
3. **Obtener Usuario por ID** - Busca un usuario específico por su identificador

## Arquitectura

```
src/
├── app.ts                        # Punto de entrada de la aplicación
├── domain/
│   ├── models/
│   │   └── user.model.ts          # Entidad de dominio
│   └── repositories/
│       └── user.repository.ts     # Repositorio abstracto (puerto)
├── application/
│   └── usecases/
│       ├── create-user.usecase.ts
│       ├── get-all-users.usecase.ts
│       └── get-user-by-id.usecase.ts
└── infrastructure/
    ├── datasources/
    │   ├── user.datasource.ts           # DataSource abstracto
    │   └── node-user.datasource.ts      # Implementación en memoria
    ├── repositories/
    │   └── user.repository.impl.ts      # Implementación del repositorio
    └── web/
        ├── config/
        │   ├── envs.ts                 # Variables de entorno
        │   ├── swagger.ts              # Configuración de Swagger
        │   └── swagger.schemas.ts      # Esquemas OpenAPI
        ├── controllers/
        │   └── user.controller.ts       # Controlador HTTP
        ├── interfaces/
        │   └── server.interface.ts     # Interfaces del servidor
        ├── routes/
        │   ├── routes.ts               # Rutas principales
        │   └── user.routes.ts          # Rutas de usuarios
        ├── erros/
        │   ├── custom.error.ts         # Errores personalizados
        │   └── handle.error.ts         # Manejador de errores
        └── server.ts                   # Configuración del servidor Express
```

## Entidad User

```typescript
interface User {
  id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  engineering: string;
}
```

## Casos de uso implementados

| Caso de uso | Archivo | Método | Descripción |
|-------------|---------|--------|-------------|
| **Crear Usuario** | `create-user.usecase.ts` | `execute(user: CreateUserInput): Promise<User>` | Crea un nuevo usuario. `CreateUserInput = Omit<User, "id">` |
| **Obtener Todos los Usuarios** | `get-all-users.usecase.ts` | `execute(): Promise<User[]>` | Recupera todos los usuarios almacenados |
| **Obtener Usuario por ID** | `get-user-by-id.usecase.ts` | `execute(id: string): Promise<User \| null>` | Busca un usuario por ID. Retorna `null` si no existe |

## Endpoints

| Método HTTP | Ruta | Descripción | Respuestas |
|-------------|------|-------------|------------|
| **GET** | `/api/users` | Obtener todos los usuarios | `200 OK` - Lista de usuarios |
| **GET** | `/api/users/:id` | Obtener un usuario por ID | `200 OK` - Usuario encontrado / `400 Bad Request` - ID vacío / `404 Not Found` - Usuario no encontrado |
| **POST** | `/api/users` | Crear un nuevo usuario | `201 Created` - Usuario creado |

### Ejemplos

**POST /api/users** (Body):
```json
{
  "name": "María",
  "lastName": "Gómez",
  "age": 22,
  "email": "maria@example.com",
  "engineering": "Ingeniería de Sistemas"
}
```

**Respuesta 201**:
```json
{
  "id": "4",
  "name": "María",
  "lastName": "Gómez",
  "age": 22,
  "email": "maria@example.com",
  "engineering": "Ingeniería de Sistemas"
}
```

## Documentación Swagger

Una vez iniciado el servicio, la documentación interactiva de Swagger estará disponible en:

```
http://localhost:3000/api/docs
```

## Tecnologías

- **Node.js** + **TypeScript 5.9**
- **Express 5.2.1** - Framework web
- **dotenv** + **env-var** - Gestión de variables de entorno
- **cors** - Habilitación CORS
- **swagger-jsdoc** + **swagger-ui-express** - Documentación API
- **Jest 30.5.2** + **ts-jest** - Pruebas unitarias

## Instrucciones de uso

### Requisitos previos

- Node.js (versión compatible con las dependencias del proyecto)
- npm

### Instalación

```bash
# Instalar dependencias
npm install
```

### Ejecución

```bash
# Iniciar el servidor en modo desarrollo
npm run start
```

El servicio estará disponible en: `http://localhost:3000`

### Pruebas

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con reporte de cobertura
npm run test:coverage
```

## Cobertura de pruebas

El proyecto cuenta con pruebas unitarias para los tres casos de uso implementados:
- `create-user.usecase.spec.ts`
- `get-all-users.usecase.spec.ts`
- `get-user-by-id.usecase.spec.ts`

Para obtener el porcentaje de cobertura exacto, ejecute: `npm run test:coverage`

## Características

- **Clean Architecture**: Separación clara entre capas (domain, application, infrastructure)
- **Inyección de dependencias**: Siguiendo los principios SOLID
- **DataSource en memoria**: Implementación con datos de ejemplo (3 usuarios precargados)
- **Documentación OpenAPI/Swagger**: Documentación interactiva completa
- **CORS habilitado**: Soporta peticiones desde otros orígenes
- **Arquitectura desacoplada**: Fácil extensión a otros DataSources (ej. base de datos)

## Integración

Este microservicio expone una API REST que puede ser consumida por microfrontends, especialmente por módulos que requieran gestión de usuarios.

## Notas

- El puerto por defecto es `3000`. Puede modificarse mediante la variable de entorno `PORT`
- El DataSource actual es en memoria (`NodeUserDataSource`). Los datos no persisten entre reinicios del servidor
- El ID de usuario se genera automáticamente de forma incremental al crear nuevos usuarios