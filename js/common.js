// =============================================================================
// 1. SISTEMA DE AUDIO CHIPTUNE RETRO (Sintetizador Web Audio API)
// No requiere archivos de audio externos, funciona directo en el navegador
// =============================================================================
const ArcadeAudio = {
  ctx: null,
  enabled: true,

  init() {
    // Inicializar contexto solo tras interacción del usuario para cumplir políticas del navegador
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  },

  // Sonido clásico de insertar moneda (dos tonos brillantes)
  playCoin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio no disponible:', e);
    }
  },

  // Sonido de clic / selección arcade
  playSelect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn('Audio no disponible:', e);
    }
  },

  // Sonido de acción / combo completado
  playPowerUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(330, now); // E4
      osc.frequency.linearRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.linearRampToValueAtTime(987.77, now + 0.2); // B5

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio no disponible:', e);
    }
  }
};

// =============================================================================
//  INICIALIZACIÓN GLOBAL CUANDO CARGA EL DOM
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupScanlinesToggle();
  setupAudioToggle();
  setupGlobalCoinMechanism();
});
function setupNavigation() {
  const menuBtn = document.getElementById('btn-mobile-menu');
  const navMenu = document.getElementById('nav-menu-list');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.textContent = isOpen ? '✕' : '☰';
      ArcadeAudio.playSelect();
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
        navMenu.querySelectorAll('.nav-dropdown').forEach(item => {
          item.classList.remove('open');
          item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
      });
    });
  }

  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const dropdown = toggle.closest('.nav-dropdown');
      const isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      ArcadeAudio.playSelect();
    });
  });

  // Sonido en links del menú
  const links = document.querySelectorAll('.nav-link, .btn-arcade');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      // sutil feedback
    });
  });
}

function setupScanlinesToggle() {
  const scanlinesBtn = document.getElementById('toggle-scanlines-btn');
  const savedScanlines = localStorage.getItem('arcade_scanlines') !== 'false';

  // Aplicar estado guardado
  if (savedScanlines) {
    document.body.classList.add('scanlines-active');
    if (scanlinesBtn) scanlinesBtn.classList.add('active');
  } else {
    document.body.classList.remove('scanlines-active');
    if (scanlinesBtn) scanlinesBtn.classList.remove('active');
  }

  if (scanlinesBtn) {
    scanlinesBtn.addEventListener('click', () => {
      const isActive = document.body.classList.toggle('scanlines-active');
      scanlinesBtn.classList.toggle('active', isActive);
      localStorage.setItem('arcade_scanlines', isActive);
      ArcadeAudio.playSelect();
    });
  }
}

function setupAudioToggle() {
  const soundBtn = document.getElementById('toggle-sound-btn');
  const savedSound = localStorage.getItem('arcade_sound') !== 'false';
  ArcadeAudio.enabled = savedSound;

  if (soundBtn) {
    soundBtn.classList.toggle('active', savedSound);
    soundBtn.textContent = savedSound ? '🔊 AUDIO ON' : '🔇 AUDIO OFF';

    soundBtn.addEventListener('click', () => {
      ArcadeAudio.enabled = !ArcadeAudio.enabled;
      localStorage.setItem('arcade_sound', ArcadeAudio.enabled);
      soundBtn.classList.toggle('active', ArcadeAudio.enabled);
      soundBtn.textContent = ArcadeAudio.enabled ? '🔊 AUDIO ON' : '🔇 AUDIO OFF';
      if (ArcadeAudio.enabled) {
        ArcadeAudio.playCoin();
      }
    });
  }
}

function setupGlobalCoinMechanism() {
  let credits = parseInt(sessionStorage.getItem('arcade_credits') || '2', 10);
  
  const updateCreditDisplays = () => {
    document.querySelectorAll('.credit-count-val').forEach(el => {
      el.textContent = credits.toString().padStart(2, '0');
    });
  };

  updateCreditDisplays();

  // Función global para insertar moneda
  window.insertCoin = function() {
    credits += 1;
    sessionStorage.setItem('arcade_credits', credits);
    updateCreditDisplays();
    ArcadeAudio.playCoin();

    // Efecto visual en la pantalla de la máquina
    const marquee = document.querySelector('.marquee-text');
    if (marquee) {
      const original = marquee.textContent;
      marquee.textContent = '★ CRÉDITO INSERTADO! PERSONAJE LISTO ★';
      marquee.style.color = '#39ff14';
      setTimeout(() => {
        marquee.textContent = original;
        marquee.style.color = '';
      }, 1800);
    }
  };

  // Asignar listeners a botones de insertar moneda
  document.querySelectorAll('.btn-insert-coin').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.insertCoin();
    });
  });
}
