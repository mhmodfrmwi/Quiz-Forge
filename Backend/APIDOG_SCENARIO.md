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
    *   **Body:** `{ "ex_id": 50, "mcq_cnt": 2, "tf_cnt": 2, "mode": "random" }`
    *   **Check:**
        *   The `questions` array should have **exactly 4 items**.
        *   Verify there are **2 MCQ** questions and **2 True/False** questions.

## Phase 3: Student Workflow (Taking Exam)

6.  **Student Login**
    *   **Request:** `POST /api/auth/login`
    *   **Body:** `{ "email": "student@test.com", "password": "123" }`
    *   **Check:** Note the `id` (e.g., `1`).

7.  **Check Enrolled Courses**
    *   **Request:** `GET /api/student/1/courses`
    *   **Check:** Ensure Course `101` (from Step 2) is listed.

8.  **Get Exam Questions** (Timer Verification)
    *   **Request 1**: `GET /api/student/exam/50/questions?studentId=1`
    *   **Check 1**: Note the `startTime` value in the response (e.g., "2023-10-27T10:00:00").
    *   **Action**: Wait for 5-10 seconds.
    *   **Request 2**: Click **Send** again (Simulate Refresh).
    *   **Check 2**: Verify `startTime` is **EXACTLY THE SAME** as in Check 1. This confirms the server is remembering the start time.
    *   **Check 3**: Verify `questions` are returned.

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
    *   **Check:**
        *   Response should be a JSON array.
        *   Look for an entry with `crs_id: 101` (or your course ID).
        *   Verify fields: `crs_name`, `grade`, `status` ("Pass" or "Fail").
