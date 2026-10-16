# Microservicio de Préstamos (Loan Service)

## Descripción
Microservicio encargado de gestionar los préstamos de libros en el sistema de biblioteca. Permite crear nuevos préstamos, consultar todos los préstamos existentes y obtener un préstamo específico por su ID.

## Arquitectura
Este microservicio sigue los principios de **Clean Architecture** (Arquitectura Limpia) separados claramente en capas:

```
src/main/java/uceva/cleanarchitecture
│
├── domain
│   ├── entity/          → Entidades de negocio (Loan.java)
│   └── repository/      → Interfaces de repositorio (LoanRepository.java)
│
├── application
│   └── usecase/         → Casos de uso (CreateLoanUseCase.java, GetAllLoansUseCase.java, GetLoanByIdUseCase.java)
│
├── infrastructure
│   ├── controller/      → Controladores REST (LoanController.java)
│   ├── repository/      → Implementaciones de repositorios (LoanRepositoryImpl.java)
│   └── datasource/      → Fuentes de datos (LoanDatasource.java)
│
└── config/              → Configuración de Spring (AppConfig.java, CorsConfig.java)
```

## Estructura del Proyecto
```
Microservices/loans-service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── uceva/cleanarchitecture/
│   │   │       ├── domain/
│   │   │       │   ├── entity/
│   │   │       │   │   └── Loan.java
│   │   │       │   └── repository/
│   │   │       │       └── LoanRepository.java
│   │   │       ├── application/
│   │   │       │   └── usecase/
│   │   │       │       ├── CreateLoanUseCase.java
│   │   │       │       ├── GetAllLoansUseCase.java
│   │   │       │       └── GetLoanByIdUseCase.java
│   │   │       ├── infrastructure/
│   │   │       │   ├── controller/
│   │   │       │   │   └── LoanController.java
│   │   │       │   ├── repository/
│   │   │       │   │   └── LoanRepositoryImpl.java
│   │   │       │   └── datasource/
│   │   │       │       └── LoanDatasource.java
│   │   │       └── config/
│   │   │           ├── AppConfig.java
│   │   │           └── CorsConfig.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── uceva/cleanarchitecture/
│               ├── application/
│   │   │       └── usecase/
│   │   │       │   ├── CreateLoanUseCaseTest.java
│   │   │       │   ├── GetAllLoansUseCaseTest.java
│   │   │       │   └── GetLoanByIdUseCaseTest.java
│   │   │       └── infrastructure/
│   │   │       │   └── controller/
│   │   │       │       └── LoanControllerTest.java
│   │   └── resources/
├── build.gradle
├── gradlew
├── gradlew.bat
└── settings.gradle
```

## Requisitos
- Java JDK 25
- Gradle 9.2.1 o superior
- Conexión a internet para descargar dependencias

## Instalación
1. Clonar el repositorio
2. Posicionarse en el directorio `Microservices/loans-service/`
3. Las dependencias se descargarán automáticamente al construir el proyecto

## Ejecución
```bash
# Desde el directorio Microservices/loans-service/
./gradlew bootRun
```

El microservicio se ejecutará en `http://localhost:8080`

## Puerto
- **Backend**: `http://localhost:8080` (configurado mediante `server.servlet.context-path=/api` en application.properties)

## Endpoints API
Todos los endpoints están prefijados con `/api` debido a la configuración en `application.properties`:

### Crear Préstamo
- **URL**: `POST /api/loans`
- **Descripción**: Crea un nuevo préstamo
- **Cuerpo de la solicitud**:
  ```json
  {
    "bookId": 101,
    "userId": 201,
    "loanDate": "2026-10-15",
    "returnDate": "2026-10-29",
    "status": "ACTIVE"
  }
  ```
- **Respuesta exitosa** (Código 200 OK):
  ```json
  {
    "id": 1,
    "bookId": 101,
    "userId": 201,
    "loanDate": "2026-10-15",
    "returnDate": "2026-10-29",
    "status": "ACTIVE"
  }
  ```

### Obtener Todos los Préstamos
- **URL**: `GET /api/loans`
- **Descripción**: Obtiene una lista de todos los préstamos
- **Respuesta exitosa** (Código 200 OK):
  ```json
  [
    {
      "id": 1,
      "bookId": 101,
      "userId": 201,
      "loanDate": "2026-10-15",
      "returnDate": "2026-10-29",
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "bookId": 102,
      "userId": 202,
      "loanDate": "2026-10-10",
      "returnDate": "2026-10-24",
      "status": "RETURNED"
    }
  ]
  ```

