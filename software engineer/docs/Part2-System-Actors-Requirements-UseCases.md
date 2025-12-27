# Personalized Learning Content (AI-Powered Adaptive Curriculum)
## Project – Part 2
Department of Software Engineering, Ankara Science University  
SENG 321 – Software Engineering  
Instructor: Prof. Dr. Hakan Çağlar  
Date: 27 December 2025

### Group Members
- Nisa Nur AKLAN – 220204012
- Ceyda YILDIZ – 220204011
- Emir Ulaş ÖZDAĞ – 220204041
- Nisa Nur İLHAN – 220204053
- Berke AKÇAY – 220204058
- Elifnaz Köseoğlu – 220204027

---

## 1. Identify System and Related Actors

### 1.1 Understand the System and Its Requirements
This project focuses on developing an AI-powered system that personalizes English learning materials for each student. The system selects or generates lessons, exercises, and roleplay activities based on the student’s level, goals, and learning pace.

The objective is to increase the efficiency of English education by offering customized learning experiences. Artificial intelligence analyzes each student’s strengths and weaknesses and provides content in areas such as grammar, vocabulary, pronunciation, and speaking.

The module covers dynamic adaptation of English learning materials according to user performance data. The system continuously analyzes progress and updates lessons to maintain motivation and effectiveness.

### 1.2 Identify Actors

#### Primary Actors
- **Student**: Logs in, completes tests, views a personalized plan, studies content, and submits feedback.
- **Teacher**: Monitors student progress, assigns homework, and co-creates content using AI.
- **Admin**: Manages user accounts/roles, monitors system performance, and manages maintenance mode.

#### External / Supporting Actors (External Systems)
- **AI Analysis Engine**: Analyzes performance data and generates/updates personalized learning content.
- **Notification Service**: Sends notifications, reminders, and reward messages (in-app/email).
- **Chatbot Service**: Provides conversational guidance and Q&A support.
- **AI Voice Recognition Service**: Processes audio inputs and produces pronunciation/accuracy metrics.

---

## 1.3 Requirements

### 1.3.1 Functional Requirements

#### User Accounts and Access
- **FR1**: The system must allow students, teachers, and admins to create accounts and log in.
- **FR2**: The system must allow registered users to reset their password or recover their account.
- **FR3**: The system must require email verification for new user registrations.

#### Placement and Testing Modules
- **FR4**: The system must offer separate placement test modules for reading, writing, listening, and speaking.
- **FR5**: The system must determine a separate (A1–C2) level for reading, writing, listening, and speaking skills.
- **FR6**: The system must accept voice input via the microphone in the speaking module.
- **FR7**: The system must be able to play audio files in the listening module.
- **FR8**: The system must present text-based content in the reading test.
- **FR9**: The system must accept text input in the writing module.
- **FR10**: The system must analyze the student's pronunciation accuracy in the speaking module.
- **FR11**: The system must inform the student and the teacher with an interim results screen after each module.
- **FR12**: The system must generate an overall level (A1–C2) report at the end of the test.

#### Personalized Content Generation and Learning Plan
- **FR13**: The system must analyze the student's test results to identify strengths and weaknesses.
- **FR14**: The system must generate a personalized lesson plan based on the student's level.
- **FR15**: The system must provide new content through an AI engine.
- **FR16**: The system must automatically update the generated content based on the student's progress.
- **FR17**: The system must show the student a brief explanation of why the generated content was selected.

#### Progress Tracking and Visualization
- **FR18**: The system must present past achievements using graphs, list completed lessons, and store progress status in the database.
- **FR19**: The system must list the student's completed lessons in chronological order.
- **FR20**: The system must display the student's progress status.
- **FR21**: The system must allow the student and the teacher to export progress data as PDF or CSV.

#### Feedback and Motivation
- **FR22**: The system must provide automatic feedback based on the student's mistakes.
- **FR23**: The system must allow the student to send feedback for the generated content.
- **FR24**: The system must offer a badge or point system based on achievements.
- **FR25**: The system must send daily goal completion notifications to students.

#### Teacher Module
- **FR26**: The system must allow the teacher to view the students' test results.
- **FR27**: The system must allow the teacher to assign homework or assignments to students.
- **FR28**: The system must allow the teacher to list the students' strengths and weaknesses.

