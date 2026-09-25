function initProfile3Page() {
  const testBox = document.getElementById('p3-reflex-box');
  const statusText = document.getElementById('p3-reflex-status');
  const resultText = document.getElementById('p3-reflex-result');
  if (!testBox || !statusText) return;

  let state = 'idle'; // 'idle' | 'waiting' | 'ready'
  let startTime = 0;
  let timeoutId = null;

  testBox.addEventListener('click', () => {
    if (state === 'idle') {
      // Iniciar prueba
      state = 'waiting';
      testBox.style.background = '#800000';
      testBox.style.borderColor = '#ff3333';
      statusText.textContent = 'ESPERA AL COLOR VERDE...';
      if (resultText) resultText.textContent = '';
      ArcadeAudio.playSelect();

      const delay = Math.floor(Math.random() * 2000) + 1200; // 1.2s a 3.2s
      timeoutId = setTimeout(() => {
        state = 'ready';
        startTime = Date.now();
        testBox.style.background = '#006622';
        testBox.style.borderColor = 'var(--neon-green)';
        statusText.textContent = '¡PRESIONA AHORA!';
      }, delay);
    } else if (state === 'waiting') {
      // Presionó antes de tiempo
      clearTimeout(timeoutId);
      state = 'idle';
      testBox.style.background = '#1b2038';
      testBox.style.borderColor = 'var(--border-arcade)';
      statusText.textContent = '¡DEMASIADO PRONTO! Clic para reintentar';
    } else if (state === 'ready') {
      // Éxito
      const elapsed = Date.now() - startTime;
      state = 'idle';
      testBox.style.background = '#1b2038';
      testBox.style.borderColor = 'var(--neon-yellow)';
      ArcadeAudio.playPowerUp();
      statusText.textContent = '¡EXCELENTE! Clic para jugar otra vez';
      
      let rank = 'RANGO A';
      if (elapsed < 230) rank = '★ RANGO S+ (VELOCIDAD MÁXIMA)';
      else if (elapsed < 300) rank = 'RANGO S (DESARROLLADOR SENIOR)';
      else if (elapsed < 400) rank = 'RANGO A (REFLEJOS ÓPTIMOS)';
      else rank = 'RANGO B (BUEN INTENTO)';

      if (resultText) {
        resultText.innerHTML = `Tiempo de reacción: <strong style="color:var(--neon-green)">${elapsed} ms</strong> — <span style="color:var(--neon-yellow)">${rank}</span>`;
      }
    }
  });
}


// Interacción del perfil 3: test de reflejos arcade.

document.addEventListener('DOMContentLoaded', initProfile3Page);
