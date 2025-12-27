-- Database schema for PLC (Personalized Learning Content)
-- Create DB first: CREATE DATABASE plc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE plc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE plc;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  role ENUM('student','teacher','admin') NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified_at DATETIME NULL,
  created_at DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS auth_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('email_verify','password_reset') NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL,
  INDEX (user_id),
  INDEX (type),
  CONSTRAINT fk_auth_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Domain tables (UML-driven, minimal implementation)

CREATE TABLE IF NOT EXISTS rewards (
  reward_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  points INT NOT NULL,
  badge_icon VARCHAR(255) NOT NULL,
  UNIQUE KEY uniq_reward_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS student_rewards (
  student_reward_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  reward_id INT NOT NULL,
  earned_at DATETIME NOT NULL,
  INDEX (student_id),
  INDEX (reward_id),
  CONSTRAINT fk_student_rewards_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_student_rewards_reward FOREIGN KEY (reward_id) REFERENCES rewards(reward_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS topics (
  topic_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(120) NOT NULL,
  difficulty ENUM('A1','A2','B1','B2','C1','C2') NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tests (
  test_id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('placement','reading','writing','listening','speaking','other') NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NULL,
  duration INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  INDEX (type)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS test_results (
  result_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  test_id INT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  level ENUM('A1','A2','B1','B2','C1','C2') NOT NULL,
  analysis JSON NOT NULL,
  created_at DATETIME NOT NULL,
  INDEX (student_id),
  INDEX (test_id),
  CONSTRAINT fk_test_results_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_test_results_test FOREIGN KEY (test_id) REFERENCES tests(test_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lesson_plans (
  plan_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  level ENUM('A1','A2','B1','B2','C1','C2') NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  INDEX (student_id),
  CONSTRAINT fk_lesson_plans_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lesson_plan_topics (
  plan_id INT NOT NULL,
  topic_id INT NOT NULL,
  PRIMARY KEY (plan_id, topic_id),
  CONSTRAINT fk_lpt_plan FOREIGN KEY (plan_id) REFERENCES lesson_plans(plan_id) ON DELETE CASCADE,
  CONSTRAINT fk_lpt_topic FOREIGN KEY (topic_id) REFERENCES topics(topic_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS progress (
  progress_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  completion_status JSON NOT NULL,
  correctness_rate DOUBLE NOT NULL DEFAULT 0,
  consistency_rate DOUBLE NOT NULL DEFAULT 0,
  last_updated DATETIME NULL,
  UNIQUE KEY uniq_progress_student (student_id),
  CONSTRAINT fk_progress_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS progress_snapshots (
  snapshot_id INT AUTO_INCREMENT PRIMARY KEY,
  progress_id INT NOT NULL,
  timestamp DATETIME NOT NULL,
  progress_data JSON NOT NULL,
  INDEX (progress_id),
  CONSTRAINT fk_progress_snapshots_progress FOREIGN KEY (progress_id) REFERENCES progress(progress_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS chat_sessions (
  session_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  started_at DATETIME NOT NULL,
  INDEX (student_id),
  CONSTRAINT fk_chat_sessions_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS chat_messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  sender VARCHAR(32) NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME NOT NULL,
  INDEX (session_id),
  CONSTRAINT fk_chat_messages_session FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  feedback_text TEXT NOT NULL,
  submitted_at DATETIME NOT NULL,
  INDEX (student_id),
  CONSTRAINT fk_feedback_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  INDEX (sender_id),
  INDEX (recipient_id),
  CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_messages_recipient FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS announcements (
  announcement_id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  INDEX (teacher_id),
  CONSTRAINT fk_announcements_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS assignments (
  assignment_id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  due_date DATETIME NOT NULL,
  assignment_type VARCHAR(50) NOT NULL,
  created_at DATETIME NULL,
  INDEX (teacher_id),
  CONSTRAINT fk_assignments_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS student_assignments (
  student_assignment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  assignment_id INT NOT NULL,
  status ENUM('PENDING','SUBMITTED','GRADED','LATE') NOT NULL,
  submitted_at DATETIME NOT NULL,
  graded_at DATETIME NULL,
  score INT NOT NULL DEFAULT 0,
  INDEX (student_id),
  INDEX (assignment_id),
  CONSTRAINT fk_student_assignments_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_student_assignments_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS content (
  content_id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NULL,
  type ENUM('LESSON','EXERCISE','ROLEPLAY','VOCABULARY','GRAMMAR') NOT NULL,
  level ENUM('A1','A2','B1','B2','C1','C2') NOT NULL,
  body TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NULL,
  why_selected TEXT NULL,
  INDEX (teacher_id),
  CONSTRAINT fk_content_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS student_content (
  student_id INT NOT NULL,
  content_id INT NOT NULL,
  assigned_at DATETIME NOT NULL,
  PRIMARY KEY (student_id, content_id),
  INDEX (content_id),
  CONSTRAINT fk_student_content_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_student_content_content FOREIGN KEY (content_id) REFERENCES content(content_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS system_performance (
  performance_id INT AUTO_INCREMENT PRIMARY KEY,
  cpu_usage VARCHAR(50) NOT NULL,
  memory_usage VARCHAR(50) NOT NULL,
  active_users VARCHAR(50) NOT NULL,
  statistics JSON NOT NULL,
  recorded_at DATETIME NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS maintenance_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  start_time DATETIME NOT NULL,
  end_time DATETIME NULL,
  reason TEXT NOT NULL,
  is_active TINYINT(1) NOT NULL
) ENGINE=InnoDB;

-- In-app notifications (FR25, FR34)
CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  link VARCHAR(255) NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  INDEX (user_id),
  INDEX (is_read),
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Teacher → AI directives (FR35)
CREATE TABLE IF NOT EXISTS content_directives (
  directive_id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  student_id INT NULL,
  title VARCHAR(200) NOT NULL,
  directive_text TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  INDEX (teacher_id),
  INDEX (student_id),
  CONSTRAINT fk_directives_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_directives_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Seed minimal default rewards (FR24) - safe to re-run due to unique name
INSERT INTO rewards (name, description, points, badge_icon)
VALUES
  ('Placement Completed', 'Completed the placement test.', 10, 'badge-placement'),
  ('Streak 3', 'Completed at least one task for 3 consecutive days.', 15, 'badge-streak-3'),
  ('Streak 7', 'Completed at least one task for 7 consecutive days.', 30, 'badge-streak-7')
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  points = VALUES(points),
  badge_icon = VALUES(badge_icon);
