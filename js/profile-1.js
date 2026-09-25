function initProfile1Page() {
  const paletteButtons = document.querySelectorAll('.btn-palette-option');
  const preview = document.getElementById('p1-palette-preview');
  const codeOutput = document.getElementById('palette-css-var');
  if (!preview || !paletteButtons.length) return;

  const palettes = {
    arcade: { primary: '#00f0ff', background: '#0b0d17' },
    gameboy: { primary: '#9bbc0f', background: '#0f380f' },
    cga: { primary: '#ff55ff', background: '#0000aa' },
    cyberpunk: { primary: '#ffe600', background: '#000000' }
  };

  const applyPalette = themeName => {
    const palette = palettes[themeName];
    if (!palette) return;

    preview.style.backgroundColor = palette.background;
    preview.style.borderColor = palette.primary;
    preview.style.color = palette.primary;

    if (codeOutput) {
      codeOutput.textContent = `--retro-primary: ${palette.primary}; --retro-bg: ${palette.background};`;
      codeOutput.style.color = palette.primary;
      codeOutput.style.background = palette.background;
    }

    paletteButtons.forEach(button => {
      const isSelected = button.dataset.palette === themeName;
      button.classList.toggle('active', isSelected);
      button.classList.toggle('btn-cyan', isSelected);
      button.classList.toggle('btn-outline', !isSelected);
      button.setAttribute('aria-pressed', isSelected);
    });
  };

  paletteButtons.forEach(button => {
    button.addEventListener('click', () => {
      applyPalette(button.dataset.palette);
      ArcadeAudio.playSelect();
    });
  });

  const selectedButton = document.querySelector('.btn-palette-option.active');
  applyPalette(selectedButton?.dataset.palette || 'arcade');
}

document.addEventListener('DOMContentLoaded', initProfile1Page);
