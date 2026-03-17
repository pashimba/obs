// src/components/layout/Sidebar.tsx
import { useCanvasStore } from "../store/useCanvasStore";
import type { ElementType } from "../types/CanvasTypes";
import { useState } from "react";

const Sidebar = () => {
  const addElement = useCanvasStore((s) => s.addElement);
  const [activeCategory, setActiveCategory] = useState<string>("captura");

  const categories = {
    captura: {
      title: "📹 Captura",
      items: [
        {
          type: "camera" as ElementType,
          label: "Cámara",
          icon: "🎥",
          color: "#8b5cf6",
        },
        {
          type: "screen" as ElementType,
          label: "Pantalla",
          icon: "🖥️",
          color: "#a78bfa",
        },
        {
          type: "mic" as ElementType,
          label: "Micrófono",
          icon: "🎤",
          color: "#c4b5fd",
        },
      ],
    },
    streaming: {
      title: "📱 Streaming",
      items: [
        {
          type: "chat" as ElementType,
          label: "Chat",
          icon: "💬",
          color: "#6d28d9",
        },
        {
          type: "alert" as ElementType,
          label: "Alertas",
          icon: "🔔",
          color: "#7c3aed",
        },
      ],
    },
    elementos: {
      title: "📦 Elementos",
      items: [
        {
          type: "text" as ElementType,
          label: "Texto",
          icon: "📝",
          color: "#9f7aea",
        },
        {
          type: "box" as ElementType,
          label: "Caja",
          icon: "⬜",
          color: "#b794f4",
        },
      ],
    },
  };

  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          <span style={styles.titleIcon}>🎬</span>
          OBS Web
        </h2>
        <div style={styles.version}>v1.0.0</div>
      </div>

      {/* Categorías */}
      <div style={styles.categories}>
        {Object.keys(categories).map((key) => (
          <button
            key={key}
            style={{
              ...styles.categoryButton,
              ...(activeCategory === key ? styles.categoryButtonActive : {}),
            }}
            onClick={() => setActiveCategory(key)}
          >
            {categories[key as keyof typeof categories].title}
          </button>
        ))}
      </div>

      {/* Items de la categoría activa */}
      <div style={styles.itemsContainer}>
        {categories[activeCategory as keyof typeof categories].items.map(
          (item) => (
            <button
              key={item.type}
              style={styles.itemButton}
              onClick={() => addElement(item.type)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${item.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={styles.itemIcon}>{item.icon}</span>
              <span style={styles.itemLabel}>{item.label}</span>
              <span style={styles.itemBadge}>+</span>
            </button>
          ),
        )}
      </div>

      {/* Panel de herramientas */}
      <div style={styles.toolsPanel}>
        <h4 style={styles.toolsTitle}>Herramientas</h4>
        <button
          style={styles.toolButton}
          onClick={() => useCanvasStore.getState().selectAll()}
        >
          <span>🔲</span> Seleccionar todo
        </button>
        <button
          style={styles.toolButton}
          onClick={() => useCanvasStore.getState().clearSelection()}
        >
          <span>❌</span> Limpiar selección
        </button>
        <div style={styles.divider} />
        <button
          style={{ ...styles.toolButton, color: "#ef4444" }}
          onClick={() => {
            const selected = useCanvasStore.getState().getSelectedElements();
            useCanvasStore.getState().removeElements(selected.map((s) => s.id));
          }}
        >
          <span>🗑️</span> Eliminar seleccionados
        </button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "280px",
    background: "linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)",
    color: "#e0e0e0",
    display: "flex",
    flexDirection: "column" as const,
    height: "calc(100vh - 60px)",
    borderRight: "1px solid #2a2a2a",
    boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #2a2a2a",
    background: "rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #8b5cf6, #d8b4fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as React.CSSProperties,
  titleIcon: {
    fontSize: "24px",
  },
  version: {
    fontSize: "12px",
    color: "#666",
    marginTop: "4px",
  },
  categories: {
    display: "flex",
    padding: "12px",
    gap: "4px",
    borderBottom: "1px solid #2a2a2a",
  },
  categoryButton: {
    flex: 1,
    padding: "8px",
    background: "transparent",
    border: "none",
    color: "#888",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  },
  categoryButtonActive: {
    background: "#2a2a2a",
    color: "#8b5cf6",
  },
  itemsContainer: {
    flex: 1,
    padding: "16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    overflowY: "auto" as const,
  },
  itemButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: "#1e1e1e",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    color: "#e0e0e0",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "100%",
    position: "relative" as const,
    overflow: "hidden",
  },
  itemIcon: {
    fontSize: "20px",
    marginRight: "12px",
  },
  itemLabel: {
    flex: 1,
    textAlign: "left" as const,
    fontSize: "14px",
    fontWeight: "500",
  },
  itemBadge: {
    fontSize: "18px",
    color: "#8b5cf6",
    opacity: 0,
    transform: "translateX(-10px)",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  toolsPanel: {
    padding: "16px",
    borderTop: "1px solid #2a2a2a",
    background: "rgba(0,0,0,0.3)",
  },
  toolsTitle: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "8px",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  },
  toolButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    padding: "8px 12px",
    background: "transparent",
    border: "none",
    color: "#e0e0e0",
    fontSize: "13px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  divider: {
    height: "1px",
    background: "#2a2a2a",
    margin: "8px 0",
  },
};

// Agregar hover effects con pseudo-clases
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .sidebar-item-button:hover .item-badge {
    opacity: 1;
    transform: translateX(0);
  }
  .sidebar-tool-button:hover {
    background: #2a2a2a;
  }
`;
document.head.appendChild(styleSheet);

export default Sidebar;
