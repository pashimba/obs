// src/store/useCanvasStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type {
  CanvasElement,
  ElementType,
  Position,
  CanvasState,
  HistoryState,
  CameraElement,
  BoxElement,
  ChatElement,
  AlertElement,
  TextElement,
} from "../types/CanvasTypes";

interface CanvasStore extends CanvasState {
  // Acciones básicas
  addElement: (type: ElementType, position?: Position) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  removeElements: (ids: string[]) => void;
  duplicateElement: (id: string) => void;

  // Selección
  selectElement: (id: string | null, multiSelect?: boolean) => void;
  selectAll: () => void;
  clearSelection: () => void;

  // Posición y orden
  moveElement: (id: string, position: Position) => void;
  resizeElement: (id: string, size: { width: number; height: number }) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;

  // Grid
  toggleGrid: () => void;
  toggleSnapToGrid: () => void;
  setGridSize: (size: number) => void;

  // Zoom
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;

  // Historial (Undo/Redo)
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Utilidades
  getElementById: (id: string) => CanvasElement | undefined;
  getSelectedElements: () => CanvasElement[];
}

const DEFAULT_SIZE = {
  text: { width: 200, height: 60 },
  box: { width: 200, height: 150 },
  camera: { width: 320, height: 240 },
  screen: { width: 640, height: 360 },
  mic: { width: 200, height: 80 },
  chat: { width: 300, height: 400 },
  alert: { width: 300, height: 100 },
};

const DEFAULT_POSITION = { x: 100, y: 100 };

const createElement = (
  type: ElementType,
  position: Position = DEFAULT_POSITION,
): CanvasElement => {
  const baseProps = {
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
    case "text":
      return {
        ...baseProps,
        type: "text",
        content: "Doble clic para editar",
        fontSize: 16,
        fontFamily: "Inter, sans-serif",
        color: "#ffffff",
        backgroundColor: "transparent",
        alignment: "left",
        fontWeight: "normal",
      } as TextElement;

    case "box":
      return {
        ...baseProps,
        type: "box",
        backgroundColor: "#4a2c6d",
        borderColor: "#8b5cf6",
        borderWidth: 2,
        borderRadius: 8,
        opacity: 1,
      } as BoxElement;

    case "camera":
      return {
        ...baseProps,
        type: "camera",
        isActive: true,
        isMuted: false,
        mirror: false,
      } as CameraElement;

    case "chat":
      return {
        ...baseProps,
        type: "chat",
        platform: "mock",
        showAvatars: true,
        messageCount: 50,
      } as ChatElement;

    case "alert":
      return {
        ...baseProps,
        type: "alert",
        alertType: "follower",
        duration: 5,
        animation: "fade",
      } as AlertElement;

    default:
      return {
        ...baseProps,
        type: type as any,
        backgroundColor: "#4a2c6d",
        borderColor: "#8b5cf6",
        borderWidth: 2,
        borderRadius: 8,
        opacity: 1,
      } as BoxElement;
  }
};

export const useCanvasStore = create<CanvasStore>()(
  devtools((set, get) => {
    // Historial
    const history: HistoryState = {
      past: [],
      present: {
        elements: [],
        selectedIds: [],
        scale: 1,
        gridEnabled: true,
        snapToGrid: true,
        gridSize: 20,
      },
      future: [],
    };

    return {
      // Estado inicial
      elements: [],
      selectedIds: [],
      scale: 1,
      gridEnabled: true,
      snapToGrid: true,
      gridSize: 20,
      canUndo: false,
      canRedo: false,

      // Agregar elemento
      addElement: (type, position) => {
        const newElement = createElement(type, position);
        set((state) => ({
          elements: [...state.elements, newElement],
          selectedIds: [newElement.id],
        }));
      },

      // Actualizar elemento
      // Actualizar elemento - Versión con any
      updateElement: (id, updates) => {
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, ...(updates as any) } : el,
          ),
        }));
      },

      // Eliminar elemento
      removeElement: (id) => {
        set((state) => ({
          elements: state.elements.filter((el) => el.id !== id),
          selectedIds: state.selectedIds.filter(
            (selectedId) => selectedId !== id,
          ),
        }));
      },

      // Eliminar múltiples elementos
      removeElements: (ids) => {
        set((state) => ({
          elements: state.elements.filter((el) => !ids.includes(el.id)),
          selectedIds: state.selectedIds.filter((id) => !ids.includes(id)),
        }));
      },

      // Duplicar elemento
      duplicateElement: (id) => {
        const element = get().getElementById(id);
        if (!element) return;

        const newElement = {
          ...element,
          id: uuidv4(),
          position: {
            x: element.position.x + 20,
            y: element.position.y + 20,
          },
          name: `${element.name} (copia)`,
        };

        set((state) => ({
          elements: [...state.elements, newElement],
          selectedIds: [newElement.id],
        }));
      },

      // Seleccionar elemento
      selectElement: (id, multiSelect = false) => {
        if (!id) {
          set({ selectedIds: [] });
          return;
        }

        set((state) => ({
          selectedIds: multiSelect
            ? state.selectedIds.includes(id)
              ? state.selectedIds.filter((selectedId) => selectedId !== id)
              : [...state.selectedIds, id]
            : [id],
        }));
      },

      // Seleccionar todo
      selectAll: () => {
        set((state) => ({
          selectedIds: state.elements.map((el) => el.id),
        }));
      },

      // Limpiar selección
      clearSelection: () => {
        set({ selectedIds: [] });
      },

      // Mover elemento
      moveElement: (id, position) => {
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, position } : el,
          ),
        }));
      },

      // Redimensionar elemento
      resizeElement: (id, size) => {
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, size } : el,
          ),
        }));
      },

      // Traer al frente
      bringToFront: (id) => {
        const maxZIndex = Math.max(...get().elements.map((el) => el.zIndex));
        get().updateElement(id, { zIndex: maxZIndex + 1 });
      },

      // Enviar al fondo
      sendToBack: (id) => {
        const minZIndex = Math.min(...get().elements.map((el) => el.zIndex));
        get().updateElement(id, { zIndex: minZIndex - 1 });
      },

      // Grid
      toggleGrid: () => {
        set((state) => ({ gridEnabled: !state.gridEnabled }));
      },

      toggleSnapToGrid: () => {
        set((state) => ({ snapToGrid: !state.snapToGrid }));
      },

      setGridSize: (size) => {
        set({ gridSize: size });
      },

      // Zoom
      zoomIn: () => {
        set((state) => ({ scale: Math.min(state.scale + 0.1, 2) }));
      },

      zoomOut: () => {
        set((state) => ({ scale: Math.max(state.scale - 0.1, 0.5) }));
      },

      resetZoom: () => {
        set({ scale: 1 });
      },

      // Undo/Redo (implementación básica)
      undo: () => {
        // Implementar lógica de undo
      },

      redo: () => {
        // Implementar lógica de redo
      },

      // Utilidades
      getElementById: (id) => {
        return get().elements.find((el) => el.id === id);
      },

      getSelectedElements: () => {
        const { elements, selectedIds } = get();
        return elements.filter((el) => selectedIds.includes(el.id));
      },
    };
  }),
);
