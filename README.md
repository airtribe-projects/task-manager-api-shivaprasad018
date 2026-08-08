# Task Manager API

A simple RESTful **Task Manager API** built using **Node.js and Express.js**.

This project implements CRUD operations for tasks using **in-memory data loaded from `task.json`**. It also supports input validation, error handling, filtering by completion status, sorting by creation date, and task priority.

---

## Features

* Create a task
* Retrieve all tasks
* Retrieve a task by ID
* Update a task
* Delete a task
* Validate task input
* Handle invalid requests
* Filter tasks by completion status
* Sort tasks by creation date
* Filter tasks by priority
* Support task priorities:

  * `low`
  * `medium`
  * `high`

---

## Technologies Used

* Node.js
* Express.js
* JavaScript
* JSON
* Postman / cURL

---

## Project Structure

```text
task-manager-api-shivaprasad018/
│
├── app.js
├── package.json
├── task.json
│
└── routes/
    └── tasks.js
```

---

## Setup Instructions

### 1. Clone or download the project

Open a terminal and navigate to the project directory:

```bash
cd task-manager-api-shivaprasad018
```

### 2. Install dependencies

Run:

```bash
npm install
```

### 3. Start the server

Run:

```bash
node app.js
```

The server will start on:

```text
http://localhost:3000
```

You should see:

```text
Server is listening on 3000
```

### 4. Test the server

Open:

```text
http://localhost:3000/tasks
```

You should receive the list of tasks.

---

# API Documentation

Base URL:

```text
http://localhost:3000
```

---

## 1. Get All Tasks

### Endpoint

```http
GET /tasks
```

### Example

```text
GET http://localhost:3000/tasks
```

### Response

```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true,
    "priority": "high",
    "createdAt": "2026-08-01T10:00:00.000Z"
  }
]
```

---

## 2. Filter Tasks by Completion Status

### Endpoint

```http
GET /tasks?completed=true
```

Returns only completed tasks.

### Example

```text
GET http://localhost:3000/tasks?completed=true
```

To retrieve incomplete tasks:

```text
GET http://localhost:3000/tasks?completed=false
```

### Invalid Example

```text
GET /tasks?completed=yes
```

Response:

```json
{
  "message": "completed must be true or false"
}
```

Status:

```text
400 Bad Request
```

---

## 3. Sort Tasks by Creation Date

### Oldest to Newest

```http
GET /tasks?sort=asc
```

### Newest to Oldest

```http
GET /tasks?sort=desc
```

### Example

```text
GET http://localhost:3000/tasks?sort=asc
```

You can also combine filtering and sorting:

```text
GET http://localhost:3000/tasks?completed=false&sort=asc
```

---

## 4. Get Task by ID

### Endpoint

```http
GET /tasks/:id
```

### Example

```text
GET http://localhost:3000/tasks/5
```

### Successful Response

```json
{
  "id": 5,
  "title": "Install Mongoose",
  "description": "Install Mongoose",
  "completed": false,
  "priority": "medium",
  "createdAt": "2026-08-01T10:00:00.000Z"
}
```

### Non-existent ID

```text
GET http://localhost:3000/tasks/999
```

Response:

```json
{
  "message": "Task not found"
}
```

Status:

```text
404 Not Found
```

---

## 5. Get Tasks by Priority

### Endpoint

```http
GET /tasks/priority/:level
```

Supported levels:

```text
low
medium
high
```

### Examples

```text
GET http://localhost:3000/tasks/priority/high
```

```text
GET http://localhost:3000/tasks/priority/medium
```

```text
GET http://localhost:3000/tasks/priority/low
```

### Invalid Priority

```text
GET http://localhost:3000/tasks/priority/urgent
```

Response:

```json
{
  "message": "Priority must be low, medium, or high"
}
```

Status:

```text
400 Bad Request
```

---

## 6. Create a New Task

### Endpoint

```http
POST /tasks
```

### Request Body

```json
{
  "title": "Learn MongoDB",
  "description": "Learn MongoDB and Mongoose",
  "completed": false,
  "priority": "high"
}
```

