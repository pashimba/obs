import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession.js';
import { useToast } from '../hooks/useToast.js';

/* ═══════════════════════
   CONFIGURACIÓN
   ═══════════════════════ */
const CONFIG = {
  GOOGLE_CLIENT_ID: '260789164552-g97pg4682kt3e1ic2dt1od17qiqlr1vl.apps.googleusercontent.com',
  TWITCH_CLIENT_ID: 'TU_TWITCH_CLIENT_ID',
  get REDIRECT_URI() {
    return window.location.origin + window.location.pathname;
  },
};

/* ═══════════════
   HELPER: JWT decode (sin librería)
   ═══════════════ */
function decodeJWT(token) {
  return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
}

/* ═══════════════
   SUBCOMPONENTES
   ═══════════════ */

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="brand">
        <svg viewBox="0 0 24 24">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
          <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
        </svg>
        StreamMaker
      </a>
    </nav>
  );
}

function Toast({ toast }) {
  const icon = toast.type === 'ok' ? '✓' : toast.type === 'err' ? '✗' : 'ℹ';
  const bg =
    toast.type === 'ok'
      ? { background: '#0d2b20', borderColor: 'rgba(16,185,129,0.4)' }
      : toast.type === 'err'
      ? { background: '#2b0d0d', borderColor: 'rgba(239,68,68,0.4)' }
      : {};
  return (
    <div className={`toast${toast.visible ? ' show' : ''}`} style={bg}>
      <span className="toast-icon">{icon}</span>
      <span>{toast.msg}</span>
    </div>
  );
}

