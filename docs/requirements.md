## 1. Objetivo
Diseñar y desarrollar una app web con react y nextjs,siguiendo las mejores prácticas de
desarrollo de software. El objetivo es evaluar habilidades técnicas para implementar una solución escalable,bien documentada y mantenible.

## 2. Context

**Tenpo** is a company that provides personnel services to client companies.  
To support this, Tenpo offers a platform that allows clients to manage their employees and enables employees to register their transactions.

The application must allow the registration and management of **clients**, **employees**, and **transactions**.
---

## 🛠️ Tech Stack
- **React 18** 
- **Vite** 
- **Tailwind CSS**
- **Axios** (fetching obligatorio)
- **@tanstack/react-query** (plus)
- **React Hook Form** (validaciones)
- **Zod** (schema validation)
- **Docker**
- **docker-compose**

---

## Estructura de carpetas

src/
├── api/
│   ├── axiosInstance.ts
│   └── index.ts
│
├── features/
│   ├── clients/
│   │   ├── api/
│   │   │   └── clients.api.ts
│   │   ├── components/
│   │   │   ├── ClientForm.tsx
│   │   │   ├── ClientList.tsx
│   │   │   └── ClientItem.tsx
│   │   ├── hooks/
│   │   │   └── useClients.ts
│   │   ├── schemas/
│   │   │   └── client.schema.ts
│   │   ├── types/
│   │   │   └── client.types.ts
│   │   └── index.ts
│   │
│   ├── employees/
│   │   ├── api/
│   │   │   └── employees.api.ts
│   │   ├── components/
│   │   │   ├── EmployeeForm.tsx
│   │   │   ├── EmployeeList.tsx
│   │   │   └── EmployeeItem.tsx
│   │   ├── hooks/
│   │   │   └── useEmployees.ts
│   │   ├── schemas/
│   │   │   └── employee.schema.ts
│   │   ├── types/
│   │   │   └── employee.types.ts
│   │   └── index.ts
│   │
│   └── transactions/
│       ├── api/
│       │   └── transactions.api.ts
│       ├── components/
│       │   ├── TransactionForm.tsx
│       │   ├── TransactionList.tsx
│       │   └── TransactionItem.tsx
│       ├── hooks/
│       │   └── useTransactions.ts
│       ├── schemas/
│       │   └── transaction.schema.ts
│       ├── types/
│       │   └── transaction.types.ts
│       └── index.ts
│
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       └── Modal.tsx
│
├── pages/
│   └── Dashboard.tsx
│
├── layouts/
│   └── MainLayout.tsx
│
├── utils/
│   └── date.ts
│
├── App.tsx
├── main.tsx
└── index.css


### Layout
Estructura general del Dashboard
┌──────────────────────────────────────────┐
│ Header                                   │
│  • Título: Dashboard Tenpista            │
│  • Acciones globales                     │
└──────────────────────────────────────────┘

┌───────────────┬──────────────────────────┐
│ Sidebar       │ Main Content              │
│               │                          │
│ • Transacciones│ • Filtros               │
│ • Clientes     │ • Tabla Transacciones   │
│ • Empleados    │ • Acciones CRUD         │
│               │                          │
└───────────────┴──────────────────────────┘

---

## Flujo UX completo (muy importante)

### Flujo realista

Usuario entra → ve transacciones

Hace clic en “Nueva Transacción”

Selecciona cliente y empleado

Si no existen: crea cliente (modal)

vuelve automáticamente al form

Guarda transacción

Tabla se actualiza (React Query cache)

👉 Flujo fluido, sin recargar ni navegar

7️⃣ Estado visual y feedback
Estados obligatorios:

Loading (spinner o skeleton)

Error (mensaje claro)

Empty state (sin transacciones)

---

## 📦 Deliverables
- Folder structure
- Layout files
- Reusable UI components
- Example pages
- Minimal but clean UI

---

## ✨ Optional Enhancements
- SaaS-style UI (spacing, shadows, typography)
- Dark mode support
- Route protection via middleware
- State management for authentication


---

### Clients

The application must allow:

- Create new clients with the following fields:
  - `client_name` (varchar)
  - `client_rut` (varchar)
- Retrieve all clients
- Retrieve a client by ID
- Update a client
- Delete a client

---

### Employees

The application must allow:

- Create new employees with the following fields:
  - `employee_name` (varchar)
  - `employee_rut` (varchar)
  - `client_id` (int)
- Retrieve all employees
- Retrieve an employee by ID
- Update an employee
- Delete an employee

---

### Transactions

The application must allow:

- Create new transactions with the following fields:
  - `transaction_amount` (int, in pesos)
  - `merchant_or_business` (varchar)
  - `employee_id` (int)
  - `transaction_date` (datetime)
  - `client_id` (int)
- Retrieve all transactions
- Retrieve a transaction by ID
- Update a transaction
- Delete a transaction

---

### Constraints

- Transaction amounts **cannot be negative**.
- The transaction date **cannot be later than the current date and time**.
