// src/components/layout/Topbar.tsx
import { useCanvasStore } from "../store/useCanvasStore";
import { useState } from "react";

const Topbar = () => {
  const { scale, zoomIn, zoomOut, resetZoom, undo, redo, canUndo, canRedo } =
    useCanvasStore();
  const [projectName, setProjectName] = useState("Mi Proyecto");

  return (
    <div style={styles.topbar}>
      {/* Logo y proyecto */}
      <div style={styles.leftSection}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🎬</span>
          <span style={styles.logoText}>OBS Web Studio</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.projectInfo}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={styles.projectInput}
          />
          <span style={styles.projectStatus}>● Editando</span>
        </div>
      </div>

      {/* Controles de edición */}
      <div style={styles.centerSection}>
        <button
          style={{ ...styles.iconButton, opacity: canUndo ? 1 : 0.5 }}
          onClick={undo}
          disabled={!canUndo}
          title="Deshacer (Ctrl+Z)"
        >
          ↩
        </button>
        <button
          style={{ ...styles.iconButton, opacity: canRedo ? 1 : 0.5 }}
          onClick={redo}
          disabled={!canRedo}
          title="Rehacer (Ctrl+Y)"
        >
          ↪
        </button>
        <div style={styles.divider} />
        <button
          style={styles.iconButton}
          onClick={() => {}}
          title="Guardar (Ctrl+S)"
        >
          💾
        </button>
        <button style={styles.iconButton} onClick={() => {}} title="Publicar">
          🚀
        </button>
      </div>

      {/* Controles de zoom y vista */}
      <div style={styles.rightSection}>
        <div style={styles.zoomControls}>
          <button style={styles.zoomButton} onClick={zoomOut} title="Alejar">
            −
          </button>
          <span style={styles.zoomLevel}>{Math.round(scale * 100)}%</span>
          <button style={styles.zoomButton} onClick={zoomIn} title="Acercar">
            +
          </button>
          <button
            style={styles.zoomReset}
            onClick={resetZoom}
            title="Reset zoom"
          >
            ↺
          </button>
        </div>
        <div style={styles.divider} />
        <div style={styles.userMenu}>
          <div style={styles.avatar}>
            <span>👤</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  topbar: {
    height: "60px",
    background: "linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 100%)",
    color: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    borderBottom: "1px solid #2a2a2a",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "16px",
    fontWeight: "600",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    background: "linear-gradient(135deg, #8b5cf6, #d8b4fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  projectInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  projectInput: {
    background: "#1e1e1e",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    color: "#e0e0e0",
    padding: "6px 12px",
    fontSize: "14px",
    width: "200px",
    outline: "none",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  projectStatus: {
    fontSize: "12px",
    color: "#10b981",
  },
  centerSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    color: "#e0e0e0",
    fontSize: "20px",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  divider: {
    width: "1px",
    height: "30px",
    background: "#2a2a2a",
  },
  zoomControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#1e1e1e",
    borderRadius: "6px",
    padding: "4px",
  },
  zoomButton: {
    background: "#2a2a2a",
    border: "none",
    color: "#e0e0e0",
    width: "28px",
    height: "28px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  zoomLevel: {
    fontSize: "13px",
    fontWeight: "500",
    minWidth: "50px",
    textAlign: "center" as const,
  },
  zoomReset: {
    background: "transparent",
    border: "none",
    color: "#888",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  userMenu: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #4a2c6d, #6b4b8c)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "2px solid transparent",
  } as React.CSSProperties,
};

// Hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .topbar-icon-button:hover {
    background: #2a2a2a;
  }
  .topbar-project-input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  .topbar-zoom-button:hover {
    background: #333333;
  }
  .topbar-zoom-reset:hover {
    color: #8b5cf6;
  }
  .topbar-avatar:hover {
    border-color: #8b5cf6;
    transform: scale(1.05);
  }
`;
document.head.appendChild(styleSheet);

export default Topbar;