### Obtener Préstamo por ID
- **URL**: `GET /api/loans/{id}`
- **Descripción**: Obtiene un préstamo específico por su ID
- **Parámetro de ruta**: `id` (ID del préstamo)
- **Respuesta exitosa** (Código 200 OK):
  ```json
  {
    "id": 1,
    "bookId": 101,
    "userId": 201,
    "loanDate": "2026-10-15",
    "returnDate": "2026-10-29",
    "status": "ACTIVE"
  }
  ```
- **Respuesta de error** (Código 404 Not Found): Cuando el préstamo con el ID especificado no existe

## Documentación API (Swagger/OpenAPI)
La documentación interactiva de la API está disponible mediante Swagger UI:
- **URL**: `http://localhost:8080/api/swagger-ui/index.html`
- Incluye descripción detallada de todos los endpoints, códigos de estado, esquemas de solicitud y respuesta, y permite probar los endpoints directamente desde el navegador.

## Pruebas Unitarias
El microservicio incluye un conjunto completo de pruebas unitarias que cubren:

### Casos de Uso
- **CreateLoanUseCaseTest**: Verifica la correcta creación de préstamos
- **GetAllLoansUseCaseTest**: 
  - Verifica la retorno correcto de lista de préstamos
  - Verifica la retorno de lista vacía cuando no hay préstamos
- **GetLoanByIdUseCaseTest**:
  - Verifica la retorno correcto de préstamo cuando existe
  - Verifica la retorno de null cuando el préstamo no existe

### Controlador
- **LoanControllerTest**:
  - Verifica la creación correcta de préstamos mediante POST
  - Verifica la obtención correcta de todos los préstamos mediante GET
  - Verifica la obtención correcta de préstamo por ID mediante GET
  - Verifica la retorno de null cuando el préstamo no existe

### Ejecución de Pruebas
```bash
# Desde el directorio Microservices/loans-service/
./gradlew test
```

## Cobertura de Pruebas
Las pruebas unitarias cubren todas las capas del microservicio:
- Entidad Loan: Constructores y accesos a campos
- Repositorio: Operaciones create, getAll, getById
- Casos de uso: Orquestación de operaciones del repositorio
- Controlador: Manejo de solicitudes HTTP y respuestas

> **Nota**: Para generar un reporte detallado de cobertura, sería necesario configurar el plugin JaCoCo en el build.gradle. Las pruebas actuales están diseñadas para alcanzar una cobertura superior al 90% cuando se ejecuta con las herramientas apropiadas.

## Configuración CORS
El microservicio incluye configuración de CORS para permitir peticiones desde aplicaciones frontend ejecutándose en `http://localhost:4200` (puerto típico de Angular CLI en desarrollo). La configuración se encuentra en `src/main/java/uceva/cleanarchitecture/config/CorsConfig.java`.

- **Origen permitido**: `http://localhost:4200`
- **Métodos permitidos**: GET, POST, PUT, DELETE, OPTIONS
- **Encabezados permitidos**: Todos (*)
- **Credenciales**: Permitidas

## Construcción
```bash
# Desde el directorio Microservices/loans-service/
./gradlew build
```

Esto ejecutará las pruebas y generará el artifacto JAR en `build/libs/`.

## Dependencias Principales
- **Spring Boot 4.0.1**: Framework principal
- **Spring Web MVC**: Para construir aplicaciones web RESTful
- **JavaFaker**: Para generar datos de demostración realistas
- **SpringDoc OpenAPI UI**: Para generar documentación Swagger/OpenAPI automáticamente
- **Spring Boot Test**: Para pruebas unitarias
- **JUnit Platform**: Para ejecutar pruebas con JUnit 5

## Notas de Implementación
- La entidad `Loan` utiliza campos públicos siguiendo el patrón de la referencia del profesor
- Los repositorios son clases abstractas que definen el contrato de acceso a datos
- Los casos de uso orquestan las operaciones de negocio
- El controlador expone los casos de uso como endpoints REST
- La inyección de dependencias se maneja mediante `AppConfig.java` usando anotaciones `@Bean` de Spring
- Los datos se mantienen en memoria mediante `LoanDatasource.java` (adecuado para demostración y testing)