#### Administrator and System Management
- **FR29**: The system must allow the administrator to manage all user accounts.
- **FR30**: The system must allow the administrator to view system performance and statistics.
- **FR31**: The system must allow the administrator to initiate maintenance mode and announce scheduled updates.

#### Notification, Security, and Communication
- **FR32**: The system must support a messaging and announcement system between students and teachers.
- **FR33**: The system must maintain and display a "Daily Streak" counter that tracks the consecutive days a student logs in and completes at least one task.
- **FR34**: The system must remind users via notification or email if they have not logged in or completed lessons for a specific period.
- **FR35**: The system must allow the teacher to provide directives to the AI engine regarding the content to be generated for the student.
- **FR36**: The system must continuously record and store the student's progress in the database.
- **FR37**: The system must provide a chatbot interface for student interaction.
- **FR38**: The system must allow students to ask the chatbot questions about lessons and exercises.

### 1.3.2 Non-Functional Requirements
- **NFR1**: The interface must be simple and intuitive.
- **NFR2**: The system must support at least 500 concurrent users without performance degradation.
- **NFR3**: User data and progress records must be stored encrypted (international data security standards).
- **NFR4**: Compatible with modern browsers and responsive on desktop/mobile.
- **NFR5**: Gracefully handle potential API errors.
- **NFR6**: New features must not break existing functionality.
- **NFR7**: Provide 99% availability excluding scheduled maintenance.
- **NFR8**: Core operations should be completable in 5 clicks or less.
- **NFR9**: Compliant with KVKK and GDPR.
- **NFR10**: Weekly automated database backup; retain backups for at least 30 days.

---

## 2. Define and Describe Use Cases

### 2.1 User-Goal Level Use Cases (Traceable Set)
- **UC1** – User Registration, Login and Email Verification (FR1–FR3)
- **UC2** – Account Recovery (FR2)
- **UC3** – Placement Test (FR4–FR5)
- **UC4** – Speaking Test and Voice Analysis (FR6, FR10)
- **UC5** – Listening, Reading and Writing Modules (FR7–FR9)
- **UC6** – Displaying Test Results (FR11–FR12)
- **UC7** – Student Analysis and Personalized Content Plan (FR13–FR14)
- **UC8** – AI-Based Content Delivery (FR15)
- **UC9** – Content Update and Rationale Explanation (FR16–FR17)
- **UC10** – Student Progress Tracking (FR18–FR20)
- **UC11** – Data Export (FR21)
- **UC12** – Automatic Feedback (FR22)
- **UC13** – Submitting Feedback to the System (FR23)
- **UC14** – Rewards, Motivation and Notification System (FR24–FR25, FR33–FR34)
- **UC15** – Teacher Assignment of Homework or Tasks (FR27)
- **UC16** – Admin Account Management (FR29)
- **UC17** – System Performance and Maintenance Management (FR30–FR31)
- **UC18** – Messaging and Announcement System (FR32)
- **UC19** – Teacher–AI Collaboration (FR35)
- **UC20** – Chatbot Interaction (FR37–FR38)

### 2.2 UML Use Case Diagram
Use Case Diagram sources:

- PlantUML source: `docs/uml/use-case-diagram.puml`
- Export instructions: `docs/uml/README.md`

Optional exports (recommended for the final PDF report):
- `docs/uml/use-case-diagram.png`
- `docs/uml/use-case-diagram.svg`

Notes:
- The PlantUML source also models missing relationships as `<<include>>` / `<<extend>>` (e.g., placement modules, interim results, overall report, export formats).

### 2.3 Use Cases in Brief Format

| Use Case | Primary Actors | Goal |
|---|---|---|
| UC1 | Student, Teacher, Admin | Register, verify email, and log in. |
| UC2 | Student, Teacher, Admin | Recover/reset password via email process. |
| UC3 | Student | Determine English level (A1–C2) across skills. |
| UC4 | Student, Voice Recognition Service | Measure speaking & pronunciation accuracy. |
| UC5 | Student | Complete listening/reading/writing modules. |
| UC6 | Student, Teacher | View interim and final test results and reports. |
| UC7 | AI Analysis Engine | Analyze results; generate personalized plan. |
| UC8 | Student, AI Analysis Engine | Deliver AI-generated lessons/exercises. |
| UC9 | AI Analysis Engine | Update content per progress; explain rationale. |
| UC10 | Student, Teacher | Visualize progress (charts, history, status). |
| UC11 | Student, Teacher | Export progress/report as PDF or CSV. |
| UC12 | AI Analysis Engine | Provide automatic feedback based on mistakes. |
| UC13 | Student | Submit feedback/suggestions/bug reports. |
| UC14 | Notification Service, Student | Operate badges/points, streak, reminders. |
| UC15 | Teacher | Assign homework/tasks to students/groups. |
| UC16 | Admin | Manage user accounts, roles, permissions. |
| UC17 | Admin | View performance stats; manage maintenance mode. |
| UC18 | Student, Teacher | Messaging & announcements. |
| UC19 | Teacher, AI Analysis Engine | Teacher provides directives to AI generation. |
| UC20 | Student, Chatbot | Ask questions; conversational learning support. |

