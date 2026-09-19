# LearnHub

LearnHub is a web application for managing the basic academic and financial operations of a tutoring center.

It was developed as part of the **Special Topics in Software Technology** course and follows a clear separation between the user interface, application logic and database.

The system supports three types of users:

- **Admin** – manages students, teachers, courses, enrollments and payments
- **Teacher** – accesses the academic portal
- **Student** – accesses their personal dashboard

---

## Architecture

LearnHub follows a **3-tier architecture**.

```text
┌─────────────────────────────┐
│        Presentation         │
│                             │
│     React Single Page App   │
│       localhost:3000        │
└──────────────┬──────────────┘
               │
               │ REST API / JSON
               │ Axios
               ▼
┌─────────────────────────────┐
│       Application Tier      │
│                             │
│       Spring Boot API       │
│       localhost:8080        │
│                             │
│ Controller                  │
│     ↓                       │
│ Service                     │
│     ↓                       │
│ Repository                  │
└──────────────┬──────────────┘
               │
               │ JPA / Hibernate
               ▼
┌─────────────────────────────┐
│          Data Tier          │
│                             │
│            MySQL            │
│        learnhub database    │
└─────────────────────────────┘
```

### 1. Presentation Tier

The frontend is a **React Single Page Application**.

React is responsible for:

- displaying the user interface
- handling navigation
- showing different portals depending on the user's role
- sending requests to the backend using Axios

The frontend does not communicate directly with the database.

All application data is requested through the REST API.

---

### 2. Application Tier

The backend is built with **Java 17 and Spring Boot**.

The backend itself follows a layered structure:

```text
HTTP Request
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
Database
```

Each layer has a separate responsibility.

#### Controllers

Controllers expose the REST API endpoints and handle incoming HTTP requests.

Examples:

```text
AuthController
AdminController
CourseController
StudentController
TeacherController
UserController
```

Controllers forward the actual application logic to the service layer.

#### Services

Services contain the main business logic of the application.

Examples:

```text
AuthService
CourseService
EnrollmentService
StudentService
TeacherService
UserService
```

This keeps business logic separate from HTTP handling and database access.

#### Repositories

Repositories are responsible for data access.

They use **Spring Data JPA**, so the rest of the application does not need to work directly with SQL queries.

```text
CourseRepository
EnrollmentRepository
PaymentRepository
StudentRepository
TeacherRepository
UserRepository
```

Dependency Injection is used between the different layers.

---

### 3. Data Tier

LearnHub uses a **MySQL relational database**.

Database communication is handled through:

- Spring Data JPA
- Hibernate ORM

The main domain entities include:

```text
User
Student
Teacher
Course
Enrollment
Payment
```

Hibernate maps these Java objects to the corresponding database tables.

---

## Main Features

### Administration

The administration portal provides functionality for managing:

- students
- teachers
- courses
- course enrollments
- payments

It also provides basic dashboard statistics.

### Academic Portal

Teachers have access to a separate academic interface for managing academic information.

### Student Portal

Students are redirected to their own dashboard after login.

### Role-based Interface

The application currently supports three roles:

```text
ADMIN
TEACHER
STUDENT
```

React Router uses protected routes to redirect each user to the appropriate part of the application.

---

## Tech Stack

### Frontend

- React 18
- JavaScript
- React Router
- Axios
- CSS

### Backend

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

### Database

- MySQL

### Testing

- JUnit 5
- Spring Boot Test
- MockMvc

---

## Project Structure

```text
LearnHub/
│
├── frontend/
│   ├── public/
│   │
│   └── src/
│       ├── components/
│       │   ├── LoginPage.js
│       │   ├── Dashboard.js
│       │   ├── ManagementPortal.js
│       │   ├── AcademicPortal.js
│       │   └── ProtectedRoute.js
│       │
│       ├── App.js
│       └── index.js
│
├── backend/
│   └── src/
│       ├── main/
│       │   ├── java/com/learnhub/
│       │   │   ├── controller/
│       │   │   ├── service/
│       │   │   ├── repository/
│       │   │   ├── model/
│       │   │   └── exception/
│       │   │
│       │   └── resources/
│       │       └── application.properties
│       │
│       └── test/
│
├── pom.xml
└── README.md
```

The important part of this structure is that each part of the application has a clear responsibility.

The frontend handles presentation, the backend handles application logic, and MySQL handles persistent data.

Inside the backend, controllers, services and repositories are also kept separate.

---

## Running the Project

### Requirements

Make sure the following are installed:

```text
Java 17+
Maven
Node.js / npm
MySQL
```

### Database

Create a MySQL database named:

```sql
CREATE DATABASE learnhub;
```

The database configuration can be found in:

```text
backend/src/main/resources/application.properties
```

By default the application expects MySQL on:

```text
localhost:3306
```

---

### Backend

From the root directory run:

```bash
mvn spring-boot:run
```

The REST API will start on:

```text
http://localhost:8080
```

---

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The React application will start on:

```text
http://localhost:3000
```

---

## Tests

The backend contains integration tests using **JUnit 5** and **MockMvc**.

They test REST endpoints such as:

- dashboard statistics
- student retrieval
- teacher retrieval
- course retrieval
- course creation
- enrollments
- payments

The tests use `@Transactional`, so changes made during a test are rolled back afterwards.

Run them with:

```bash
mvn test
```

---

## Development Process

The project was developed using basic Agile practices.

The work was organized using:

- User Stories
- Product Backlog
- Sprints
- Jira

The Jira project was used to track the development tasks throughout the project.

---

## Purpose

LearnHub was created mainly as an exercise in designing a complete web application with a clear architecture.

The main focus of the project is the separation of responsibilities between:

```text
React
  ↓
REST API
  ↓
Spring Boot
  ↓
Service Layer
  ↓
Spring Data JPA
  ↓
MySQL
```

This structure keeps the project easier to understand, maintain and extend.
