# APIDog Testing Scenario

Follow this end-to-end workflow to verify the Exam System features, including the new Admin and Assignment capabilities.

## Phase 1: Administration & Setup

1.  **Admin Login**
    *   **Request:** `POST /api/auth/login`
    *   **Body:** `{ "email": "admin@test.com", "password": "admin" }`
    *   **Check:** Response should show `"role": "admin"`.

2.  **Assign Student to Course** (New Feature)
    *   **Request:** `POST /api/student/assign-course`
    *   **Body:** `{ "studentId": 1, "courseId": 101 }`
    *   **Check:** Returns "Student assigned to course successfully".

## Phase 2: Instructor Workflow (Exam Creation)

3.  **Instructor Login**
    *   **Request:** `POST /api/auth/login`
    *   **Body:** `{ "email": "instructor@test.com", "password": "123" }`
    *   **Check:** Note the `id` (e.g., `10`) for the next step.

4.  **Create Exam**
    *   **Request:** `POST /api/exams`
    *   **Body:** `{ "dur": 60, "total": 100, "crs_id": 101, "ins_id": 10 }`
    *   **Check:** Returns the created Exam object. Note the `ex_id` (e.g., `50`).

5.  **Generate Questions** (Fix Verification)
    *   **Request:** `POST /api/exams/generate`
    *   **Body:** `{ "ex_id": 50, "mcq_cnt": 7, "tf_cnt": 0, "mode": "default" }`
    *   **Check:** The `questions` array in the response should have exactly **7 items**. (This verifies the off-by-one fix).

## Phase 3: Student Workflow (Taking Exam)

6.  **Student Login**
    *   **Request:** `POST /api/auth/login`
    *   **Body:** `{ "email": "student@test.com", "password": "123" }`
    *   **Check:** Note the `id` (e.g., `1`).

7.  **Check Enrolled Courses**
    *   **Request:** `GET /api/student/1/courses`
    *   **Check:** Ensure Course `101` (from Step 2) is listed.

8.  **Get Exam Questions**
    *   **Request:** `GET /api/student/exam/50/questions`
    *   **Check:** You should see the questions generated in Step 5.

9.  **Submit Exam**
    *   **Request:** `POST /api/student/exam/submit`
    *   **Body:**
        ```json
        {
          "examId": 50,
          "studentId": 1,
          "answers": [ { "q_id": 12, "answer": "A" } ]
        }
        ```
    *   **Check:** Returns "Exam submitted and corrected".

## Phase 4: Final Verification

10. **Check Student Report**
    *   **Request:** `GET /api/student/1/report`
    *   **Check:** You should see a grade entry for Course `101`.