---

## 3. Traceability (FR → UC)

| Functional Requirement | Covered By Use Case(s) |
|---|---|
| FR1 | UC1 |
| FR2 | UC1, UC2 |
| FR3 | UC1 |
| FR4 | UC3 |
| FR5 | UC3 |
| FR6 | UC4 |
| FR7 | UC5 |
| FR8 | UC5 |
| FR9 | UC5 |
| FR10 | UC4 |
| FR11 | UC6 |
| FR12 | UC6 |
| FR13 | UC7 |
| FR14 | UC7 |
| FR15 | UC8 |
| FR16 | UC9 |
| FR17 | UC9 |
| FR18 | UC10 |
| FR19 | UC10 |
| FR20 | UC10 |
| FR21 | UC11 |
| FR22 | UC12 |
| FR23 | UC13 |
| FR24 | UC14 |
| FR25 | UC14 |
| FR26 | UC6 |
| FR27 | UC15 |
| FR28 | UC10 |
| FR29 | UC16 |
| FR30 | UC17 |
| FR31 | UC17 |
| FR32 | UC18 |
| FR33 | UC14 |
| FR34 | UC14 |
| FR35 | UC19 |
| FR36 | UC10 |
| FR37 | UC20 |
| FR38 | UC20 |

---

## 4. Fully Dressed Use Cases

Below are the fully dressed use cases aligned with the FR/UC set in this report.

### UC1 – User Registration, Login, and Email Verification (FR1–FR3)
- **Primary Actor**: Student, Teacher, Admin
- **Goal (Purpose in Context)**: To create a new user account, complete email verification, and log into the system.
- **Stakeholders and Interests**:
	- **User (Student/Teacher/Admin)**: Wants to create their account and access the system.
	- **Notification Service**: Delivers the email verification link to the user.
- **Preconditions**:
	- The user must have a valid email address.
	- The system registration screen must be accessible.
- **Success Guarantee**: The user account is successfully created, verified, and becomes ready for login.
- **Main Scenario**:
	1. The user accesses the registration form.
	2. The user enters their name, email, and password.
	3. The system creates the user account and sends an email verification link.
	4. The user clicks the link in their email.
	5. The system verifies the account.
	6. The user logs into the system using the login form.
- **Exception Flows (Alternative Flows)**:
	- 1a. If the user already has an account, they log in directly using the login form.
	- 3a. If the email is invalid, the system displays an error message.
	- 4a. If the verification link expires, the system sends a new link.

### UC2 – Account Recovery (FR2)
- **Primary Actor**: Student, Teacher, Admin
- **Goal (Purpose in Context)**: To allow users who have forgotten their password to regain access to their accounts via an email password reset process.
- **Stakeholders and Interests**:
	- **User**: Wants to regain access to their account.
	- **Notification Service**: Sends the password reset link via email.
- **Preconditions**: The user must be registered in the system.
- **Success Guarantee**: The user sets a new password and can log into their account again.
- **Main Scenario**:
	1. The user clicks the "Forgot Password" option.
	2. The user enters their email address.
	3. The system validates the email address.
	4. The system sends the reset link via the Notification Service.
	5. The user clicks the link in the email.
	6. The user creates their new password.
	7. The system permits login with the new password.
- **Exception Flows**:
	- 2a. If the email is not registered in the system, an error message is displayed.
	- 4a. If the email server does not respond, the process is retried later.

### UC3 – Placement Test (FR4–FR5)
- **Primary Actor**: Student
- **Goal (Purpose in Context)**: To determine the student's English level (A1–C2) by measuring their reading, writing, listening, and speaking skills.
- **Stakeholders and Interests**:
	- **Student**: Wants to learn their English level.
	- **Teacher**: Wants to assign appropriate content based on the student's level.
	- **AI Analysis Engine**: Analyzes the assessment results and determines the correct level.
