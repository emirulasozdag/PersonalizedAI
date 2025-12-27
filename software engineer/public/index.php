<?php

declare(strict_types=1);

require __DIR__ . '/../app/bootstrap.php';

use App\Core\Router;

$router = new Router();

// Public
$router->get('/', 'HomeController@index');

$router->get('/auth/login', 'AuthController@showLogin');
$router->post('/auth/login', 'AuthController@login');
$router->post('/auth/logout', 'AuthController@logout');

$router->get('/auth/register', 'AuthController@showRegister');
$router->post('/auth/register', 'AuthController@register');

$router->get('/auth/verify', 'AuthController@verifyEmail');

$router->get('/auth/forgot', 'AuthController@showForgot');
$router->post('/auth/forgot', 'AuthController@sendReset');
$router->get('/auth/reset', 'AuthController@showReset');
$router->post('/auth/reset', 'AuthController@resetPassword');

// Dashboards (role-based)
$router->get('/student', 'StudentController@dashboard');
$router->get('/student/placement', 'StudentController@placement');
$router->get('/student/placement/module', 'StudentController@placementModule');
$router->get('/student/placement/interim', 'StudentController@placementInterim');
$router->post('/student/placement/submit', 'StudentController@submitPlacementModule');

$router->get('/student/results', 'StudentController@results');
$router->get('/student/results/view', 'StudentController@viewResult');

$router->get('/student/plan', 'StudentController@plan');
$router->get('/student/content', 'StudentController@content');

$router->get('/student/progress', 'StudentController@progress');
$router->get('/student/export/csv', 'StudentController@exportProgressCsv');
$router->get('/student/export/pdf', 'StudentController@exportProgressPdf');

$router->get('/notifications', 'NotificationController@list');
$router->post('/notifications/read', 'NotificationController@markRead');

// Chatbot (FR37/FR38)
$router->get('/chatbot', 'ChatbotController@chat');
$router->post('/chatbot/send', 'ChatbotController@send');

// Messaging (FR32)
$router->get('/messages', 'MessageController@inbox');
$router->get('/messages/compose', 'MessageController@compose');
$router->post('/messages/send', 'MessageController@send');
$router->post('/messages/read', 'MessageController@markRead');

// Announcements (FR32)
$router->get('/announcements', 'AnnouncementController@list');
$router->get('/announcements/new', 'AnnouncementController@createForm');
$router->post('/announcements/new', 'AnnouncementController@create');

// Feedback (FR23)
$router->get('/student/feedback', 'FeedbackController@form');
$router->post('/student/feedback', 'FeedbackController@submit');

// Assignments (FR27)
$router->get('/student/assignments', 'AssignmentController@studentList');
$router->post('/student/assignments/submit', 'AssignmentController@studentSubmit');
$router->get('/teacher/assignments', 'AssignmentController@teacherList');
$router->get('/teacher/assignments/new', 'AssignmentController@teacherCreateForm');
$router->post('/teacher/assignments/new', 'AssignmentController@teacherCreate');
$router->post('/teacher/assignments/grade', 'AssignmentController@teacherGrade');

// Teacher directives to AI (FR35)
$router->get('/teacher/directives', 'DirectiveController@teacherList');
$router->post('/teacher/directives/new', 'DirectiveController@teacherCreate');

// Teacher test results (FR26)
$router->get('/teacher/results', 'TestResultController@teacherList');
$router->get('/teacher/results/view', 'TestResultController@teacherView');

$router->get('/teacher', 'TeacherController@dashboard');
$router->get('/admin', 'AdminController@dashboard');

// Admin management (FR29–FR31)
$router->get('/admin/users', 'AdminController@users');
$router->post('/admin/users/role', 'AdminController@updateUserRole');
$router->get('/admin/maintenance', 'AdminController@maintenance');
$router->post('/admin/maintenance/start', 'AdminController@startMaintenance');
$router->post('/admin/maintenance/stop', 'AdminController@stopMaintenance');
$router->get('/admin/performance', 'AdminController@performance');

$router->dispatch();