function SessionBanner({ session, onLogout }) {
  const navigate = useNavigate();
  if (!session) return null;
  const avatarSrc =
    session.picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(session.name)}&background=6366f1&color=fff`;

  return (
    <div className="session-banner">
      <img className="session-avatar" src={avatarSrc} alt="Avatar" />
      <div className="session-name">{session.name}</div>
      <div className="session-provider">· Conectado con {session.provider}</div>
      <button className="btn-dashboard" onClick={() => navigate('/dashboard')}>
        Ir al Dashboard →
      </button>
      <button className="btn-logout" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

function LoginForm({ onShowToast, onSaveSession, onGuestLogin }) {
  const googleBtnRef = useRef(null);
  const [twitchLoading, setTwitchLoading] = useState(false);
  const navigate = useNavigate();

  /* ── Inicializar Google GSI ── */
  useEffect(() => {
    function init() {
      if (typeof google === 'undefined') {
        setTimeout(init, 500);
        return;
      }
      google.accounts.id.initialize({
        client_id: CONFIG.GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangular',
        width: 376,
        text: 'continue_with',
        locale: 'es',
      });
    }
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleGoogleResponse(response) {
    if (!response?.credential) {
      onShowToast('No se pudo completar el inicio de sesión con Google', 'err');
      return;
    }
    try {
      const payload = decodeJWT(response.credential);
      onSaveSession('Google', payload.name || payload.email, payload.email || '', payload.picture || '');
      onShowToast(`¡Bienvenido, ${(payload.name || payload.email).split(' ')[0]}!`, 'ok');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (e) {
      onShowToast('Error al procesar tu cuenta de Google', 'err');
      console.error(e);
    }
  }

  function loginWithYouTube() {
    const params = new URLSearchParams({
      client_id: CONFIG.GOOGLE_CLIENT_ID,
      redirect_uri: CONFIG.REDIRECT_URI,
      response_type: 'token id_token',
      scope: 'openid profile email https://www.googleapis.com/auth/youtube.readonly',
      nonce: Math.random().toString(36).slice(2),
      prompt: 'select_account',
    });
    sessionStorage.setItem('sm_oauth_provider', 'YouTube');
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString();
  }

  function loginWithTwitch() {
    setTwitchLoading(true);
    const params = new URLSearchParams({
      client_id: CONFIG.TWITCH_CLIENT_ID,
      redirect_uri: CONFIG.REDIRECT_URI,
      response_type: 'token',
      scope: 'user:read:email',
      state: Math.random().toString(36).slice(2),
    });
    sessionStorage.setItem('sm_oauth_provider', 'Twitch');
    window.location.href = 'https://id.twitch.tv/oauth2/authorize?' + params.toString();
  }

  function handleGuest() {
    onShowToast('Entrando como invitado…', 'info');
    onGuestLogin();
  }

  return (
    <div id="login-form-area">
      <div className="divider">Inicia sesión con</div>

      <div className="social-login">
        {/* Google */}
        <div id="google-btn-wrapper" ref={googleBtnRef} />

        {/* Twitch */}
        <button
          className={`btn-social btn-twitch${twitchLoading ? ' loading-btn' : ''}`}
          onClick={loginWithTwitch}
          disabled={twitchLoading}
        >
          {twitchLoading ? (
            <span className="spinner" />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
          )}
          {twitchLoading ? 'Conectando con Twitch…' : 'Continuar con Twitch'}
        </button>

        {/* YouTube */}
        <button className="btn-social btn-youtube" onClick={loginWithYouTube}>
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Continuar con YouTube (Google)
        </button>
      </div>

      {/* Separador invitado */}
      <div className="divider">o</div>

      <button className="btn-guest" onClick={handleGuest}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Entrar como Invitado
      </button>

      <p className="oauth-notice">
        Al iniciar sesión aceptas los <a href="#">Términos de Servicio</a> y la{' '}
        <a href="#">Política de Privacidad</a>.<br />
        No almacenamos contraseñas. Tu sesión es gestionada por el proveedor elegido.
      </p>
    </div>
  );
}

/* ═══════════════
   COMPONENTE PRINCIPAL
   ═══════════════ */
export default function LoginPage() {
  const navigate = useNavigate();
  const { session, saveSession, logout, refreshSession } = useSession();
  const { toast, showToast } = useToast();

  /* ── Manejar redirect OAuth al montar ── */
  useEffect(() => {
    async function handleOAuthRedirect() {
      const hash = window.location.hash.substring(1);
      const search = window.location.search.substring(1);
      const params = new URLSearchParams(hash || search);
      const provider = sessionStorage.getItem('sm_oauth_provider');

      if (!provider) return;

      const accessToken = params.get('access_token');
      const idToken = params.get('id_token');

      window.history.replaceState({}, document.title, window.location.pathname);
      sessionStorage.removeItem('sm_oauth_provider');

      if (!accessToken && !idToken) return;

      showToast('Verificando tu cuenta…', 'info');

      try {
        if (provider === 'Twitch' && accessToken) {
          const res = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Client-Id': CONFIG.TWITCH_CLIENT_ID,
            },
          });
          if (!res.ok) throw new Error('Twitch API error: ' + res.status);
          const data = await res.json();
          const user = data.data[0];
          saveSession('Twitch', user.display_name, user.email || '', user.profile_image_url || '');
          showToast(`¡Bienvenido, ${user.display_name}!`, 'ok');
          setTimeout(() => navigate('/dashboard'), 1200);
        } else if (provider === 'YouTube' && idToken) {
          const payload = decodeJWT(idToken);
          saveSession('YouTube (Google)', payload.name || payload.email, payload.email || '', payload.picture || '');
          showToast(`¡Bienvenido, ${payload.name || payload.email}!`, 'ok');
          setTimeout(() => navigate('/dashboard'), 1200);
        } else if (provider === 'YouTube' && accessToken && !idToken) {
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: 'Bearer ' + accessToken },
          });
          const user = await res.json();
          saveSession('YouTube (Google)', user.name || user.email, user.email || '', user.picture || '');
          showToast(`¡Bienvenido, ${user.name || user.email}!`, 'ok');
          setTimeout(() => navigate('/dashboard'), 1200);
        }
      } catch (err) {
        console.error('OAuth redirect error:', err);
        showToast('Error al verificar tu cuenta. Intenta de nuevo.', 'err');
      }
    }

    handleOAuthRedirect().then(() => refreshSession());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleLogout() {
    logout();
    showToast('Sesión cerrada', 'info');
  }

  function handleGuestLogin() {
    saveSession('Invitado', 'Invitado', '', '');
    setTimeout(() => navigate('/dashboard'), 900);
  }

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="glass-panel auth-card">

          <div className="auth-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="2">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
              <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
            </svg>
          </div>

          <h2>Bienvenido de vuelta</h2>
          <p>Inicia sesión con tu cuenta preferida para acceder a tu estudio.</p>

          {/* Banner sesión activa */}
          {session && <SessionBanner session={session} onLogout={handleLogout} />}

          {/* Formulario (se oculta cuando hay sesión) */}
          {!session && (
            <LoginForm onShowToast={showToast} onSaveSession={saveSession} onGuestLogin={handleGuestLogin} />
          )}
        </div>
      </div>

      <Toast toast={toast} />
    </>
  );
}