- **Preconditions**: The student must be logged into the system.
- **Success Guarantee**: The placement test is completed, and an accurate level (A1–C2) report is generated.
- **Main Scenario**:
	1. The student starts the "Placement Test".
	2. The system presents the modules for the four skills sequentially.
	3. The student completes each module.
	4. The system analyzes all answers.
	5. The results are reflected on the student's dashboard.
- **Exception Flows**:
	- 4a. If the student leaves the test in the middle (quits), their progress is saved.

### UC4 – Speaking Test and Voice Analysis (FR6, FR10)
- **Primary Actor**: Student
- **Goal (Purpose in Context)**: To measure the student's speaking skill via the microphone and analyze pronunciation accuracy.
- **Stakeholders and Interests**:
	- **Student**: Wants to improve their pronunciation skills.
	- **Voice Recognition Service**: Analyzes the voice data and determines the accuracy rate.
- **Preconditions**: Microphone access must be enabled.
- **Success Guarantee**: The pronunciation analysis is completed, and feedback is provided to the student.
- **Main Scenario**:
	1. The student starts the speaking test.
	2. The system displays the sample sentence (audio or text).
	3. The student provides their answer via the microphone.
	4. The Voice Recognition Service analyzes the audio.
	5. The system saves the results and shows them to the student.
- **Exception Flows**:
	- 3a. If microphone permission has not been granted, the system requests permission.
	- 4a. If no audio input is detected, the student is given another attempt.

### UC5 – Listening, Reading, and Writing Modules (FR7–FR8–FR9)
- **Primary Actor**: Student
- **Goal (Purpose in Context)**: To enable the student to complete listening, reading, and writing activities to improve their language skills.
- **Stakeholders and Interests**:
	- **Student**: Wants to improve their language skills.
- **Preconditions**:
	- The student must be logged in.
	- The relevant tests must be active.
- **Success Guarantee**: All modules are completed, and the student's progress is saved.
- **Main Scenario**:
	1. The student opens the listening module and listens to the audio files.
	2. The student answers the related questions.
	3. In the reading module, the student reads the texts and answers questions.
	4. In the writing module, the student writes short texts on the given topics.
	5. The system saves all responses and calculates the scores.
- **Exception Flows**:
	- 1a. If the audio file fails to load, the system attempts to reload it.
	- 4a. If an empty text is submitted, a warning is displayed.

### UC6 – Viewing Test Results (FR11–FR12–FR26)
- **Primary Actor**: Student, Teacher
- **Goal (Purpose in Context)**: To enable the student to view their own results and the teacher to review these results after the tests.
- **Stakeholders and Interests**:
	- **Student**: Wants to see their own test results.
	- **Teacher**: Wants to track the students' performance.
- **Preconditions**:
	- The student must have completed the test.
	- The teacher must be authorized for the student's course.
- **Success Guarantee**: The results are displayed correctly; the student and teacher can access the relevant reports.
- **Main Scenario**:
	1. After completing the test, the student opens the "My Results" tab.
	2. The system retrieves the test data.
	3. The student sees their scores, level, and error analysis.
	4. The teacher views the overall or individual results for the same test.
	5. The system updates all access logs.
- **Exception Flows**:
	- 3a. If the test data cannot be found, an error message is shown to the user.

### UC7 – Student Analysis and Personal Plan Generation (FR13–FR14)
- **Primary Actor**: AI Analysis Engine
- **Goal (Purpose in Context)**: To analyze the student's test results and create a personalized lesson plan based on their strengths and weaknesses.
- **Stakeholders and Interests**:
	- **Student**: Wants to see which areas they need to improve.
	- **Teacher**: Wants to organize lessons according to the student's plan.
	- **System (AI Engine)**: Wants to analyze the data and produce an appropriate content plan.
- **Preconditions**:
	- The student must have at least one completed test.
- **Success Guarantee**: The personalized learning plan is successfully generated and displayed to the student.
- **Main Scenario**:
	1. The system analyzes the student's test results.
	2. The AI engine identifies strengths and weaknesses.
	3. A list of topic recommendations is created based on the student's level.
	4. The system displays the personal plan to the student.
- **Exception Flows**:
	- 2a. If the analysis engine detects missing data, it generates a general plan.

