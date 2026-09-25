function initIndexPage() {
  const consoleOutput = document.getElementById('arcade-console-log');
  if (!consoleOutput) return;

  const btnActionA = document.getElementById('btn-action-a');
  const btnActionB = document.getElementById('btn-action-b');
  const btnActionC = document.getElementById('btn-action-c');

  const printLog = (msg, isSuccess = false, isWarn = false) => {
    const line = document.createElement('div');
    line.className = 'console-line';
    if (isSuccess) line.style.color = 'var(--neon-green)';
    if (isWarn) line.style.color = 'var(--neon-yellow)';
    line.textContent = `> ${msg}`;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  };

  if (btnActionA) {
    btnActionA.addEventListener('click', () => {
      ArcadeAudio.playSelect();
      printLog('¡Bienvenido a Tu Máquina Retro Dev!', true);
    });
  }

  if (btnActionB) {
    btnActionB.addEventListener('click', () => {
      ArcadeAudio.playSelect();
      printLog('¡Gracias por visitar nuestra presentación!', true);
    });
  }

  if (btnActionC) {
    btnActionC.addEventListener('click', () => {
      ArcadeAudio.playPowerUp();
      printLog('¡Que comience la partida!', true);
      const pill = document.querySelector('.station-status-pill');
      if (pill) {
        pill.textContent = 'MODO TURBO DEV';
        pill.style.background = 'rgba(255, 0, 119, 0.2)';
        pill.style.borderColor = 'var(--neon-pink)';
        pill.style.color = 'var(--neon-pink)';
      }
    });
  }
}

// =============================================================================
// 5. INTERACCIÓN BITÁCORA (bitacora.html)
// =============================================================================

document.addEventListener('DOMContentLoaded', initIndexPage);
