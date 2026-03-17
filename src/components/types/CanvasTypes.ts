export type ElementType =
  | "text"
  | "box"
  | "camera"
  | "screen"
  | "mic"
  | "chat"
  | "alert";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BaseElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  rotation: number;
  zIndex: number;
  isSelected: boolean;
  isLocked: boolean;
  name: string;
}

export interface TextElement extends BaseElement {
  type: "text";
  content: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  alignment: "left" | "center" | "right";
  fontWeight: "normal" | "bold";
}

export interface BoxElement extends BaseElement {
  type: "box";
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  opacity: number;
}

export interface CameraElement extends BaseElement {
  type: "camera";
  deviceId?: string;
  isActive: boolean;
  isMuted: boolean;
  mirror: boolean;
}

export interface ScreenElement extends BaseElement {
  type: "screen";
  sourceId?: string;
  isSharing: boolean;
}

export interface MicElement extends BaseElement {
  type: "mic";
  deviceId?: string;
  isActive: boolean;
  volume: number;
}

export interface ChatElement extends BaseElement {
  type: "chat";
  platform?: "twitch" | "youtube" | "mock";
  showAvatars: boolean;
  messageCount: number;
}

export interface AlertElement extends BaseElement {
  type: "alert";
  alertType: "follower" | "donation" | "subscriber";
  duration: number;
  animation: "fade" | "slide" | "bounce";
}

export type CanvasElement =
  | TextElement
  | BoxElement
  | CameraElement
  | ScreenElement
  | MicElement
  | ChatElement
  | AlertElement;

export interface CanvasState {
  elements: CanvasElement[];
  selectedIds: string[];
  scale: number;
  gridEnabled: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

export interface HistoryState {
  past: CanvasState[];
  present: CanvasState;
  future: CanvasState[];
}
