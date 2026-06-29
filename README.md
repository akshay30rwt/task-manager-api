# Task Manager API

A REST API to manage tasks built with Node.js, Express.js and MongoDB following MVC architecture.

## Features
- Full CRUD for tasks
- Filter tasks by status
- Sort tasks by due date
- Search tasks by title
- Update task status

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /tasks                  - Create a task
- GET    /tasks                  - Get all tasks
- GET    /tasks?title=           - Search by title
- GET    /tasks/filter/:status   - Filter by status
- GET    /tasks/sorted/duedate   - Sort by due date
- GET    /tasks/:id              - Get a task by ID
- PUT    /tasks/:id              - Update a task
- PATCH  /tasks/:id              - Update a task status
- DELETE /tasks/:id              - Delete a task