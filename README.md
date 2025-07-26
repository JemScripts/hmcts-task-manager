
# Task Manager API

A simple task management backend API built with Node.js, Express, Sequelize, and PostgreSQL.

## Features

- Create, read, update, and delete tasks
- Tasks have a title, description, due date, and status (pending, in_progress, completed)
- Validation for task data input
- Automated backend tests with Jest and Supertest

## Getting Started

### Prerequisites

- Node.js v14 or newer
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JemScripts/hmcts-task-manager.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your database configuration:

```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=taskdb
DB_PORT=5432
PORT=8080
```

4. Make sure your PostgreSQL database is running and the database specified in `DB_NAME` exists.

### Running the Client

Under the client folder, run the command:

```bash
npm run dev
```

This will start the server on http://localhost:5173/

### Running the Server

Under the server folder, run the command:

```bash
node server.js
```

The server will start on the port defined in `.env` (default 8080).

## API Endpoints

- `POST /api/tasks` — Create a new task
- `GET /api/tasks` — Retrieve all tasks
- `GET /api/tasks/:id` — Retrieve a task by ID
- `PUT /api/tasks/:id` — Update a task by ID
- `PATCH /api/tasks/:id/status` — Update task status only
- `DELETE /api/tasks/:id` — Delete a task by ID
- `DELETE /api/tasks` — Delete all tasks

## Data Validation

- `title`: required for creating tasks
- `status`: must be one of `pending`, `in_progress`, or `completed`
- `dueDate`: must be a valid ISO date string if provided

## Testing

This project includes automated backend tests for the Task API using **Jest** and **Supertest**. These tests cover:

- Creating tasks
- Fetching tasks (all and by ID)
- Updating tasks (including status updates)
- Deleting tasks

### Running Tests

To run the backend tests, use the following command:

```bash
npm run test
```

The tests will reset the database state before running to ensure a clean environment.

---
