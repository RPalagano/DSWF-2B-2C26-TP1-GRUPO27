function initProfile2Page() {
  const queryBtn = document.getElementById('p2-btn-query');
  const responseLog = document.getElementById('p2-response-log');
  const pingDisplay = document.getElementById('p2-ping-val');
  if (!queryBtn || !responseLog) return;

  queryBtn.addEventListener('click', () => {
    ArcadeAudio.playSelect();
    queryBtn.disabled = true;
    queryBtn.textContent = 'CONSULTANDO...';

    const simulatedLatency = Math.floor(Math.random() * 25) + 12; // 12ms a 37ms
    
    responseLog.innerHTML = `<span style="color:var(--neon-yellow)">[FETCH] GET /api/v1/retro-cabinets/player-2...</span>`;

    setTimeout(() => {
      ArcadeAudio.playPowerUp();
      queryBtn.disabled = false;
      queryBtn.textContent = 'EJECUTAR QUERY DE PRUEBA';
      if (pingDisplay) pingDisplay.textContent = `${simulatedLatency} ms`;

      responseLog.innerHTML = `
<span style="color:var(--neon-green)">HTTP/2 200 OK (${simulatedLatency}ms)</span>
{
  "status": "success",
  "developer": "Sofía Valenzuela",
  "role": "Backend & Database Wizard",
  "databases": ["PostgreSQL", "Redis", "Supabase"],
  "integrity": "100%",
  "arcade_cache": "HIT"
}
      `.trim();
    }, 550);
  });
}

document.addEventListener('DOMContentLoaded', initProfile2Page);
