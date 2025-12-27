# UML → Code Mapping (Web / XAMPP PHP MVC)

This document maps the provided UML (Domain Entities + Layered Architecture) to the current PHP MVC implementation.

## 1) Layer Mapping

- **UI Layer (UML)** → PHP Views under `app/Views/*`
- **Controller Layer (UML)** → PHP Controllers under `app/Controllers/*`
- **Service Layer (UML)** → PHP Services under `app/Services/*`
- **Repository/Data Layer (UML)** → PHP Repositories under `app/Repositories/*` + PDO in `app/Core/DB.php`
- **Domain Entities (UML)** → PHP Domain under `app/Domain/Entities/*` and `app/Domain/Enums/*`

## 2) Key Use Cases → Routes → Code

### UC1 / UC2 (Auth)
- Routes: `/auth/register`, `/auth/login`, `/auth/verify`, `/auth/forgot`, `/auth/reset`
- Controller: `AuthController`
- Models: `User`, `AuthToken`

### UC3 / UC6 / UC7 / UC8 / UC10 / UC11 (Student core demo)
- Routes: `/student/placement`, `/student/results`, `/student/plan`, `/student/content`, `/student/progress`, `/student/export/csv`
- Controller: `StudentController`
- Services: `PlacementTestService`, `LessonPlanService`, `ContentService`, `ProgressService`
- Repositories: `TestRepository`, `TestResultRepository`, `LessonPlanRepository`, `ContentRepository`, `ProgressRepository`
- Tables: `tests`, `test_results`, `lesson_plans`, `lesson_plan_topics`, `content`, `student_content`, `progress`

### UC18 (Messaging & Announcements) / FR32
- Routes: `/messages`, `/messages/compose`, `/messages/send`, `/announcements`, `/announcements/new`
- Controllers: `MessageController`, `AnnouncementController`
- Repositories: `MessageRepository`, `AnnouncementRepository`
- Tables: `messages`, `announcements`

### UC13 (System Feedback Submission) / FR23
- Routes: `/student/feedback`
- Controller: `FeedbackController`
- Repository: `FeedbackRepository`
- Table: `feedback`

### UC15 (Teacher Assignments) / FR27
- Routes: `/teacher/assignments`, `/teacher/assignments/new`, `/teacher/assignments/grade`, `/student/assignments`
- Controller: `AssignmentController`
- Repositories: `AssignmentRepository`, `StudentAssignmentRepository`
- Tables: `assignments`, `student_assignments`

### Teacher results / FR26
- Route: `/teacher/results`
- Controller: `TestResultController`
- Table: `test_results`

## 3) Domain Entities Coverage Notes

- UML shows `Student`, `Teacher`, `Admin` as subclasses of `User`.
  - In this implementation, users are stored in a single `users` table with a `role` field (`student|teacher|admin`).
  - Role-based authorization is enforced in controllers via `Auth::requireRole()`.

- Entities present in code (examples): `TestResult`, `LessonPlan`, `Progress`, `Message`, `Announcement`, `Assignment`, `Feedback`, `Content`.

## 4) Daily Streak (FR33) / Progress persistence (FR36)

- `ProgressService::recordDailyLogin()` records `last_login_date`.
- `ProgressService::recordTaskCompletion()` updates `daily_streak` and `last_task_date`.
- The JSON is stored in `progress.completion_status`.
