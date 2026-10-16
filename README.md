# Parcial II - Microfrontends & Clean Architecture (UCEVA)

Solución de software distribuida basada en una arquitectura de **Microfrontends** con **Angular 20** y **Webpack Module Federation**, integrada con una arquitectura de **Microservicios** desarrollados en **Node.js (Express/TypeScript)** y **Spring Boot (Java)**, aplicando **Arquitectura Limpia (Clean Architecture)** en cada componente de frontend y backend.

---

## Arquitectura Global y Mapa de Puertos

El sistema está compuesto por un **Host** que integra tres **Microfrontends** independientes, donde cada microfrontend consume su respectivo **Microservicio** mediante API REST:

```text
                                 ┌──────────────────────┐      ┌─────────────────────────────────────┐
                            ┌───►│  users-mf (:4201)    ├─────►│  users-service (:3000 - Node.js)    │
                            │    └──────────────────────┘      └─────────────────────────────────────┘
┌──────────────────────┐    │    ┌──────────────────────┐      ┌─────────────────────────────────────┐
│     host (:4200)     ├────┼───►│  books-mf (:4202)    ├─────►│  books-service (:8081 - SpringBoot) │
└──────────────────────┘    │    └──────────────────────┘      └─────────────────────────────────────┘
                            │    ┌──────────────────────┐      ┌─────────────────────────────────────┐
                            └───►│  loans-mf (:4203)    ├─────►│  loans-service (:8080 - SpringBoot) │
                                 └──────────────────────┘      └─────────────────────────────────────┘
```

### 1. Tabla General de Puertos (Frontend y Backend)

| Componente | Tipo | Tecnología | Puerto | URL Principal / Remote Entry |
|---|---|---|---|---|
| **`host`** | Host (Shell) | Angular 20 + Module Federation | **`4200`** | `http://localhost:4200` |
| **`users-mf`** | Microfrontend | Angular 20 + Module Federation | **`4201`** | `http://localhost:4201/remoteEntry.js` |
| **`books-mf`** | Microfrontend | Angular 20 + Module Federation | **`4202`** | `http://localhost:4202/remoteEntry.js` |
| **`loans-mf`** | Microfrontend | Angular 20 + Module Federation | **`4203`** | `http://localhost:4203/remoteEntry.js` |
| **`users-service`** | Microservicio | Node.js + Express + TypeScript | **`3000`** | `http://localhost:3000/api/users` |
| **`loans-service`** | Microservicio | Java + Spring Boot | **`8080`** | `http://localhost:8080/api/loans` |
| **`books-service`** | Microservicio | Java + Spring Boot | **`8081`** | `http://localhost:8081/api/v1/books` |

### 2. Relación Microfrontend -> Microservicio y Documentación Swagger

| Microfrontend | Puerto MF | Ruta en Host | Microservicio Consumido | Puerto MS | Documentación Swagger / OpenAPI |
|---|---|---|---|---|---|
| **`users-mf`** | `4201` | `/users` | **`users-service`** (Node.js) | `3000` | `http://localhost:3000/api/docs` |
| **`books-mf`** | `4202` | `/books` | **`books-service`** (Spring Boot) | `8081` | `http://localhost:8081/api/swagger-ui/index.html` |
| **`loans-mf`** | `4203` | `/loans` | **`loans-service`** (Spring Boot) | `8080` | `http://localhost:8080/api/swagger-ui/index.html` |

---

## Casos de Uso Implementados (9 Frontend + 9 Backend)

### Dominio de Usuarios (`users-mf` ↔ `users-service`)
1. **Listar todos los usuarios** (`GetAllUsers` / `GET /api/users`)
2. **Consultar usuario por ID** (`GetUserById` / `GET /api/users/:id`)
3. **Crear usuario** (`CreateUser` / `POST /api/users`)

