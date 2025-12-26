# API Guide for API Dog

This guide details every endpoint, its required inputs, and expected outputs. Use this reference to configure your requests in API Dog or Postman.

## Global Configuration
*   **Base URL:** `http://localhost:3000`
*   **Content-Type:** `application/json` (Required for all POST/PUT requests)

---

## 1. Authentication

### User Login
Authenticate a user (Student or Instructor) and receive their profile details.

*   **Method:** `POST`
*   **Endpoint:** `/api/auth/login`
*   **Request Body:**
    ```json
    {
      "email": "student@test.com",
      "password": "123"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "id": 1,
      "fname": "Ahmed",
      "lname": "Mohamed",
      "email": "student@test.com",
      "role": "student"
    }
    ```
    *(Note: Output structure depends on the columns selected in `sp_login_universal`. It returns the user record if valid.)*

---

## 2. Student Module

### Get Enrolled Courses
List all courses the student is enrolled in.

*   **Method:** `GET`
*   **Endpoint:** `/api/student/:id/courses`
*   **Path Parameters:**
    *   `:id` - Student ID (e.g., `1`)
*   **Example URL:** `/api/student/1/courses`
*   **Success Response:**
    ```json
    [
      {
        "crs_id": 101,
        "crs_name": "Database Systems"
      },
      {
        "crs_id": 102,
        "crs_name": "Operating Systems"
      }
    ]
    ```

### Get Available Exams for Course
List active exams for a specific course.

*   **Method:** `GET`
*   **Endpoint:** `/api/student/course/:courseId/exams`
*   **Path Parameters:**
    *   `:courseId` - Course ID (e.g., `101`)
*   **Example URL:** `/api/student/course/101/exams`
*   **Success Response:**
    ```json
    [
      {
        "ex_id": 1,
        "total_score": 100,
        "duration": 60
      }
    ]
    ```

### Get Exam Questions (Take Exam)
Retrieve questions and choices for a specific exam. This is the "Draft" or "Take" view.

*   **Method:** `GET`
*   **Endpoint:** `/api/student/exam/:examId/questions`
*   **Path Parameters:**
    *   `:examId` - Exam ID (e.g., `1`)
*   **Example URL:** `/api/student/exam/1/questions`
*   **Success Response:**
    ```json
    [
      {
        "q_id": 101,
        "text": "What is SQL?",
        "type": "MCQ",
        "degree": 5,
        "choices": [
          "Structured Query Language",
          "Strong Question Language",
          "Structured Question List"
        ]
      }
    ]
    ```

### Submit Exam Answers
Submit the student's answers for grading.

*   **Method:** `POST`
*   **Endpoint:** `/api/student/exam/submit`
*   **Request Body:**
    ```json
    {
      "examId": 1,
      "studentId": 1,
      "answers": [
        {
          "q_id": 101,
          "answer": "Option A"
        },
        {
          "q_id": 102,
          "answer": "Option B"
        }
      ]
    }
    ```
    *   `q_id`: The ID of the question being answered.
    *   `answer`: The text of the selected choice.
*   **Success Response:**
    ```json
    {
      "message": "Exam submitted and corrected"
    }
    ```

### Get Student Report
Retrieve a report of grades for all courses taken by the student.

*   **Method:** `GET`
*   **Endpoint:** `/api/student/:id/report`
*   **Path Parameters:**
    *   `:id` - Student ID
*   **Example URL:** `/api/student/1/report`
*   **Success Response:**
    ```json
    [
      {
        "st_id": 1,
        "crs_id": 101,
        "grade": 85
      }
    ]
    ```

---

## 3. Course Management

### Get All Courses
List all available courses in the system.

*   **Method:** `GET`
*   **Endpoint:** `/api/courses`
*   **Success Response:**
    ```json
    [
      {
        "crs_id": 101,
        "crs_name": "Database Systems",
        "crs_duration": 40
      }
    ]
    ```

### Assign Student to Course
Enroll a student in a specific course.

*   **Method:** `POST`
*   **Endpoint:** `/api/courses/assign`
*   **Request Body:**
    ```json
    {
      "st_id": 1,
      "crs_id": 101
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Student assigned to course successfully"
    }
    ```

---

## 4. Exam Management (Instructor/Admin)

### Get All Exams
*   **Method:** `GET`
*   **Endpoint:** `/api/exams`
*   **Success Response:** List of all exam objects.

### Create Exam
Define a new exam (without questions initially).

*   **Method:** `POST`
*   **Endpoint:** `/api/exams`
*   **Request Body:**
    ```json
    {
      "dur": 60,       // Duration in minutes
      "total": 100,    // Total Score
      "crs_id": 1,     // Course ID
      "ins_id": 1      // Instructor ID
    }
    ```
*   **Success Response:** Returns the created `Exam` object.

### Update Exam
*   **Method:** `PUT`
*   **Endpoint:** `/api/exams/:id`
*   **Request Body:**
    ```json
    {
      "dur": 90,
      "total": 120
    }
    ```

### Delete Exam
*   **Method:** `DELETE`
*   **Endpoint:** `/api/exams/:id`

### Generate Exam Questions
Randomly selects questions for an exam based on criteria.

*   **Method:** `POST`
*   **Endpoint:** `/api/exams/generate`
*   **Request Body:**
    ```json
    {
      "ex_id": 1,      // The Exam ID to generate for
      "mcq_cnt": 10,   // Number of Multiple Choice Questions
      "tf_cnt": 5,     // Number of True/False Questions
      "mode": "random" // Generation mode
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Exam generated successfully (Draft Mode)",
      "questions": [...] // List of generated questions
    }
    ```

---

## 5. Question Management

### Get All Questions
*   **Method:** `GET`
*   **Endpoint:** `/api/questions`

### Create Question
*   **Method:** `POST`
*   **Endpoint:** `/api/questions`
*   **Request Body:**
    ```json
    {
      "text": "What is Node.js?",
      "type": "MCQ",      // 'MCQ' or 'TF'
      "score": 5,         // Default points
      "correct": "A runtime",
      "crs_id": 1,        // Course ID this question belongs to
      "top_id": 1         // Topic ID
    }
    ```
*   **Success Response:** Returns the created `Question` object.

### Update Question
*   **Method:** `PUT`
*   **Endpoint:** `/api/questions/:id`
*   **Request Body:** (Same fields as Create)

### Delete Question
*   **Method:** `DELETE`
*   **Endpoint:** `/api/questions/:id`

---

## 6. Choices Management

### Get Choices for Question
*   **Method:** `GET`
*   **Endpoint:** `/api/questions/:q_id/choices`
*   **Path Parameters:**
    *   `:q_id` - Question ID

### Add Choice
Add an option to a Multiple Choice Question.

*   **Method:** `POST`
*   **Endpoint:** `/api/questions/choices`
*   **Request Body:**
    ```json
    {
      "text": "A runtime environment",
      "q_id": 101
    }
    ```
*   **Success Response:** Returns the created `Choice` object.

### Update Choice
*   **Method:** `PUT`
*   **Endpoint:** `/api/questions/choices/:id`
*   **Request Body:**
    ```json
    {
      "text": "Updated Choice Text"
    }
    ```

### Delete Choice
*   **Method:** `DELETE`
*   **Endpoint:** `/api/questions/choices/:id`
