<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Auth;
use App\Repositories\ChatRepository;

final class ChatbotController
{
    public function chat(): void
    {
        Auth::requireRole('student');
        $studentId = (int)(Auth::user()['id'] ?? 0);

        $repo = new ChatRepository();
        $session = $repo->findLatestSession($studentId);
        if (!$session) {
            $sessionId = $repo->startSession($studentId);
        } else {
            $sessionId = (int)($session['session_id'] ?? 0);
        }

        $messages = $sessionId > 0 ? $repo->listMessages($sessionId) : [];
        \view('chatbot/chat', ['sessionId' => $sessionId, 'messages' => $messages]);
    }

    public function send(): void
    {
        Auth::requireRole('student');
        \require_post_csrf();

        $studentId = (int)(Auth::user()['id'] ?? 0);
        $sessionId = (int)($_POST['session_id'] ?? 0);
        $text = trim((string)($_POST['message'] ?? ''));

        if ($text === '') {
            \flash('error', 'Message cannot be empty.');
            \redirect('/chatbot');
        }

        $repo = new ChatRepository();
        if ($sessionId <= 0) {
            $sessionId = $repo->startSession($studentId);
        }

        $repo->addMessage($sessionId, 'student', $text);
        $repo->addMessage($sessionId, 'bot', $this->generateReply($text));

        // Count as a task for streak.
        (new \App\Services\ProgressService())->recordTaskCompletion($studentId, 'chatbot_message');

        \redirect('/chatbot');
    }

    private function generateReply(string $text): string
    {
        $t = mb_strtolower($text);

        if (str_contains($t, 'grammar') || str_contains($t, 'tense')) {
            return 'Grammar tip: focus on one tense at a time. Try writing 3 example sentences using it.';
        }
        if (str_contains($t, 'vocabulary') || str_contains($t, 'word')) {
            return 'Vocabulary tip: learn words in context. Create a short story using 5 new words.';
        }
        if (str_contains($t, 'pronunciation') || str_contains($t, 'speaking')) {
            return 'Speaking tip: slow down and repeat. Record yourself and compare stress/intonation.';
        }

        return 'Thanks! Can you tell me your level (A1–C2) and what you want to improve (reading/writing/listening/speaking)?';
    }
}