### Example using cURL

```bash
curl -X POST http://localhost:3000/tasks ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"Learn MongoDB\",\"description\":\"Learn MongoDB and Mongoose\",\"completed\":false,\"priority\":\"high\"}"
```

### Successful Response

Status:

```text
201 Created
```

Example:

```json
{
  "id": 16,
  "title": "Learn MongoDB",
  "description": "Learn MongoDB and Mongoose",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-08-08T10:00:00.000Z"
}
```

The `id` and `createdAt` values are generated automatically.

---

## 7. Update a Task

### Endpoint

```http
PUT /tasks/:id
```

### Example

```text
PUT http://localhost:3000/tasks/4
```

### Request Body

```json
{
  "title": "Install Express",
  "description": "Install and configure Express",
  "completed": true,
  "priority": "high"
}
```

### Successful Response

Status:

```text
200 OK
```

---

## 8. Delete a Task

### Endpoint

```http
DELETE /tasks/:id
```

### Example

```text
DELETE http://localhost:3000/tasks/4
```

### Successful Response

```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 4,
    "title": "Install Express",
    "description": "Install Express",
    "completed": false,
    "priority": "medium"
  }
}
```

Status:

```text
200 OK
```

---

# Task Validation

The API validates task data when creating and updating tasks.

### Title

The title:

* Must be provided
* Must be a string
* Cannot be empty

### Description

The description:

* Must be provided
* Must be a string
* Cannot be empty

### Completed

Must be a boolean:

```json
"completed": true
```

or:

```json
"completed": false
```

Values such as:

```json
"completed": "true"
```

are rejected.

### Priority

Must be one of:

```text
low
medium
high
```

---

# HTTP Status Codes

| Status Code | Meaning                   |
| ----------- | ------------------------- |
| `200`       | Request successful        |
| `201`       | Task successfully created |
| `400`       | Invalid request/input     |
| `404`       | Task not found            |

---

# Testing with Postman

You can test all endpoints using Postman.

Set the request URL to:

```text
http://localhost:3000
```

For POST and PUT requests:

1. Select **Body**
2. Select **raw**
3. Select **JSON**
4. Enter the JSON request body
5. Click **Send**

### Recommended testing sequence

```text
GET     /tasks
GET     /tasks/1
GET     /tasks?completed=true
GET     /tasks?sort=asc
GET     /tasks/priority/high
POST    /tasks
PUT     /tasks/1
DELETE  /tasks/1
```

Also test error cases:

```text
GET     /tasks/999
GET     /tasks/abc
GET     /tasks/priority/urgent
GET     /tasks?completed=yes
POST    /tasks                 (invalid body)
PUT     /tasks/999             (non-existent task)
```

---

# Testing with cURL

### Get all tasks

```bash
curl http://localhost:3000/tasks
```

### Get task by ID

```bash
curl http://localhost:3000/tasks/1
```

### Get completed tasks

```bash
curl "http://localhost:3000/tasks?completed=true"
```

### Get high-priority tasks

```bash
curl http://localhost:3000/tasks/priority/high
```

### Create a task

```bash
curl -X POST http://localhost:3000/tasks ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"Learn Express\",\"description\":\"Learn Express.js\",\"completed\":false,\"priority\":\"medium\"}"
```

### Update a task

```bash
curl -X PUT http://localhost:3000/tasks/1 ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"Learn Express\",\"description\":\"Learn Express.js completely\",\"completed\":true,\"priority\":\"high\"}"
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

# Data Storage

This project currently uses **in-memory storage**.

The initial tasks are loaded from:

```text
task.json
```

When the server starts, the tasks are loaded into memory.

Any changes made through POST, PUT, or DELETE affect the in-memory data only.

**Important:** Changes will be lost when the server restarts because no database is being used yet.

---

## Future Improvements

* Add MongoDB using Mongoose
* Add user authentication
* Add JWT authorization
* Add pagination
* Add automated tests
* Add API documentation using Swagger/OpenAPI
* Add environment variables using dotenv

---

## Author

**Shivaprasad**
