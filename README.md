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

## API Endpoints

### Authentication

-   `POST /api/auth/login`
    -   Body: `{ "email": "...", "password": "..." }`

### Exams

-   `GET /api/exams` - Get all exams
-   `POST /api/exams` - Create a new exam
-   `PUT /api/exams/:id` - Update an exam
-   `DELETE /api/exams/:id` - Delete an exam
-   `POST /api/exams/generate` - Generate a new exam
-   `POST /api/exams/submit` - Submit exam answers

### Questions

-   `GET /api/questions` - Get all questions
-   `POST /api/questions` - Create a question
-   `PUT /api/questions/:id` - Update a question
-   `DELETE /api/questions/:id` - Delete a question

#### Choices
-   `GET /api/questions/:q_id/choices` - Get choices for a question
-   `POST /api/questions/choices` - Add a choice
-   `PUT /api/questions/choices/:id` - Update a choice
-   `DELETE /api/questions/choices/:id` - Delete a choice