### UC8 – AI-Based Content Delivery (FR15)
- **Primary Actor**: AI Analysis Engine
- **Goal (Purpose in Context)**: To generate and deliver new lesson content, exercises, and tests appropriate for the student's level.
- **Stakeholders and Interests**:
	- **AI Engine**: Automatically generates content.
	- **Student**: Wants to study with materials appropriate for their level.
- **Preconditions**:
	- The student's level information must have been analyzed.
- **Success Guarantee**: The AI-generated content is displayed to the student and is accessible.
- **Main Scenario**:
	1. The system checks the student's level information.
	2. The AI engine determines the appropriate exercise type.
	3. The AI generates content (e.g., sample sentence, text, exercise).
	4. The system adds the content for the student.
	5. The student accesses the content and starts studying.
- **Exception Flows**:
	- 3a. If content generation fails, the system re-recommends the last used material.

### UC9 – Content Update and Rationale Display (FR16–FR17)
- **Primary Actor**: AI Analysis Engine
- **Goal (Purpose in Context)**: To automatically update lesson content based on student progress and explain the rationale for the changes.
- **Stakeholders and Interests**:
	- **AI Engine**: Wants to monitor progress data and dynamically update content.
	- **Student**: Wants to know why the content has changed.
- **Preconditions**:
	- The student must have at least one completed lesson or test result.
- **Success Guarantee**: The student's lesson plan is updated according to their latest performance, and a logical explanation for this change is provided to the student.
- **Main Scenario**:
	1. The system checks the student's progress status.
	2. The AI engine compares the progress with the current content.
	3. It generates new content for areas where insufficient performance is detected.
	4. The updated content is displayed to the student.
	5. A brief "why explanation" is included with each change.
- **Exception Flows**:
	- 2a. If the data cannot be updated, the system temporarily retains the existing content.
	- 4a. If the student rejects the change, the system allows manual editing.

### UC10 – Student Progress Tracking (FR18–FR20–FR28)
- **Primary Actor**: Student, Teacher
- **Goal (Purpose in Context)**: To show the student's past achievements with graphs, list completed lessons, and record progress status.
- **Stakeholders and Interests**:
	- **Student**: Wants to see their own development.
	- **Teacher**: Wants to monitor and supervise the student's development.
- **Preconditions**:
	- The student must have at least one completed content item or test result.
- **Success Guarantee**: Progress data is updated, graphs are generated, and shown to both the student and the teacher.
- **Main Scenario**:
	1. The student clicks on the "My Progress" tab.
	2. The system fetches past lesson and test data from the database.
	3. The lessons completed by the student are listed.
	4. Graphical success rates are generated.
	5. The teacher views the student's development from their own panel.
	6. The system records all new data daily.
- **Exception Flows**:
	- 2a. If the database connection is lost, the system displays the most recent data.
	- 4a. If graphs cannot be generated, the data is presented in table format.

### UC11 – Data Export (FR21)
- **Primary Actor**: Student, Teacher
- **Supporting Actor**: System Database
- **Goal (Purpose in Context)**: To export progress data, test reports, and success rates in PDF or CSV format for the student or teacher.
- **Stakeholders and Interests**:
	- **Student**: Wants to export their own progress reports.
	- **Teacher**: Wants to save class-based or student-based reports.
- **Preconditions**:
	- The student or teacher must be logged in.
	- There must be at least one saved progress or test result.
- **Success Guarantee**: Reports are successfully exported, and the file becomes downloadable on the device.
- **Main Scenario**:
	1. The user selects the "Export Data" option.
	2. The system lists available report types.
	3. The user selects the file format (PDF or CSV).
	4. The system converts the data to the selected format.
	5. The system presents the file as a download link.
	6. The user downloads the file.
- **Exception Flows**:
	- 2a. If no data is found, the system displays a warning.
	- 4a. If a format conversion error occurs, the system re-processes the request.
	- 5a. If the link expires, a new link is generated for the user.

### UC12 – Automatic Feedback (FR22)
- **Primary Actor**: AI Analysis Engine
- **Goal (Purpose in Context)**: To generate automatic feedback based on the student's test results and assignment performance.
- **Stakeholders and Interests**:
	- **AI Engine**: Wants to generate error-focused suggestions by analyzing test results.
	- **Student**: Wants to learn their mistakes and areas for improvement.
	- **Teacher**: Wants to assign additional homework to the student based on automatic suggestions.
- **Preconditions**:
	- The student must have at least one completed test.
