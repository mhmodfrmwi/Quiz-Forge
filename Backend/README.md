# Backend Examination System

This is the backend for the Examination System, built with Node.js, Express, and MSSQL.

## Features

- **User Authentication**: Login functionality.
- **Exam Management**: Create, update, delete, and list exams.
- **Question Management**: Manage questions and their choices.
- **Exam Generation**: Generate exams based on criteria.
- **Exam Submission**: Submit exam answers.

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables in `.env` (if applicable) or `src/config/dbConfig.js`.
4.  Run the server:
    ```bash
    npm run dev
    ```

## Database Scripts
Utility scripts for seeding data and updating schemas are located in the `database_scripts/` directory.

## API Endpoints

### Authentication

-   `POST /api/auth/login`
    -   Body: `{ "email": "...", "password": "..." }`

### Student Module

-   `GET /api/student/:id/courses` - Get courses enrolled by the student
-   `GET /api/student/course/:courseId/exams` - Get available exams for a specific course
-   `GET /api/student/exam/:examId/questions` - Get questions and choices for taking an exam
-   `POST /api/student/exam/submit` - Submit exam answers
    -   Body: `{ "examId": ..., "studentId": ..., "answers": [{ "q_id": ..., "answer": "..." }] }`
-   `GET /api/student/:id/report` - Get a report of the student's grades in all courses

### Course Management

-   `GET /api/courses` - Get all courses
-   `POST /api/courses/assign` - Assign a student to a course
    -   Body: `{ "st_id": ..., "crs_id": ... }`

### Exams

-   `GET /api/exams` - Get all exams
-   `POST /api/exams` - Create a new exam
    - Body: `{ "dur": 60, "total": 100, "crs_id": 1, "ins_id": 1 }`
-   `PUT /api/exams/:id` - Update an exam
-   `DELETE /api/exams/:id` - Delete an exam
-   `POST /api/exams/generate` - Generate a new exam (Instructor)
    - Body: `{ "ex_id": 1, "mcq_cnt": 10, "tf_cnt": 5, "mode": "random" }`
-   `POST /api/exams/submit` - Submit exam (Instructor/Admin testing)

### Questions

-   `GET /api/questions` - Get all questions
-   `POST /api/questions` - Create a question
    - Body: `{ "text": "...", "type": "MCQ", "score": 5, "correct": "A", "crs_id": 1, "top_id": 1 }`
-   `PUT /api/questions/:id` - Update a question
-   `DELETE /api/questions/:id` - Delete a question

#### Choices
-   `GET /api/questions/:q_id/choices` - Get choices for a question
-   `POST /api/questions/choices` - Add a choice
    - Body: `{ "text": "Option A", "q_id": 1 }`
-   `PUT /api/questions/choices/:id` - Update a choice
-   `DELETE /api/questions/choices/:id` - Delete a choice
