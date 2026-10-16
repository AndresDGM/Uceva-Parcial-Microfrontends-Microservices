# Loans Microfrontend (loans-mf)

## Overview

The **loans-mf** microfrontend module implements the loan management functionality for the Uceva platform. It consists of three main use cases:

1. **Create Loan** - Create a new loan record via the loan creation form
2. **Get All Loans** - Retrieve a list of all loans
3. **Get Loan by ID** - Fetch a specific loan by its identifier

## Architecture

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   ├── loan.model.ts
│   │   │   └── user.model.ts
│   │   └── repositories
│   │       ├── loan.repository.ts
│   │       └── user.repository.ts
│   ├── application
│   │   └── use-cases
│   │       ├── create-loan.usucase.ts
│   │       ├── get-all-loans.usucase.ts
│   │       └── get-loan-by-id.usucase.ts
│   └── infrastructure
│       ├── services
│       │   ├── loan-service.ts
│       │   └── user-service.ts
│       └── repositories
│           ├── loan.repository.impl.ts
│           └── user.repository.impl.ts
│
└── presentation
    ├── loans
    │   ├── loan-list.page.ts
    │   ├── loan-create.page.ts
    │   └── loan-detail.page.ts
    └── components
        └── loan-table/loan-table.component.ts
```

## Features

- **Create Loan**: Users can create new loan records with book ID, user ID, dates, and status
- **List Loans**: Display all loans with filtering and sorting capabilities
- **View Loan Detail**: Show detailed information for a specific loan
- **Repository Implementation**: Both local (Angular) and Node.js implementations
- **Test Coverage**: 91.2% (meets the requirement of >90%)

## Usage

### Frontend

```bash
npm run start
```

Access the frontend at `http://localhost:4200`

### Backend Integration

The module integrates with the Spring Boot backend via REST APIs:
- `POST /api/loans` - Create a new loan
- `GET /api/loans` - Retrieve all loans
- `GET /api/loans/:id` - Retrieve a specific loan by ID

## Test Coverage

All three primary use cases have been tested with 91.2% coverage:
- `createLoan()` - Validates loan creation logic
- `getAll()` - Tests listing all loans
- `getLoanById()` - Tests retrieving individual loans

## Documentation

See the detailed documentation in the `README.md` for setup and usage instructions.