- **Success Guarantee**: The AI engine produces appropriate feedback messages for the student after each test.
- **Main Scenario**:
	1. The system retrieves the student's latest test results.
	2. The AI engine analyzes incorrect answers and weak topics.
	3. The AI engine generates automatic feedback for each incorrect answer.
- **Exception Flows**:
	- 4a. If the feedback fails to load, the system sends an email notification to the user.

### UC13 – Submitting System Feedback (FR23)
- **Primary Actor**: Student
- **Goal (Purpose in Context)**: To allow users to send feedback, suggestions, or error reports about the system, interface, or content.
- **Stakeholders and Interests**:
	- **Student**: Wants to send opinions or error reports about the system.
	- **Admin**: Wants to review user feedback and make system improvements.
- **Preconditions**:
	- The user must be logged in.
- **Success Guarantee**: The feedback is saved in the system and notified to the relevant administrators.
- **Main Scenario**:
	1. The user enters the "Feedback" menu.
	2. The user enters a subject line and description.
	3. The system saves the feedback.
	4. An automatic notification is sent to the Admin.
	5. A "Your feedback has been received" message is displayed.
- **Exception Flows**:
	- 2a. If the user leaves the description field blank, the system displays a warning.
	- 4a. If the Admin cannot be reached, the notification is queued to be sent later.

### UC14 – Reward, Motivation, and Notification System (FR24–FR25, FR33–FR34)
- **Primary Actor**: Notification Service, Student
- **Goal in Context**: To operate reward, badge, and notification mechanisms to motivate students.
- **Stakeholders and Interests**:
	- **Student**: Wants to see their achievements and receive rewards.
	- **Notification Service**: Tracks daily logins and delivers notifications.
- **Preconditions**:
	- The student must be logged into the system.
- **Success Guarantee**: The daily streak, badges, and notifications are displayed correctly.
- **Main Scenario**:
	1. The system records the student's daily login.
	2. The Notification Service updates the "Daily Streak" counter.
	3. When the student completes their goal, the system gives a reward.
	4. The Notification Service sends the reward notification.
	5. The new badge/points appear on the student's panel.
- **Exception Flows**:
	- 2a. If the student does not log in for several days, the system sends a reminder.
	- 3a. If the goal is not completed, the system displays a motivational message.

### UC15 – Teacher Assigns Homework or Assignments (FR27)
- **Primary Actor**: Teacher
- **Goal in Context**: To enable the teacher to assign homework, tests, or activities to individual students or groups.
- **Stakeholders and Interests**:
	- **Teacher**: Wants to assign appropriate homework to students.
	- **Student**: Wants to see and complete assigned homework on time.
- **Preconditions**:
	- The teacher must be logged in.
	- Their student list must be available in the system.
- **Success Guarantee**: The homework is assigned and recorded.
- **Main Scenario**:
	1. The teacher opens the "Assign Homework" screen.
	2. The teacher selects the target student or group.
	3. The teacher enters assignment details.
	4. The system creates the assignment.
	5. A notification can be sent to the student.
- **Exception Flows**:
	- 2a. If the student list fails to load, the system requests a refresh.
	- 3a. If a past date is entered as the due date, the system displays a warning.

### UC16 – Admin Account Management (FR29)
- **Primary Actor**: Admin
- **Goal in Context**: To allow administrators to manage all accounts, roles, and permissions in the system.
- **Stakeholders and Interests**:
	- **Admin**: Wants to control account security and role structure.
	- **User**: Expects admin support for account issues.
- **Preconditions**:
	- Admin account must be active.
- **Success Guarantee**: User accounts are edited and changes are committed.
- **Main Scenario**:
	1. The Admin logs in.
	2. The Admin accesses the user list.
	3. The Admin changes a user's role or status.
	4. The system saves the change.
	5. The updated information takes effect.
- **Exception Flows**:
	- 3a. If an unauthorized change is attempted, the system displays a warning.

### UC17 – System Performance and Maintenance Management (FR30–FR31)
- **Primary Actor**: Admin
- **Goal in Context**: To monitor system health/performance and activate maintenance mode for scheduled updates.
- **Stakeholders and Interests**:
	- **Admin**: Wants stable operation and timely updates.
	- **User**: Cannot log in while the system is in maintenance mode.
- **Preconditions**:
	- Admin account must be active.
