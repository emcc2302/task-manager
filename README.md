# Task Manager

A simple full-stack task management app built with React and Node.js/Express.

## Stack

- **Frontend**: React (Create React App)
- **Backend**: Node.js + Express
- **Storage**: In-memory (no database required)

## Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── index.js         # Express app setup
│   │   ├── store.js         # In-memory data store
│   │   └── routes/
│   │       └── tasks.js     # Task route handlers
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── api.js           # API calls
│   │   ├── index.js
│   │   └── components/
│   │       ├── TaskForm.jsx
│   │       └── TaskItem.jsx
│   └── package.json
└── README.md
```

## Setup & Running

### Prerequisites
- Node.js v16+
- npm

### 1. Start the backend

```bash
cd backend
npm install
npm start
```

Backend runs at `http://localhost:4000`

### 2. Start the frontend

In a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000` and proxies API calls to the backend automatically.

## API Reference

| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| GET    | /tasks        | Get all tasks       |
| POST   | /tasks        | Create a new task   |
| PATCH  | /tasks/:id    | Update a task       |
| DELETE | /tasks/:id    | Delete a task       |

### Example request

```bash
curl -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write tests"}'
```

## Features

- Add, complete, edit (double-click or Edit button), and delete tasks
- Filter by All / Active / Completed
- Loading and error states handled throughout

## Assumptions & Trade-offs

- **In-memory storage**: Tasks reset on server restart. A real database (SQLite, Postgres, etc.) would be the next step if persistence is needed.
- **No auth**: Single-user app, no authentication layer.
- **No tests**: Kept out to stay within the 1–2 hour scope, but would add Jest + React Testing Library for the frontend and supertest for the backend routes.
- **Edit on double-click**: Standard TodoMVC convention — also added an explicit Edit button for discoverability.
