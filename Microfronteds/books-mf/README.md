# Microfrontend de Libros (`books-mf`)

## Descripción general

El módulo **`books-mf`** implementa la gestión y consulta del catálogo bibliográfico para la plataforma Uceva, desarrollado en **Angular 20** aplicando **Arquitectura Limpia (Clean Architecture)** y expuesto mediante **Webpack Module Federation** para su integración en la aplicación `host`.

Consta de tres casos de uso principales:

1. **Obtener Todos los Libros (`GetAllBooksUseCase`)** - Recuperar el catálogo completo de libros disponibles.
2. **Obtener Libros por Género (`GetAllBooksByGenreUseCase`)** - Filtrar el catálogo según el género literario (`Genre`).
3. **Obtener Libro por ID (`GetBookByIdUseCase`)** - Consultar la información bibliográfica completa de un libro específico por su identificador único.

---

## Arquitectura (Clean Architecture)

```text
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   ├── book.model.ts
│   │   │   ├── genre.model.ts
│   │   │   └── language.model.ts
│   │   └── repositories
│   │       ├── book-repository.token.ts
│   │       └── book.repository.ts
│   ├── application
│   │   └── use-cases
│   │       └── book
│   │           ├── get-all-books.usecase.ts
│   │           ├── get-all-books-by-genre.usecase.ts
│   │           └── get-book-by-id.usecase.ts
│   └── infrastructure
│       ├── services
│       │   └── book-api.service.ts
│       └── repositories
│           └── springboot-implementation
│               └── book-springboot.repository.impl.ts
│
├── mocks
│   └── activated-route.mock.ts
│
└── presentation
    ├── components
    │   ├── alert/alert.component.ts
    │   └── book-table/book-table.component.ts
    ├── interfaces
    │   ├── book-genre.interface.ts
    │   └── book.interface.ts
    └── pages
        └── books
            ├── book-list.page.ts
            └── book-detail.page.ts
```

---

## Casos de uso

| Caso de uso | Archivo | Descripción |
|---|---|---|
| `GetAllBooksUseCase` | `get-all-books.usecase.ts` | Recupera la lista completa de libros desde el contrato `BookRepository` |
| `GetAllBooksByGenreUseCase` | `get-all-books-by-genre.usecase.ts` | Filtra los libros del catálogo por el enum `Genre` |
| `GetBookByIdUseCase` | `get-book-by-id.usecase.ts` | Consulta un libro específico por su `id` (retorna `Book \| null`) |

---

## Configuración de Module Federation

- **Nombre del remoto:** `mf-books`
- **Puerto de ejecución:** `4202`
- **Remote Entry:** `http://localhost:4202/remoteEntry.js`
- **Módulo expuesto:** `./BooksPage` -> `./src/app/presentation/pages/books/book-list.page.ts` (`BookListPage` / `BooksPage`)

---

## Integración con el Microservicio (`books-service`)

El microfrontend se comunica con el microservicio **Spring Boot (`books-service`)** en el puerto **`8081`**:

- **Base URL configurada (`environment.ts`):** `http://localhost:8081`
- **Endpoints consumidos:**
  - `GET http://localhost:8081/api/v1/books` - Obtener todos los libros
  - `GET http://localhost:8081/api/v1/books/genre/:genre` - Filtrar libros por género (`Genre` enum key)
  - `GET http://localhost:8081/api/v1/books/:id` - Obtener un libro por su ID
- **Swagger UI del microservicio:** `http://localhost:8081/api/swagger-ui/index.html`

---

## Instrucciones de ejecución

### 1. Instalar dependencias

```bash
cd Microfronteds/books-mf
npm install
```

### 2. Ejecutar servidor de desarrollo

```bash
npm run start
```

- **Ejecución individual:** `http://localhost:4202`
- **Archivo Module Federation:** `http://localhost:4202/remoteEntry.js`
- **Ejecución integrada en el Host:** `http://localhost:4200/books`

### 3. Compilar para producción

```bash
npm run build
```

---

## Pruebas unitarias y cobertura

El proyecto utiliza **Jest** y supera el requisito mínimo del **90%** de cobertura en todas las capas:

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con reporte de cobertura
npm run test:coverage
```

- **Suites de prueba:** 10 pasadas de 10 totales (69 tests en total)
- **Cobertura alcanzada:** **99.11% statements / 99.02% lines**

---

## Documentación técnica (Compodoc)

Para generar la documentación técnica interactiva del microfrontend (cobertura de documentación **95%**):

```bash
npm run compodoc
```

La documentación se genera en la carpeta `./documentation/`.