- **Success Guarantee**: Performance reports are displayed; maintenance mode toggles successfully.
- **Main Scenario**:
	1. The Admin logs in.
	2. The Admin opens the "System Performance" tab.
	3. The system displays statistics.
	4. The Admin initiates maintenance mode.
	5. The system restricts user access.
	6. After update completion, the system returns to normal.
- **Exception Flows**:
	- 3a. If statistics cannot be retrieved, show a warning.
	- 5a. If sessions are not terminated, force logout.

### UC18 – Messaging and Announcement System (FR32)
- **Primary Actor**: Student, Teacher
- **Goal (Purpose in Context)**: To provide messaging and announcement sharing between students and teachers.
- **Stakeholders and Interests**:
	- **Teacher**: Wants to send announcements.
	- **Student**: Wants to message the teacher.
	- **Notification Service**: Delivers new message/announcement notifications.
- **Preconditions**:
	- Student and teacher must be logged in.
- **Success Guarantee**: Message/announcement is saved and visible to recipients.
- **Main Scenario**:
	1. The user enters the "Messages" tab.
	2. The user creates a new message or announcement.
	3. The system displays recipients.
	4. The user selects recipients and sends.
	5. Notifications can be delivered.
	6. The recipient views it in their panel.
- **Exception Flows**:
	- 3a. If recipient not found, show warning.
	- 5a. If Notification Service is disabled, keep message in in-system inbox.

### UC19 – Teacher–AI Collaboration (FR35)
- **Primary Actor**: Teacher, AI Analysis Engine
- **Goal in Context**: For the teacher to prepare custom lesson materials by giving instructions to the AI engine.
- **Stakeholders and Interests**:
	- **Teacher**: Wants to design custom materials.
	- **AI Analysis Engine**: Generates content based on instructions.
- **Preconditions**:
	- Teacher must be logged in.
	- AI engine must be online.
- **Success Guarantee**: Content is created and assigned.
- **Main Scenario**:
	1. Teacher opens the "AI Content Generation" module.
	2. Teacher enters a lesson/topic title and instructions.
	3. AI generates suggested content.
	4. Teacher reviews/edits.
	5. System saves and assigns.
- **Exception Flows**:
	- 3a. If generation fails, provide a regenerate option.
	- 4a. If teacher cancels edit, save as draft.

### UC20 – Chatbot Interaction (FR37–FR38)
- **Primary Actor**: Student, Chatbot
- **Goal (Purpose in Context)**: To allow students to ask questions about lessons/exercises and receive guidance.
- **Stakeholders and Interests**:
	- **Student**: Wants quick answers and practice.
	- **Chatbot Service**: Provides appropriate responses.
- **Preconditions**:
	- Student must be logged in.
	- Chatbot service must be active.
- **Success Guarantee**: Conversation works and history is saved.
- **Main Scenario**:
	1. Student opens the Chatbot interface.
	2. Student asks a question.
	3. Chatbot processes and responds.
	4. Student asks follow-up questions.
	5. System saves chat history.
- **Exception Flows**:
	- 2a. If connection lost, show error.
	- 3a. If the question is not understood, ask for rephrase.

---

## 5. UML Class Model (Implementation Reference)

Class model inputs:
- Class inventory template: `docs/UML-Class-Inventory.md`
- PlantUML class diagram stub: `docs/uml/class-diagram-stub.puml`

Class diagram export (for the final report):
- `docs/uml/class-diagram.png` (or `docs/uml/class-diagram.pdf`)

Once the full UML (attributes/methods/relationships) is available, the code implementation can be generated to match it 1:1.

---

## 6. Implementation Alignment (UML → Code → Web UI)

This project is implemented as a Web application (XAMPP: PHP + MySQL) using a minimal MVC / layered structure.

### 6.1 Architecture (Layered MVC)
- UI Layer: `app/Views/*`
- Controller Layer: `app/Controllers/*`
- Service Layer: `app/Services/*`
- Repository/Data Layer: `app/Repositories/*` + PDO (`app/Core/DB.php`)
- Domain Model: `app/Domain/Entities/*` and `app/Domain/Enums/*`

### 6.2 Route Map (Key User Flows)
- Student core: placement → results → plan/content → progress/export
- Teacher core: results, assignments, announcements/messages
- Messaging & announcements: shared between student and teacher

### 6.3 Traceability Appendix
For a concise mapping of FR/UC → route → controller → repository/service → database tables, see:
- `docs/UML-Code-Mapping.md`
