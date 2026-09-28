function initProfile3Page() {
  const demoBox = document.getElementById('p3-ui-demo-box');
  const statusText = document.getElementById('p3-ui-demo-status');
  const resultText = document.getElementById('p3-ui-demo-result');
  if (!demoBox || !statusText) return;

  let state = 'idle'; // 'idle' | 'waiting' | 'ready'
  let startTime = 0;
  let timeoutId = null;

  demoBox.addEventListener('click', () => {
    if (state === 'idle') {
      // Iniciar prueba
      state = 'waiting';
      demoBox.style.background = '#800000';
      demoBox.style.borderColor = '#ff3333';
      statusText.textContent = 'ESTADO: CARGANDO...';
      if (resultText) resultText.textContent = '';
      ArcadeAudio.playSelect();

      const delay = Math.floor(Math.random() * 2000) + 1200; // 1.2s a 3.2s
      timeoutId = setTimeout(() => {
        state = 'ready';
        startTime = Date.now();
        demoBox.style.background = '#006622';
        demoBox.style.borderColor = 'var(--neon-green)';
        statusText.textContent = 'ESTADO: LISTO. HAZ CLIC PARA CONTINUAR';
      }, delay);
    } else if (state === 'waiting') {
      // Presionó antes de tiempo
      clearTimeout(timeoutId);
      state = 'idle';
      demoBox.style.background = '#1b2038';
      demoBox.style.borderColor = 'var(--border-arcade)';
      statusText.textContent = 'ACCIÓN NO DISPONIBLE. CLIC PARA REINTENTAR';
    } else if (state === 'ready') {
      // Éxito
      const elapsed = Date.now() - startTime;
      state = 'idle';
      demoBox.style.background = '#1b2038';
      demoBox.style.borderColor = 'var(--neon-yellow)';
      ArcadeAudio.playPowerUp();
      statusText.textContent = 'INTERACCIÓN COMPLETADA. CLIC PARA REPETIR';

      if (resultText) {
        resultText.innerHTML = `Tiempo de respuesta: <strong style="color:var(--neon-green)">${elapsed} ms</strong>`;
      }
    }
  });
}


// Interacción del perfil 3: demostración de estados de interfaz.

document.addEventListener('DOMContentLoaded', initProfile3Page);
