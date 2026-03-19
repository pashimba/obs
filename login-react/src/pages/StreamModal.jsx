import { useState, useEffect } from 'react';

export default function StreamModal({ onClose }) {
  const [twitchConnected, setTwitchConnected] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [platforms, setPlatforms] = useState({ twitch: false, youtube: false });
  const [streamTitle, setStreamTitle] = useState('¡Transmisión en vivo con StreamMaker!');
  const [category, setCategory] = useState('');
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    const hasTwitch  = !!localStorage.getItem('token_twitch');
    const hasYoutube = !!localStorage.getItem('token_google');
    setTwitchConnected(hasTwitch);
    setYoutubeConnected(hasYoutube);
    // Auto-select connected platforms
    setPlatforms({ twitch: hasTwitch, youtube: hasYoutube });
  }, []);

  function togglePlatform(p) {
    setPlatforms((prev) => ({ ...prev, [p]: !prev[p] }));
  }

  function handleStart() {
    if (!platforms.twitch && !platforms.youtube) {
      alert('Selecciona al menos una plataforma de destino.');
      return;
    }
    setStreaming(true);
  }

  return (
    <div style={s.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={s.modal}>
        {/* Close */}
        <button style={s.closeBtn} onClick={onClose}>×</button>

        <div style={s.modalHeader}>
          <div style={s.liveIcon}>
            <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: 'currentColor' }}>
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" fill="#fff" />
            </svg>
          </div>
          <div>
            <h2 style={s.modalTitle}>Configurar Transmisión</h2>
            <p style={s.modalSub}>Tu escena será transmitida en tiempo real. Selecciona los destinos.</p>
          </div>
        </div>

        {/* Platform select */}
        <div style={s.platforms}>
          {/* Twitch */}
          <button
            style={{ ...s.platformBtn, ...(platforms.twitch ? s.platformBtnActive : {}) }}
            onClick={() => togglePlatform('twitch')}
          >
            <svg style={{ color: '#9146FF', width: 32, height: 32 }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
            <span style={s.platformName}>Twitch</span>
            <span style={{ ...s.platformStatus, color: twitchConnected || platforms.twitch ? '#10b981' : '#666' }}>
              {twitchConnected ? 'Conectado' : platforms.twitch ? 'Seleccionado' : 'Añadir cuenta'}
            </span>
          </button>

          {/* YouTube */}
          <button
            style={{ ...s.platformBtn, ...(platforms.youtube ? s.platformBtnActive : {}) }}
            onClick={() => togglePlatform('youtube')}
          >
            <svg style={{ color: '#FF0000', width: 32, height: 32 }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span style={s.platformName}>YouTube</span>
            <span style={{ ...s.platformStatus, color: youtubeConnected || platforms.youtube ? '#10b981' : '#666' }}>
              {youtubeConnected ? 'Conectado' : platforms.youtube ? 'Seleccionado' : 'Añadir cuenta'}
            </span>
          </button>
        </div>

        {/* Fields */}
        <div style={s.field}>
          <label style={s.label}>Título del Stream</label>
          <input
            type="text"
            value={streamTitle}
            onChange={(e) => setStreamTitle(e.target.value)}
            style={s.input}
            placeholder="Ej: ¡Jugando con amigos!"
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Categoría / Juego</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={s.input}
            placeholder="Ej: Valorant, Just Chatting…"
          />
        </div>

        {/* Start button */}
        {!streaming ? (
          <button style={s.startBtn} onClick={handleStart}>
            <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: 'currentColor' }}>
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" fill="#fff" />
            </svg>
            ¡EMPEZAR A TRANSMITIR!
          </button>
        ) : (
          <div style={s.liveStatus}>
            <span style={s.liveDot} />
            TRANSMITIENDO EN VIVO
            <button style={s.stopBtn} onClick={() => { setStreaming(false); onClose(); }}>Detener</button>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 },
  modal: { position: 'relative', background: 'linear-gradient(135deg,#0f0f0f 0%,#1a1225 100%)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '16px', padding: '32px', width: '480px', maxWidth: '95vw', boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 40px rgba(139,92,246,0.1)' },
  closeBtn: { position: 'absolute', top: '14px', right: '16px', background: 'transparent', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer', lineHeight: 1 },
  modalHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' },
  liveIcon: { width: '44px', height: '44px', background: 'linear-gradient(135deg,#dc2626,#ef4444)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: '0 4px 15px rgba(239,68,68,0.4)' },
  modalTitle: { margin: 0, fontSize: '20px', fontWeight: 700, color: '#fff' },
  modalSub: { margin: '4px 0 0', fontSize: '13px', color: '#888' },
  platforms: { display: 'flex', gap: '12px', marginBottom: '20px' },
  platformBtn: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '14px 10px', background: '#1a1a1a', border: '2px solid #2a2a2a', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', color: 'inherit' },
  platformBtnActive: { borderColor: '#8b5cf6', background: 'rgba(139,92,246,0.1)', boxShadow: '0 0 20px rgba(139,92,246,0.2)' },
  platformName: { fontWeight: 600, fontSize: '14px', color: '#e0e0e0' },
  platformStatus: { fontSize: '11px' },
  field: { marginBottom: '14px' },
  label: { display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' },
  input: { width: '100%', padding: '10px 12px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  startBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', marginTop: '8px', background: 'linear-gradient(135deg,#dc2626,#ef4444)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '15px', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(239,68,68,0.4)', letterSpacing: '0.5px', transition: 'all 0.2s' },
  liveStatus: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '10px', color: '#ef4444', fontWeight: 700, fontSize: '14px', marginTop: '8px' },
  liveDot: { width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' },
  stopBtn: { marginLeft: 'auto', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', fontSize: '12px', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' },
};