### Dominio de Libros (`books-mf` ↔ `books-service`)
1. **Obtener todos los libros** (`GetAllBooksUseCase` / `GET /api/v1/books`)
2. **Filtrar libros por género literario** (`GetAllBooksByGenreUseCase` / `GET /api/v1/books/genre/:genre`)
3. **Consultar libro por ID** (`GetBookByIdUseCase` / `GET /api/v1/books/:id`)

### Dominio de Préstamos (`loans-mf` ↔ `loans-service`)
1. **Obtener todos los préstamos** (`GetAllLoansUseCase` / `GET /api/loans`)
2. **Consultar préstamo por ID** (`GetLoanByIdUseCase` / `GET /api/loans/:id`)
3. **Crear nuevo préstamo** (`CreateLoanUseCase` / `POST /api/loans`)

---

## Estructura del Monorepositorio

```text
Uceva-Parcial-Microfrontends-Microservices/
├── Microfronteds/
│   ├── host/               # Aplicación Host Angular (Puerto 4200)
│   ├── users-mf/           # Microfrontend de Usuarios (Puerto 4201)
│   ├── books-mf/           # Microfrontend de Libros (Puerto 4202)
│   └── loans-mf/           # Microfrontend de Préstamos (Puerto 4203)
└── Microservices/
    ├── users-service/      # Microservicio de Usuarios en Node.js (Puerto 3000)
    ├── loans-service/      # Microservicio de Préstamos en Spring Boot (Puerto 8080)
    └── books-service/      # Microservicio de Libros en Spring Boot (Puerto 8081)
```

---

## Instrucciones de Configuración y Ejecución

### Requisitos Previos
- **Node.js** >= 20.x y **npm**
- **Java JDK** >= 17 (con Gradle Wrapper `./gradlew` incluido en los proyectos Spring Boot)
- **Angular CLI** 20.3.x

---

### Paso 1: Ejecutar los Microservicios (Backend)

Abrir una terminal para cada microservicio:

#### 1.1 `users-service` (Puerto `3000` - Node.js)
```bash
cd Microservices/users-service
npm install
npm run start
```
- API: `http://localhost:3000/api/users`
- Swagger UI: `http://localhost:3000/api/docs`

#### 1.2 `loans-service` (Puerto `8080` - Spring Boot)
```bash
cd Microservices/loans-service
./gradlew bootRun
```
- API: `http://localhost:8080/api/loans`
- Swagger UI: `http://localhost:8080/api/swagger-ui/index.html`

#### 1.3 `books-service` (Puerto `8081` - Spring Boot)
```bash
cd Microservices/books-service
./gradlew bootRun
```
- API: `http://localhost:8081/api/v1/books`
- Swagger UI: `http://localhost:8081/api/swagger-ui/index.html`

---

### Paso 2: Ejecutar los Microfrontends y el Host (Frontend)

Abrir una terminal para cada proyecto en `Microfronteds/`:

#### 2.1 `users-mf` (Puerto `4201`)
```bash
cd Microfronteds/users-mf
npm install
npm run start
```
- Vista individual: `http://localhost:4201`
- Remote Entry: `http://localhost:4201/remoteEntry.js`

#### 2.2 `books-mf` (Puerto `4202`)
```bash
cd Microfronteds/books-mf
npm install
npm run start
```
- Vista individual: `http://localhost:4202`
- Remote Entry: `http://localhost:4202/remoteEntry.js`

#### 2.3 `loans-mf` (Puerto `4203`)
```bash
cd Microfronteds/loans-mf
npm install
npm run start
```
- Vista individual: `http://localhost:4203`
- Remote Entry: `http://localhost:4203/remoteEntry.js`

#### 2.4 `host` (Puerto `4200`)
```bash
cd Microfronteds/host
npm install
npm run start
```
- Aplicación integrada: **`http://localhost:4200`**

---

## Pruebas Unitarias y Cobertura (>90%)

En cualquiera de los microfrontends (`users-mf`, `books-mf`, `loans-mf`, `host`), ejecutar:

```bash
npm run test:coverage
```

Para generar la documentación técnica de frontend con **Compodoc**:

```bash
npm run compodoc
```