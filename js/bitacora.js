function initBitacoraPage() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const entries = document.querySelectorAll('.log-entry');
  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      ArcadeAudio.playSelect();
      const filter = btn.getAttribute('data-filter');

      // Actualizar botón activo
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtrar entradas
      entries.forEach(entry => {
        if (filter === 'todos' || entry.classList.contains(`category-${filter}`)) {
          entry.style.display = 'block';
        } else {
          entry.style.display = 'none';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initBitacoraPage);
