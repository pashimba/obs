import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_SIZE = {
  text:   { width: 200, height: 60 },
  box:    { width: 200, height: 150 },
  camera: { width: 320, height: 240 },
  screen: { width: 640, height: 360 },
  mic:    { width: 200, height: 80 },
  chat:   { width: 300, height: 400 },
  alert:  { width: 300, height: 100 },
};

const DEFAULT_POSITION = { x: 100, y: 100 };

function createElement(type, position = DEFAULT_POSITION) {
  const base = {
    id: uuidv4(),
    type,
    position,
    size: DEFAULT_SIZE[type] || DEFAULT_SIZE.box,
    rotation: 0,
    zIndex: Date.now(),
    isSelected: false,
    isLocked: false,
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${new Date().toLocaleTimeString()}`,
  };

  switch (type) {
    case 'text':
      return { ...base, content: 'Doble clic para editar', fontSize: 16, fontFamily: 'Inter, sans-serif', color: '#ffffff', backgroundColor: 'transparent', alignment: 'left', fontWeight: 'normal' };
    case 'box':
      return { ...base, backgroundColor: '#4a2c6d', borderColor: '#8b5cf6', borderWidth: 2, borderRadius: 8, opacity: 1 };
    case 'camera':
      return { ...base, isActive: true, isMuted: false, mirror: false };
    case 'chat':
      return { ...base, platform: 'mock', showAvatars: true, messageCount: 50 };
    case 'alert':
      return { ...base, alertType: 'follower', duration: 5, animation: 'fade' };
    default:
      return { ...base, backgroundColor: '#4a2c6d', borderColor: '#8b5cf6', borderWidth: 2, borderRadius: 8, opacity: 1 };
  }
}

export const useCanvasStore = create((set, get) => ({
  elements: [],
  selectedIds: [],
  scale: 1,
  gridEnabled: true,
  snapToGrid: true,
  gridSize: 20,
  canUndo: false,
  canRedo: false,

  addElement: (type, position) => {
    const el = createElement(type, position);
    set((state) => ({ elements: [...state.elements, el], selectedIds: [el.id] }));
  },

  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map((el) => el.id === id ? { ...el, ...updates } : el),
    }));
  },

  removeElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    }));
  },

  removeElements: (ids) => {
    set((state) => ({
      elements: state.elements.filter((el) => !ids.includes(el.id)),
      selectedIds: state.selectedIds.filter((id) => !ids.includes(id)),
    }));
  },

  duplicateElement: (id) => {
    const el = get().getElementById(id);
    if (!el) return;
    const newEl = { ...el, id: uuidv4(), position: { x: el.position.x + 20, y: el.position.y + 20 }, name: `${el.name} (copia)` };
    set((state) => ({ elements: [...state.elements, newEl], selectedIds: [newEl.id] }));
  },

  selectElement: (id, multiSelect = false) => {
    if (!id) { set({ selectedIds: [] }); return; }
    set((state) => ({
      selectedIds: multiSelect
        ? state.selectedIds.includes(id)
          ? state.selectedIds.filter((sid) => sid !== id)
          : [...state.selectedIds, id]
        : [id],
    }));
  },

  selectAll: () => set((state) => ({ selectedIds: state.elements.map((el) => el.id) })),
  clearSelection: () => set({ selectedIds: [] }),

  moveElement: (id, position) => {
    set((state) => ({
      elements: state.elements.map((el) => el.id === id ? { ...el, position } : el),
    }));
  },

  resizeElement: (id, size) => {
    set((state) => ({
      elements: state.elements.map((el) => el.id === id ? { ...el, size } : el),
    }));
  },

  bringToFront: (id) => {
    const maxZ = Math.max(...get().elements.map((el) => el.zIndex), 0);
    get().updateElement(id, { zIndex: maxZ + 1 });
  },

  sendToBack: (id) => {
    const minZ = Math.min(...get().elements.map((el) => el.zIndex), 0);
    get().updateElement(id, { zIndex: minZ - 1 });
  },

  toggleGrid: () => set((state) => ({ gridEnabled: !state.gridEnabled })),
  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
  setGridSize: (size) => set({ gridSize: size }),

  zoomIn: () => set((state) => ({ scale: Math.min(state.scale + 0.1, 2) })),
  zoomOut: () => set((state) => ({ scale: Math.max(state.scale - 0.1, 0.3) })),
  resetZoom: () => set({ scale: 1 }),

  undo: () => {},
  redo: () => {},

  getElementById: (id) => get().elements.find((el) => el.id === id),
  getSelectedElements: () => {
    const { elements, selectedIds } = get();
    return elements.filter((el) => selectedIds.includes(el.id));
  },
}));
