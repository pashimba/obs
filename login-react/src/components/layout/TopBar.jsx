import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanvasStore } from '../../store/useCanvasStore';

const TopBar = ({ onOpenStream }) => {
  const { scale, zoomIn, zoomOut, resetZoom, undo, redo, canUndo, canRedo } = useCanvasStore();
  const [projectName, setProjectName] = useState('Mi Proyecto');
  const navigate = useNavigate();

  return (
    <div style={s.topbar}>
      {/* Left: logo + project */}
      <div style={s.left}>
        <div style={s.logo}>
          <span style={{ fontSize: 22 }}>🎬</span>
          <span style={s.logoText}>StreamMaker</span>
        </div>
        <div style={s.divider} />
        <div style={s.projInfo}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={s.projInput}
          />
          <span style={s.projStatus}>● Editando</span>
        </div>
      </div>

      {/* Center: edit controls */}
      <div style={s.center}>
        <button style={{ ...s.iconBtn, opacity: canUndo ? 1 : 0.4 }} onClick={undo} disabled={!canUndo} title="Deshacer">↩</button>
        <button style={{ ...s.iconBtn, opacity: canRedo ? 1 : 0.4 }} onClick={redo} disabled={!canRedo} title="Rehacer">↪</button>
        <div style={s.divider} />
        <button style={s.iconBtn} title="Guardar">💾</button>
      </div>

      {/* Right: zoom + stream + user */}
      <div style={s.right}>
        <div style={s.zoom}>
          <button style={s.zoomBtn} onClick={zoomOut}>−</button>
          <span style={s.zoomLevel}>{Math.round(scale * 100)}%</span>
          <button style={s.zoomBtn} onClick={zoomIn}>+</button>
          <button style={s.zoomReset} onClick={resetZoom} title="Reset zoom">↺</button>
        </div>
        <div style={s.divider} />
        <button
          style={s.streamBtn}
          onClick={onOpenStream}
        >
          <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: 'currentColor', stroke: 'none' }}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" fill="#fff" />
          </svg>
          INICIAR TRANSMISIÓN
        </button>
        <div style={s.divider} />
        <button
          style={s.logoutBtn}
          onClick={() => navigate('/')}
          title="Cerrar sesión"
        >
          👤 Salir
        </button>
      </div>
    </div>
  );
};

const s = {
  topbar: { height: '60px', background: 'linear-gradient(90deg,#0a0a0a 0%,#141414 100%)', color: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid #222', boxShadow: '0 2px 10px rgba(0,0,0,0.4)', flexShrink: 0 },
  left: { display: 'flex', alignItems: 'center', gap: '14px' },
  logo: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoText: { background: 'linear-gradient(135deg,#8b5cf6,#d8b4fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, fontSize: '16px' },
  divider: { width: '1px', height: '28px', background: '#2a2a2a' },
  projInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
  projInput: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '4px', color: '#e0e0e0', padding: '5px 10px', fontSize: '13px', width: '180px', outline: 'none' },
  projStatus: { fontSize: '11px', color: '#10b981' },
  center: { display: 'flex', alignItems: 'center', gap: '6px' },
  right: { display: 'flex', alignItems: 'center', gap: '12px' },
  iconBtn: { background: 'transparent', border: 'none', color: '#e0e0e0', fontSize: '18px', cursor: 'pointer', padding: '6px', borderRadius: '4px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  zoom: { display: 'flex', alignItems: 'center', gap: '6px', background: '#1a1a1a', borderRadius: '6px', padding: '4px 6px' },
  zoomBtn: { background: '#2a2a2a', border: 'none', color: '#e0e0e0', width: '26px', height: '26px', borderRadius: '4px', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  zoomLevel: { fontSize: '12px', fontWeight: 500, minWidth: '42px', textAlign: 'center', color: '#ccc' },
  zoomReset: { background: 'transparent', border: 'none', color: '#666', fontSize: '15px', cursor: 'pointer', padding: '2px' },
  streamBtn: { display: 'flex', alignItems: 'center', gap: '7px', background: 'linear-gradient(135deg,#dc2626,#ef4444)', border: 'none', color: '#fff', fontWeight: 700, fontSize: '12px', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', letterSpacing: '0.5px', boxShadow: '0 4px 15px rgba(239,68,68,0.35)', transition: 'all 0.2s' },
  logoutBtn: { background: 'transparent', border: 'none', color: '#888', fontSize: '12px', cursor: 'pointer', padding: '5px 8px', borderRadius: '4px' },
};

export default TopBar;
