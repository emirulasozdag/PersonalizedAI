# Web Project Submission Report (XAMPP PHP + MySQL)

## 1. Project Overview
This project is a Web-based English learning system implemented with XAMPP (PHP + MySQL). It follows an MVC structure with a layered approach (Controller → Service → Repository → DB) and role-based dashboards (Student/Teacher/Admin).

**Primary goal:** demonstrate end-to-end learning flows aligned with the provided FRs, Use Cases, and UML artifacts.

## 2. Technology Stack
- Web server/runtime: XAMPP (Apache + PHP)
- Database: MySQL
- Architecture: MVC + layered services/repositories
- Security: session authentication + CSRF protection on POST requests

## 3. How To Run (Local)
1. Start Apache + MySQL in XAMPP.
2. Create a database (e.g., `english_ai_app`).
3. Import schema: `database/schema.sql`.
4. Configure DB credentials in the project config (if present).
5. Serve the `public/` directory as the web root.

## 4. Implemented Modules (Evidence)

### 4.1 Authentication & Roles
- Register / login / logout via session.
- Role-based dashboards:
  - Student dashboard
  - Teacher dashboard

### 4.2 Student End-to-End Flow
- Placement Test (module-based)
- Results (list + detail)
- Personalized Plan + “why selected” explanation
- Content delivery
- Progress tracking
- Export progress as CSV

### 4.3 Teacher End-to-End Flow
- View student test results
- Create assignments
- View submissions
- Grade submissions

### 4.4 Communication
- Direct messaging (inbox/outbox)
- Announcements (create/list)

### 4.5 Feedback
- Student submits feedback to system

## 5. Traceability (FR/UC → Implementation)
- Use cases and FR mapping: `docs/Part2-System-Actors-Requirements-UseCases.md`
- UML use case diagram (PlantUML): `docs/uml/use-case-diagram.puml`
- Code mapping appendix (routes/controllers/services/repos/tables): `docs/UML-Code-Mapping.md`
- FR implementation coverage (implemented vs partial vs not implemented): `docs/FR-Implementation-Coverage.md`

## 6. Screenshot Checklist (for submission evidence)
Capture these pages after logging in as each role:

**Student**
- Dashboard
- Placement test start page
- A placement module page
- Results list
- Result detail
- Plan page
- Content page
- Progress page
- CSV export download (browser download bar / file saved)
- Messages inbox
- Announcements list
- Feedback form
- Assignments list + submission screen

**Teacher**
- Dashboard
- Results list page
- Assignments create page
- Assignments grading page
- Announcements create/list
- Messages inbox/outbox

## 7. Notes / Scope
Some FRs in the original specification (e.g., voice recognition, chatbot UI, full badge/points UI, maintenance dashboards) may be represented as UML requirements but not fully implemented in the minimal demo.

This report is designed to be consistent with the delivered implementation and the UML/Use Case documents.
