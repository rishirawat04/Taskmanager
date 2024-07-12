# Task Management Application

## Overview

A web application for managing tasks efficiently using the MERN stack.

## Screenshots

### DashBoard
![DashBoard](https://github.com/rishirawat04/Taskmanager/blob/main/client/public/pic2.png)

### Update 
![Update](https://github.com/rishirawat04/Taskmanager/blob/main/client/public/pic3.png)

### login 
![login](https://github.com/rishirawat04/Taskmanager/blob/main/client/public/pic1.png)

## Table of Contents

- Features
- Technologies Used
- Getting Started
- Usage
- Authentication
- License

## Features

- CRUD operations for tasks
- Filtering tasks by status
- Sorting tasks by due date
- User authentication with JWT

## Technologies Used

- Frontend: ReactJS, TypeScript, Redux, Redux Persist, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB Atlas, JWT, Bcrypt

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the frontend and backend servers: `npm start`.

## Usage

- Create a new task: POST `/api/tasks`
- Update an existing task: PUT `/api/tasks/:taskId`
- Delete a task: DELETE `/api/tasks/:taskId`
- Retrieve all tasks: GET `/api/tasks`

## Authentication

User authentication is implemented using JWT tokens. Users can log in using their credentials and receive a token for accessing protected routes.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please contact me at rishitech04@gmail.com

