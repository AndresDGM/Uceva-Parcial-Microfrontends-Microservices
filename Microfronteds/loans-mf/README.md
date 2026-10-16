# Microfrontend de Préstamos (loans-mf)

## Descripción general

El módulo **loans-mf** implementa la funcionalidad de gestión de préstamos para la plataforma Uceva. Consta de tres casos de uso principales:

1. **Crear Préstamo** - Crear un nuevo registro de préstamo mediante el formulario de creación
2. **Obtener Todos los Préstamos** - Recuperar la lista de todos los préstamos
3. **Obtener Préstamo por ID** - Consultar un préstamo específico por su identificador

## Arquitectura

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   └── loan.model.ts
│   │   └── repositories
│   │       ├── loan-repository.token.ts
│   │       └── loan.repository.ts
│   ├── application
│   │   └── use-cases
│   │       └── loan
│   │           ├── create-loan.usecase.ts
│   │           ├── get-all-loans.usecase.ts
│   │           └── get-loan-by-id.usecase.ts
│   └── infrastructure
│       ├── services
│       │   └── loan-api.service.ts
│       └── repositories
│           └── springboot-implementation
│               └── loan-springboot.repository.impl.ts
│
└── presentation
    ├── loans
    │   ├── loan-list.page.ts
    │   ├── loan-create.page.ts
    │   └── loan-detail.page.ts
    ├── components
    │   ├── alert/alert.component.ts
    │   └── loan-table/loan-table.component.ts
    ├── interfaces
    │   ├── loan-status.interface.ts
    │   └── loan.interface.ts
    └── services
        └── loans/loans.service.ts
```

## Casos de uso

| Caso de uso | Descripción |
|-------------|-------------|
| `create-loan.usecase.ts` | Orquesta la creación de un préstamo validando reglas de negocio |
| `get-all-loans.usecase.ts` | Recupera la lista completa de préstamos desde el repositorio |
| `get-loan-by-id.usecase.ts` | Busca un préstamo específico por su ID |

## Características

- **Crear Préstamo**: Los usuarios pueden crear nuevos registros de préstamo con ID de libro, ID de usuario, fechas y estado
- **Listar Préstamos**: Visualizar todos los préstamos con capacidades de filtrado y ordenamiento
- **Ver Detalle de Préstamo**: Mostrar información detallada de un préstamo específico
- **Implementación de Repositorio**: Implementación Spring Boot para consumo de API REST
- **Cobertura de Pruebas**: >90% (cumple el requisito mínimo)

## Instrucciones de uso

### Frontend

```bash
# Iniciar el servidor de desarrollo
npm run start
```

Acceder al frontend en `http://localhost:4200`

### Integración con Backend

El módulo se integra con el backend Spring Boot mediante APIs REST:
- `POST /api/loans` - Crear un nuevo préstamo
- `GET /api/loans` - Obtener todos los préstamos
- `GET /api/loans/:id` - Obtener un préstamo específico por ID

## Cobertura de pruebas

Los tres casos de uso principales han sido probados con cobertura >90%:
- `createLoan()` - Valida la lógica de creación de préstamos
- `getAll()` - Prueba el listado de todos los préstamos
- `getLoanById()` - Prueba la recuperación de préstamos individuales

## Tecnologías

- Angular 20
- TypeScript 5.9
- RxJS 7.8
- Bootstrap 5.3
- Jest 30 (pruebas unitarias)

## Documentación

Consulte la documentación detallada en el `README.md` para instrucciones de configuración y uso.