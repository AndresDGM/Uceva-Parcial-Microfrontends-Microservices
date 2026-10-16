# Books Service - Microservicio de Gestión de Libros

Microservicio desarrollado en **Java** y **Spring Boot** siguiendo los principios de **Arquitectura Limpia (Clean Architecture)**. Proporciona servicios REST para la consulta y filtrado de libros dentro del sistema distribuido de la plataforma.

---

## 🏛️ Arquitectura del Proyecto

El microservicio implementa una separación estricta de responsabilidades por capas:

```
src/main/java/uceva/cleanarchitecture/
├── domain/                          # Capa de Dominio (Reglas de negocio empresariales)
│   ├── entity/
│   │   ├── Book.java                # Entidad Book
│   │   ├── Genre.java               # Enum de géneros literarios
│   │   └── Language.java            # Enum de idiomas soportados
│   └── repository/
│       └── BooksRepository.java     # Puerto/Contrato de repositorio
├── application/                     # Capa de Aplicación (Casos de uso)
│   └── usecase/
│       ├── GetAllUseCase.java       # Caso de uso: Listar todos los libros
│       ├── GetByIdUseCase.java      # Caso de uso: Consultar libro por ID
│       └── GetAllByGenreUseCase.java# Caso de uso: Filtrar libros por género
├── infrastructure/                  # Capa de Infraestructura (Adaptadores y frameworks)
│   ├── controller/
│   │   └── BooksController.java     # Adaptador primario: Controlador REST
│   ├── datasource/
│   │   └── BooksDatasource.java     # Simulación de persistencia en memoria (100 libros)
│   └── repository/
│       └── BooksRepositoryImpl.java # Adaptador secundario: Implementación del repositorio
└── config/                          # Configuración y Cableado de Dependencias
    ├── AppConfig.java               # Configuración de Beans para Inversión de Control
    ├── CorsConfig.java              # Configuración de políticas CORS
    └── SwaggerConfig.java           # Configuración de OpenAPI / Swagger
```

---

## ⚙️ Especificaciones Técnicas

- **Puerto de Ejecución:** `8081`
- **Context Path:** `/api`
- **URL Base:** `http://localhost:8081/api`
- **Documentación Interactiva (Swagger UI):** [http://localhost:8081/api/swagger-ui/index.html](http://localhost:8081/api/swagger-ui/index.html)
- **Especificación OpenAPI (JSON):** [http://localhost:8081/api/v3/api-docs](http://localhost:8081/api/v3/api-docs)

---

## 📚 Modelo de Datos

### Entidad `Book`
| Atributo | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `id` | `int` | Identificador único del libro | `1` |
| `title` | `String` | Título de la obra | `"Cien años de soledad"` |
| `author` | `String` | Autor de la obra | `"Gabriel García Márquez"` |
| `publicationYear` | `int` | Año de publicación | `1967` |
| `genre` | `Genre` | Género literario (Enum) | `FICTION`, `FANTASY` |
| `isbn` | `String` | Código ISBN-13 | `"978-0-123456-78-9"` |
| `pages` | `int` | Número total de páginas | `417` |
| `language` | `Language` | Idioma de la edición (Enum) | `SPANISH`, `ENGLISH` |

### Enums Disponibles

- **`Genre`**: `FICTION`, `NON_FICTION`, `MYSTERY`, `SCIENCE_FICTION`, `FANTASY`, `ROMANCE`, `THRILLER`, `HISTORICAL`, `BIOGRAPHY`, `CHILDREN`.
- **`Language`**: `SPANISH`, `ENGLISH`, `FRENCH`, `GERMAN`, `ITALIAN`, `PORTUGUESE`, `CHINESE`, `JAPANESE`, `RUSSIAN`.

---

## 🚀 Endpoints de la API

### 1. Obtener todos los libros
- **Método:** `GET`
- **Ruta:** `/books/`
- **URL:** `http://localhost:8081/api/books/`
- **Respuestas:**
  - `200 OK`: Lista de libros generados.

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "publicationYear": 2008,
    "genre": "NON_FICTION",
    "isbn": "978-0132350884",
    "pages": 464,
    "language": "ENGLISH"
  }
]
```

### 2. Obtener libro por ID
- **Método:** `GET`
- **Ruta:** `/books/{id}`
- **Parámetro de Ruta:** `id` (int) - Identificador del libro.
- **URL:** `http://localhost:8081/api/books/1`
- **Respuestas:**
  - `200 OK`: Instancia del libro solicitado.
  - `400 Bad Request`: Parámetro ID inválido.

### 3. Obtener libros por género
- **Método:** `GET`
- **Ruta:** `/books/genre/{genre}`
- **Parámetro de Ruta:** `genre` (String/Enum) - Valor del enum `Genre` (ej. `FANTASY`, `FICTION`).
- **URL:** `http://localhost:8081/api/books/genre/FANTASY`
- **Respuestas:**
  - `200 OK`: Lista de libros filtrados por el género indicado.
  - `400 Bad Request`: Si el valor del género no corresponde a uno válido.

---

## 🌐 Configuración CORS

El microservicio permite el consumo desde el host y el microfrontend de libros en Angular mediante la configuración en `CorsConfig`:
- **Orígenes permitidos:** `http://localhost:4200` (Host), `http://localhost:4202` (`books-mf`)
- **Métodos permitidos:** `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
- **Credenciales:** Habilitadas (`allowCredentials = true`)

---

## 🛠️ Instrucciones de Ejecución

### Prerrequisitos
- **Java JDK:** 17 o superior.
- **Gradle:** Wrapper incluido en el proyecto (`./gradlew`).

### Pasos para iniciar el servicio
1. Acceder al directorio del microservicio:
   ```bash
   cd Microservices/books-service
   ```
2. Compilar el proyecto:
   ```bash
   ./gradlew compileJava
   ```
3. Ejecutar la aplicación:
   ```bash
   ./gradlew bootRun
   ```
4. Verificar disponibilidad abriendo Swagger UI en el navegador:
   ```
   http://localhost:8081/api/swagger-ui/index.html
   ```

