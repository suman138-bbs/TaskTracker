# Task Tracker Application

This is a Task Tracker Application that allows users to manage their tasks effectively. The application demonstrates the ability to design and build a user-friendly interface while implementing both front-end and back-end components.

## Features

The Task Tracker Application includes the following features:

- **User Registration and Authentication**: Users can register for an account and log in securely. User passwords are hashed using bcrypt for security.
- **Task Creation**: Users can add tasks with a title, description, due date, and priority level.
- **Task List**: A list of all tasks is displayed, sorted by priority and due date. Users can see the status of each task (e.g., pending, completed).
- **Task Editing and Deletion**: Users can edit task details, mark tasks as completed, and delete tasks.
- **Search and Filter**: Users can search for specific tasks by keywords or filter tasks based on status or priority.

## User Flow

1. Users visit the application's homepage and can register or log in.
2. After logging in, users are directed to their personalized dashboard.
3. Users can view their task list, add new tasks, edit existing tasks, mark tasks as completed, and delete tasks.
4. Search and filter options enable users to find and manage tasks easily.

## How to Run the Project

1. **Front-End** (Vite):

   - Install dependencies: `cd front-end && npm install`
   - Run the development server: `npm run dev`
   - Access the application at `http://localhost:5173/`

2. **Back-End** (Express and MySQL):
   - Install dependencies: `cd back-end && npm install`
   - Set up the `.env` file with your MySQL credentials.
   - Start the server: `npm start`
   - Access the application at `http://localhost:8080`

## Example API Endpoints

- `POST /userlogin`: User login with email and password. Passwords are securely hashed using bcrypt.
- `POST /signUp`: User registration with email, name, password, image, and address. Passwords are securely hashed using bcrypt.
- `GET /getTask`: Get a list of all tasks.
- `GET /get/:Id`: Get details of a specific task.
- `GET /taskCount`: Get the total count of tasks.
- `GET /dashbord`: Access user dashboard (authentication required).
- `PUT /editTask/:Id`: Edit task details (authentication required).
- `DELETE /deleteTask/:userId`: Delete a task (authentication required).
- `POST /createTask`: Create a new task (authentication required).

## Sample Images

![Alt Text](<./frontend/src/assets/Screenshot%20(336).png>)
![Alt Text](<./frontend/src/assets/Screenshot%20(337).png>)
![Alt Text](<./frontend/src/assets/Screenshot%20(338).png>)

![Alt Text](<./frontend/src/assets/Screenshot%20(339).png>)
![Alt Text](<./frontend/src/assets/Screenshot%20(340).png>)
