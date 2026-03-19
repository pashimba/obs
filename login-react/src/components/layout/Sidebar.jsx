import { useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';

const categories = {
  captura: {
    title: '📹 Captura',
    items: [
      { type: 'camera', label: 'Cámara',    icon: '🎥', color: '#8b5cf6' },
      { type: 'screen', label: 'Pantalla',  icon: '🖥️', color: '#a78bfa' },
      { type: 'mic',    label: 'Micrófono', icon: '🎤', color: '#c4b5fd' },
    ],
  },
  streaming: {
    title: '📱 Streaming',
    items: [
      { type: 'chat',  label: 'Chat',    icon: '💬', color: '#6d28d9' },
      { type: 'alert', label: 'Alertas', icon: '🔔', color: '#7c3aed' },
    ],
  },
  elementos: {
    title: '📦 Elementos',
    items: [
      { type: 'text', label: 'Texto', icon: '📝', color: '#9f7aea' },
      { type: 'box',  label: 'Caja',  icon: '⬜', color: '#b794f4' },
    ],
  },
};

const Sidebar = () => {
  const addElement = useCanvasStore((s) => s.addElement);
  const [activeCategory, setActiveCategory] = useState('captura');

  return (
    <div style={s.sidebar}>
      <div style={s.header}>
        <h2 style={s.title}><span>🎬</span> OBS Web</h2>
        <div style={s.version}>v1.0.0</div>
      </div>

      <div style={s.catRow}>
        {Object.keys(categories).map((key) => (
          <button
            key={key}
            style={{ ...s.catBtn, ...(activeCategory === key ? s.catBtnActive : {}) }}
            onClick={() => setActiveCategory(key)}
          >
            {categories[key].title}
          </button>
        ))}
      </div>

      <div style={s.items}>
        {categories[activeCategory].items.map((item) => (
          <button
            key={item.type}
            style={s.itemBtn}
            onClick={() => addElement(item.type)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${item.color}50`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <span style={s.icon}>{item.icon}</span>
            <span style={s.label}>{item.label}</span>
            <span style={s.badge}>+</span>
          </button>
        ))}
      </div>

      <div style={s.tools}>
        <h4 style={s.toolsTitle}>Herramientas</h4>
        <button style={s.toolBtn} onClick={() => useCanvasStore.getState().selectAll()}>🔲 Seleccionar todo</button>
        <button style={s.toolBtn} onClick={() => useCanvasStore.getState().clearSelection()}>❌ Limpiar selección</button>
        <hr style={{ border: 'none', borderTop: '1px solid #2a2a2a', margin: '8px 0' }} />
        <button
          style={{ ...s.toolBtn, color: '#ef4444' }}
          onClick={() => {
            const sel = useCanvasStore.getState().getSelectedElements();
            useCanvasStore.getState().removeElements(sel.map((e) => e.id));
          }}
        >
          🗑️ Eliminar seleccionados
        </button>
      </div>
    </div>
  );
};

const s = {
  sidebar: { width: '260px', background: 'linear-gradient(180deg, #0f0f0f 0%, #141414 100%)', color: '#e0e0e0', display: 'flex', flexDirection: 'column', height: '100%', borderRight: '1px solid #222', boxShadow: '4px 0 20px rgba(0,0,0,0.4)', flexShrink: 0 },
  header: { padding: '18px 16px', borderBottom: '1px solid #222', background: 'rgba(0,0,0,0.2)' },
  title: { fontSize: '18px', fontWeight: 600, margin: 0, background: 'linear-gradient(135deg,#8b5cf6,#d8b4fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '8px' },
  version: { fontSize: '11px', color: '#555', marginTop: '4px' },
  catRow: { display: 'flex', padding: '10px', gap: '4px', borderBottom: '1px solid #222' },
  catBtn: { flex: 1, padding: '6px 4px', background: 'transparent', border: 'none', color: '#888', fontSize: '11px', fontWeight: 500, cursor: 'pointer', borderRadius: '4px', transition: 'all 0.2s' },
  catBtnActive: { background: '#2a2a2a', color: '#8b5cf6' },
  items: { flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' },
  itemBtn: { display: 'flex', alignItems: 'center', padding: '10px 12px', background: '#1a1a1a', border: '1px solid #252525', borderRadius: '8px', color: '#e0e0e0', cursor: 'pointer', transition: 'all 0.2s', width: '100%' },
  icon: { fontSize: '18px', marginRight: '10px' },
  label: { flex: 1, textAlign: 'left', fontSize: '13px', fontWeight: 500 },
  badge: { fontSize: '16px', color: '#8b5cf6' },
  tools: { padding: '14px', borderTop: '1px solid #222', background: 'rgba(0,0,0,0.25)' },
  toolsTitle: { fontSize: '11px', color: '#555', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' },
  toolBtn: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '7px 10px', background: 'transparent', border: 'none', color: '#ccc', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.2s' },
};

export default Sidebar;
