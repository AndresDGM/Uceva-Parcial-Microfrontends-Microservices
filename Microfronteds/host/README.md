# Aplicación Host (`host`)

## Descripción general

La aplicación **`host`** actúa como contenedor principal (*shell*) de la arquitectura de microfrontends desarrollada en **Angular 20** y **Webpack Module Federation**. Integra y gestiona la navegación dinámica entre los tres microfrontends independientes del sistema mediante un `NavbarOrganism` compartido.

---

## Configuración de Puertos y Microfrontends Remotos

- **Puerto de ejecución del Host:** `4200` (`http://localhost:4200`)

| Ruta en el Host | Microfrontend | Puerto Remoto | Remote Entry | Módulo Expuesto | Microservicio Consumido |
|---|---|---|---|---|---|
| `/users` | `users-mf` | `4201` | `http://localhost:4201/remoteEntry.js` | `./UsersPage` | `users-service` (`http://localhost:3000`) |
| `/books` | `books-mf` | `4202` | `http://localhost:4202/remoteEntry.js` | `./BooksPage` | `books-service` (`http://localhost:8081`) |
| `/loans` | `loans-mf` | `4203` | `http://localhost:4203/remoteEntry.js` | `./LoansPage` | `loans-service` (`http://localhost:8080`) |

---

## Instrucciones de ejecución

### 1. Instalar dependencias

```bash
cd Microfronteds/host
npm install
```

### 2. Iniciar el servidor de desarrollo

Asegúrate de tener en ejecución los microfrontends remotos (`4201`, `4202`, `4203`) y sus respectivos microservicios (`3000`, `8081`, `8080`), y luego ejecuta:

```bash
npm run start
```

Accede a la aplicación integrada en: **`http://localhost:4200`**

### 3. Ejecutar pruebas unitarias y cobertura

```bash
npm run test:coverage
```