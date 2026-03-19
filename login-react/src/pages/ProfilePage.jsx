import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession.js';

const TCONFIG = {
  twitch: {
    clientId: '3vlxzg9k070ro6yiodwmg1xsm4wx6q',
    get redirectUri() { return window.location.origin + '/profile'; },
    authUrl: 'https://id.twitch.tv/oauth2/authorize',
    scopes: 'channel:manage:broadcast user:read:email',
  },
  google: {
    clientId: '802649125974-llidquj3ciubf9tnl5tj6383hmksv5n4.apps.googleusercontent.com',
    get redirectUri() { return window.location.origin + '/profile'; },
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: 'https://www.googleapis.com/auth/youtube.force-ssl',
  },
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { session, logout } = useSession();

  const [username, setUsername] = useState('GamerUriel');
  const [bio, setBio] = useState('Apasionado por los videojuegos y el streaming. ¡Acompáñame en mis aventuras!');
  const [displayName, setDisplayName] = useState(session?.name || 'Uriel (Usuario)');
  const [displayBio, setDisplayBio] = useState('Streamer de fin de semana • Creador de contenido');
  const [photoUrl, setPhotoUrl] = useState(
    session?.picture ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  );
  const [saveLabel, setSaveLabel] = useState('Guardar Cambios');
  const [twitchConnected, setTwitchConnected] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const photoInputRef = useRef(null);

  // On mount: handle OAuth token redirect + read stored statuses
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    const state = params.get('state');

    if (token) {
      if (state === 'twitch') {
        localStorage.setItem('token_twitch', token);
      } else {
        localStorage.setItem('token_google', token);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    setTwitchConnected(!!localStorage.getItem('token_twitch'));
    setYoutubeConnected(!!localStorage.getItem('token_google'));
  }, []);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) setPhotoUrl(URL.createObjectURL(file));
  }

  function handleSave() {
    if (username.trim()) setDisplayName(`${username.trim()} (Usuario)`);
    if (bio.trim()) setDisplayBio(bio.trim());
    setSaveLabel('¡Guardado!');
    setTimeout(() => setSaveLabel('Guardar Cambios'), 2000);
  }

  function handleTwitch() {
    if (twitchConnected) {
      localStorage.removeItem('token_twitch');
      setTwitchConnected(false);
    } else {
      const p = new URLSearchParams({
        client_id: TCONFIG.twitch.clientId,
        redirect_uri: TCONFIG.twitch.redirectUri,
        response_type: 'token',
        scope: TCONFIG.twitch.scopes,
        state: 'twitch',
      });
      window.location.href = `${TCONFIG.twitch.authUrl}?${p}`;
    }
  }

  function handleYouTube() {
    if (youtubeConnected) {
      localStorage.removeItem('token_google');
      setYoutubeConnected(false);
    } else {
      const p = new URLSearchParams({
        client_id: TCONFIG.google.clientId,
        redirect_uri: TCONFIG.google.redirectUri,
        response_type: 'token',
        scope: TCONFIG.google.scopes,
        state: 'google',
      });
      window.location.href = `${TCONFIG.google.authUrl}?${p}`;
    }
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <svg viewBox="0 0 24 24">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
            <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
          </svg>
          StreamMaker
        </a>
        <div className="nav-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            <svg viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Dashboard
          </button>
          <div className="user-avatar" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            <img src={photoUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        </div>
      </nav>

      <div className="profile-layout">
        <div className="glass-panel profile-card">

          {/* Header */}
          <div className="profile-header">
            <div className="profile-photo" style={{ backgroundImage: `url('${photoUrl}')` }}>
              <input type="file" ref={photoInputRef} accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
              <div className="photo-edit-btn" title="Cambiar foto" onClick={() => photoInputRef.current?.click()}>
                <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
            </div>
            <div className="profile-info">
              <h1>{displayName}</h1>
              <p>{displayBio}</p>
              <div className="profile-stats">
                <div className="stat-item"><span className="stat-value">1.2K</span><span className="stat-label">Seguidores</span></div>
                <div className="stat-item"><span className="stat-value">4</span><span className="stat-label">Proyectos Activos</span></div>
                <div className="stat-item"><span className="stat-value">120h</span><span className="stat-label">Horas Transmitidas</span></div>
              </div>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="settings-section">
            {/* Personal Info */}
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--brand-color)' }}>Información Personal</h3>
              <div className="input-group">
                <label>Nombre de Usuario</label>
                <input type="text" className="input-control" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Correo Electrónico</label>
                <input type="email" className="input-control" defaultValue={session?.email || 'usuario@ejemplo.com'} />
              </div>
              <div className="input-group">
                <label>Biografía</label>
                <textarea className="input-control" rows="3" style={{ resize: 'none' }} value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </div>

            {/* Linked Accounts */}
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--brand-color)' }}>Cuentas Vinculadas</h3>

              <div className="social-login" style={{ marginBottom: '1rem' }}>
                {/* Twitch */}
                <div className="btn-social" style={{ justifyContent: 'space-between', paddingRight: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <svg style={{ color: '#9146FF', width: 24, height: 24 }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                    </svg>
                    <span style={{ fontWeight: 500 }}>{twitchConnected ? 'Twitch (Conectado ✓)' : 'Twitch'}</span>
                  </div>
                  <button
                    className={`btn ${twitchConnected ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    onClick={handleTwitch}
                  >
                    {twitchConnected ? 'Desvincular' : 'Vincular'}
                  </button>
                </div>

                {/* YouTube */}
                <div
                  className="btn-social"
                  style={{
                    justifyContent: 'space-between', paddingRight: '1.5rem',
                    background: youtubeConnected ? 'transparent' : 'rgba(0,0,0,0.2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: youtubeConnected ? 'var(--text-main)' : 'var(--text-muted)' }}>
                    <svg style={{ width: 24, height: 24, color: '#FF0000' }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span style={{ fontWeight: 500 }}>{youtubeConnected ? 'YouTube (Conectado ✓)' : 'YouTube'}</span>
                  </div>
                  <button
                    className={`btn ${youtubeConnected ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    onClick={handleYouTube}
                  >
                    {youtubeConnected ? 'Desvincular' : 'Vincular'}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                <button
                  className="btn btn-primary"
                  style={saveLabel === '¡Guardado!' ? { background: 'var(--success-color)' } : {}}
                  onClick={handleSave}
                >
                  {saveLabel}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

