# Functional Requirements – Implementation Coverage (Web Demo)

This document records which Functional Requirements (FR) are implemented in the current PHP+MySQL (XAMPP) web application, and which are partial/demo or not implemented.

**Legend**
- **Implemented**: Works end-to-end in the current UI and persists to DB when applicable.
- **Partial / Demo**: Some parts exist (UI only, DB only, or simplified logic).
- **Not implemented**: Only exists in requirements/UML, not wired into the running web app.

## Coverage Table

| FR | Status | Evidence (UI / Route / Notes) |
|---|---|---|
| FR1 Accounts & login | Implemented | `/auth/register`, `/auth/login`, role dashboards `/student`, `/teacher`, `/admin` |
| FR2 Password reset | Implemented (demo) | `/auth/forgot`, `/auth/reset` (reset link shown as flash in demo mode) |
| FR3 Email verification | Implemented (demo) | `/auth/verify` (verification link shown as flash in demo mode) |
| FR4 Separate modules (R/W/L/S) | Implemented (UI flow) | Placement modules via `/student/placement/module?name=...` |
| FR5 Separate level per skill | Implemented (demo) | Per-skill levels saved in `test_results.analysis.skill_levels` and shown in result views |
| FR6 Microphone voice input | Implemented (demo) | Speaking module uses browser mic capture (MediaRecorder) and uploads audio |
| FR7 Audio playback | Implemented (demo) | Listening module renders an `<audio controls>` demo player |
| FR8 Reading text content | Implemented (demo) | Placement reading module shows text questions |
| FR9 Writing text input | Implemented (demo) | Placement writing module uses text input |
| FR10 Pronunciation accuracy analysis | Partial / Demo | Demo accuracy computed and shown for speaking; not real speech recognition |
| FR11 Interim results after each module | Implemented (basic) | Dedicated interim page `/student/placement/interim` after each module |
| FR12 Overall level report end of test | Implemented (demo) | Overall level + module breakdown stored in `test_results.analysis` and viewable in result detail |
| FR13 Analyze strengths/weaknesses | Partial | Analysis JSON exists from placement grading; used to generate plan/topics |
| FR14 Personalized lesson plan | Implemented (demo) | `/student/plan` shows plan generated after placement |
| FR15 AI-based new content delivery | Partial (simulated) | `/student/content` uses generated content via service; not a real external AI integration |
| FR16 Auto-update content based on progress | Not implemented | No periodic update / adaptation loop implemented |
| FR17 Explain why content selected | Implemented (demo) | Plan/content includes “why selected” explanation |
| FR18 Graphs for achievements | Partial / Demo | `/student/progress` shows simple visual bars (not a chart library) |
| FR19 Chronological completed lessons | Partial | Completion status exists; not a dedicated chronological lesson history UI |
| FR20 Display progress status | Implemented (basic) | `/student/progress` shows correctness/consistency + status JSON |
| FR21 Export PDF/CSV | Implemented (basic) | CSV: `/student/export/csv`, PDF: `/student/export/pdf` |
| FR22 Automatic feedback | Not implemented | No feedback engine wired |
| FR23 Submit feedback | Implemented (basic) | `/student/feedback` saves to `feedback` table |
| FR24 Badges/points | Implemented (basic) | Rewards/badges seeded + awarding for placement + streak milestones |
| FR25 Daily goal notifications | Partial / Demo | In-app notifications exist (`/notifications`); no email/push scheduling |
| FR26 Teacher views results | Implemented (basic) | `/teacher/results` lists student test results |
| FR27 Teacher assigns homework | Implemented (basic) | Teacher create/list/grade + student submit (assignments) |
| FR28 Teacher lists strengths/weaknesses | Implemented (basic) | Teacher can view a result detail with skill levels: `/teacher/results/view?id=...` |
| FR29 Admin manages accounts | Implemented (basic) | Admin can list users + update roles: `/admin/users` |
| FR30 System performance statistics | Implemented (basic) | Admin performance snapshots UI: `/admin/performance` |
| FR31 Maintenance mode + announcements | Implemented (basic) | Maintenance start/stop: `/admin/maintenance` and 503 page; announcements at `/announcements` |
| FR32 Messaging + announcements | Implemented (basic) | `/messages*` and `/announcements*` |
| FR33 Daily streak counter | Implemented (basic) | Streak displayed on `/student/progress` |
| FR34 Reminders for inactivity | Partial / Demo | In-app inactivity reminder created when recording progress (no background scheduler) |
| FR35 Teacher directives to AI | Implemented (basic) | Teacher UI: `/teacher/directives` (writes `content_directives`) |
| FR36 Continuously store progress | Implemented (basic) | Progress is stored in `progress` table; updated on placement completion |
| FR37 Chatbot interface | Implemented (basic) | `/chatbot` (session + message history) |
| FR38 Ask chatbot lesson questions | Implemented (demo) | `/chatbot/send` replies with a simple rule-based response |

## Recommendation for Submission
Most FRs are now covered end-to-end as **basic/demo** implementations.

If your rubric expects “production-quality” implementations (e.g., real pronunciation scoring, scheduled reminders, advanced charts), mark those items as **demo/partial** and include that note in your report.
