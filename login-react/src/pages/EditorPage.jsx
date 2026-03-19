import { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import Sidebar from '../components/layout/Sidebar';
import Canvas from '../components/layout/Canvas';
import StreamModal from './StreamModal';

export default function EditorPage() {
  const [streamOpen, setStreamOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a', overflow: 'hidden' }}>
      <TopBar onOpenStream={() => setStreamOpen(true)} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Canvas />
      </div>
      {streamOpen && <StreamModal onClose={() => setStreamOpen(false)} />}
    </div>
  );
}
