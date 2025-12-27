<?php
/** @var string $module */
/** @var list<array{question_id:int,text:string,options:array<int,string>,correct_answer:string,points:int}> $questions */

$base = (string) config('app.base_url', '');
?>

<div class="card">
  <h2>Placement Module: <?= e(ucfirst($module)) ?></h2>
  <p>Answer the questions and submit to save this module.</p>

  <?php if ($module === 'listening'): ?>
    <div class="card" style="margin-top:12px">
      <strong>Listening audio (demo)</strong>
      <p style="margin-top:6px">Press play, listen, then answer the question below.</p>
      <?php
        // Small embedded beep-like WAV (data URI) to demonstrate audio playback without external assets.
        $audioData = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
      ?>
      <audio controls src="<?= e($audioData) ?>"></audio>
    </div>
  <?php endif; ?>

  <?php if ($module === 'speaking'): ?>
    <div class="card" style="margin-top:12px">
      <strong>Microphone recording (demo)</strong>
      <p style="margin-top:6px">Record a short audio (max ~10 seconds) and submit with your answers.</p>
      <div class="row" style="margin-top:10px">
        <button class="btn secondary" type="button" id="recStart">Start recording</button>
        <button class="btn secondary" type="button" id="recStop" disabled>Stop</button>
      </div>
      <audio id="recPreview" controls style="margin-top:10px; width:100%"></audio>
    </div>
  <?php endif; ?>

  <div class="row" style="margin-top:12px">
    <a class="btn secondary" href="<?= e($base) ?>/student/placement">Back</a>
  </div>

  <form method="post" action="<?= e($base) ?>/student/placement/submit" style="margin-top:12px">
    <?= csrf_field() ?>
    <input type="hidden" name="module" value="<?= e($module) ?>">
    <?php if ($module === 'speaking'): ?>
      <input type="hidden" name="speaking_audio" id="speakingAudio">
    <?php endif; ?>

    <?php if (!$questions): ?>
      <p>No questions configured for this module.</p>
    <?php endif; ?>

    <?php foreach ($questions as $q): ?>
      <div class="card" style="margin-top:12px">
        <strong>#<?= e((string)$q['question_id']) ?></strong>
        <p><?= e($q['text']) ?></p>

        <?php if (!empty($q['options'])): ?>
          <label>Choose one</label>
          <select name="answers[<?= e((string)$q['question_id']) ?>]">
            <option value="">-- select --</option>
            <?php foreach ($q['options'] as $opt): ?>
              <option value="<?= e($opt) ?>"><?= e($opt) ?></option>
            <?php endforeach; ?>
          </select>
        <?php else: ?>
          <label>Your answer (demo)</label>
          <input name="answers[<?= e((string)$q['question_id']) ?>]" placeholder="Type here...">
        <?php endif; ?>
      </div>
    <?php endforeach; ?>

    <div style="margin-top:14px">
      <button class="btn" type="submit">Submit module</button>
    </div>
  </form>
</div>

<?php if ($module === 'speaking'): ?>
  <script>
    (function(){
      const startBtn = document.getElementById('recStart');
      const stopBtn = document.getElementById('recStop');
      const audioEl = document.getElementById('recPreview');
      const hidden = document.getElementById('speakingAudio');
      if (!startBtn || !stopBtn || !audioEl || !hidden) return;

      let recorder;
      let chunks = [];
      let stream;

      startBtn.addEventListener('click', async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          recorder = new MediaRecorder(stream);
          chunks = [];
          recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
          recorder.onstop = async () => {
            const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
            audioEl.src = URL.createObjectURL(blob);
            const reader = new FileReader();
            reader.onload = () => { hidden.value = reader.result || ''; };
            reader.readAsDataURL(blob);
            if (stream) stream.getTracks().forEach(t => t.stop());
          };
          recorder.start();
          startBtn.disabled = true;
          stopBtn.disabled = false;
          // Auto-stop after ~10s
          setTimeout(() => { try { if (recorder && recorder.state === 'recording') recorder.stop(); } catch(e){} }, 10000);
        } catch (e) {
          alert('Microphone access failed. Please allow microphone permission and try again.');
        }
      });

      stopBtn.addEventListener('click', () => {
        try {
          if (recorder && recorder.state === 'recording') {
            recorder.stop();
          }
        } catch (e) {}
        startBtn.disabled = false;
        stopBtn.disabled = true;
      });
    })();
  </script>
<?php endif; ?>
