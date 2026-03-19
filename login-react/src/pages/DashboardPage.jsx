import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession.js';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { session, logout } = useSession();

  function handleLogout() {
    logout();
    navigate('/');
  }

  function openEditor(templateName) {
    if (templateName) localStorage.setItem('sm_template', templateName);
    navigate('/editor');
  }

  const displayName = session?.name?.split(' ')[0] || 'Creador';
  const avatarSrc =
    session?.picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.name || 'U')}&background=6366f1&color=fff`;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#050913', color: '#f8fafc', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>

      {/* ── SIDEBAR ── */}
      <aside style={styles.sidebar}>
        {/* Logo */}
        <div style={styles.sidebarLogo} onClick={() => navigate('/dashboard')} title="Dashboard">
          <VideoIcon />
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, width: '100%' }}>
          <SidebarItem icon={<DashboardIcon />} label="Dashboard" active onClick={() => navigate('/dashboard')} />
          <SidebarItem icon={<FolderIcon />}    label="Proyectos"  onClick={() => navigate('/editor')} />
          <SidebarItem icon={<TemplateIcon />}  label="Plantillas" onClick={() => openEditor()} />
          <SidebarItem icon={<LinkIcon />}      label="Conexiones" onClick={() => navigate('/profile')} />
        </nav>

        {/* Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
          <SidebarItem icon={<SettingsIcon />} label="Ajustes" onClick={() => navigate('/profile')} />
          <SidebarItem icon={<LogoutIcon />}   label="Salir"   onClick={handleLogout} />
          <div
            style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.12)', overflow: 'hidden', cursor: 'pointer', marginTop: '0.25rem' }}
            onClick={() => navigate('/profile')}
          >
            <img src={avatarSrc} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: 0, left: '25%', width: 600, height: 300, background: 'rgba(99,102,241,0.07)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', transform: 'translateY(-50%)' }} />

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 2.5rem', position: 'relative', zIndex: 1 }}>

          {/* ── HERO ── */}
          <section style={styles.heroPanel}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                Bienvenido de vuelta a tu Estudio, <span style={{ color: '#818cf8' }}>{displayName}</span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: 560 }}>
                Tu centro de control centralizado para gestionar escenas, organizar streams profesionales y descubrir nuevas plantillas de transmisión.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button style={styles.btnOutline} onClick={() => openEditor()}>
                <SparklesIcon /> Explorar Plantillas
              </button>
              <button style={styles.btnPrimary} onClick={() => openEditor('nuevo')}>
                <PlusIcon /> Nuevo Proyecto
              </button>
            </div>
          </section>

          {/* ── TRANSMISIONES ── */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Tus Transmisiones</h2>
              <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Ver todos</button>
            </div>
            <div style={styles.grid4}>
              <ProjectCard title="Torneo FPS Finals"        date="Actualizado hace 2 horas"  status="ready" onOpen={() => openEditor('Torneo FPS Finals')} />
              <ProjectCard title="Podcast #42 - Frontend"   date="Actualizado hace 3 días"   status="draft" onOpen={() => openEditor('Podcast #42')} />
              <ProjectCard title="Lanzamiento Producto Live" date="Actualizado hace 1 semana" status="draft" onOpen={() => openEditor('Lanzamiento')} />
            </div>
          </section>

          {/* ── KITS ── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <LayersIcon color="#6366f1" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Kits de Escenas</h2>
            </div>
            <div style={styles.grid4}>
              <KitCard icon={<GamepadIcon color="#a78bfa" />} title="Kit Gaming Neon"           subtitle="Overlay Completo"        onOpen={() => openEditor('Gaming Neon')} />
              <KitCard icon={<MicIcon color="#818cf8" />}     title="Kit Entrevista Minimalista" subtitle="2 Personas + Chat"       onOpen={() => openEditor('Entrevista')} />
              <KitCard icon={<MonitorIcon color="#2dd4bf" />} title="Presentación Tech"          subtitle="Webcam + Slides"         onOpen={() => openEditor('Presentacion Tech')} />
              <KitCard icon={<TemplateIcon color="#fb923c" />} title="Just Chatting Cozy"        subtitle="Escena principal cálida"  onOpen={() => openEditor('Just Chatting')} />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

/* ── Styles object ── */
const styles = {
  sidebar: {
    width: 80,
    borderRight: '1px solid rgba(255,255,255,0.06)',
    background: '#080c16',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem 0',
    flexShrink: 0,
    zIndex: 20,
  },
  sidebarLogo: {
    width: 44,
    height: 44,
    background: '#4f46e5',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
  },
  heroPanel: {
    background: 'linear-gradient(135deg, #111827 0%, #0d1117 100%)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 18,
    padding: '2rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    gap: '1.5rem',
    boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.7rem 1.4rem',
    background: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
    transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
  },
  btnOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.7rem 1.4rem',
    background: 'rgba(99,102,241,0.08)',
    color: '#818cf8',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.25rem',
  },
};

/* ── Sub-components ── */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.3rem', cursor: 'pointer', width: '100%', padding: '0.6rem 0',
      }}
    >
      <div style={{
        padding: '0.6rem',
        borderRadius: 10,
        color: active ? '#818cf8' : '#475569',
        background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
        transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <span style={{ fontSize: 10, fontWeight: 600, color: active ? '#818cf8' : '#475569', letterSpacing: '0.05em' }}>
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ title, date, status, onOpen }) {
  const isReady = status === 'ready';
  return (
    <div
      onClick={onOpen}
      style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
    >
      {/* Preview area */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#090d18', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <MonitorIcon color="#1e293b" size={36} />
        {/* Badge */}
        {isReady ? (
          <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 10px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 8, fontSize: 10, fontWeight: 700, color: '#34d399', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, background: '#34d399', borderRadius: '50%', boxShadow: '0 0 8px rgba(52,211,153,0.8)' }} />
            LISTO PARA LIVE
          </div>
        ) : (
          <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em' }}>
            BORRADOR
          </div>
        )}
      </div>
      {/* Footer */}
      <div style={{ padding: '0.9rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f1f5f9', marginBottom: 3 }}>{title}</div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>{date}</div>
        </div>
        <span style={{ color: '#475569', fontSize: 18, cursor: 'pointer' }}>⋮</span>
      </div>
    </div>
  );
}

function KitCard({ icon, title, subtitle, onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '1rem',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        gap: '0.9rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
    >
      <div style={{ width: 44, height: 44, background: '#090d18', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>{subtitle}</div>
      </div>
    </div>
  );
}

/* ── Simple SVG Icon components ── */
function VideoIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
      <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
    </svg>
  );
}
function DashboardIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function FolderIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function TemplateIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}
function LinkIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function SettingsIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function LogoutIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function SparklesIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <path d="M5 14l.7 2.3L8 17l-2.3.7L5 20l-.7-2.3L2 17l2.3-.7L5 14z" />
    </svg>
  );
}
function PlusIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function LayersIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
function GamepadIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" />
      <circle cx="15" cy="11" r="1" fill={color} stroke="none" /><circle cx="17" cy="13" r="1" fill={color} stroke="none" />
      <path d="M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
    </svg>
  );
}
function MicIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
function MonitorIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
