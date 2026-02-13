import { useState, useEffect } from 'react';
import { CreateMode } from './views/CreateMode';
import { ViewerMode } from './views/ViewerMode';
import type { HeartbeatState, ThemeId } from './lib/types';

function App() {
  const [view, setView] = useState<'create' | 'view'>('create');
  const [initialState, setInitialState] = useState<HeartbeatState | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get('msg');
    const bpm = params.get('bpm');
    const theme = params.get('theme');
    const from = params.get('from');
    const to = params.get('to');

    if (msg || bpm || theme) {
      setInitialState({
        message: msg || 'I love you',
        bpm: bpm ? parseInt(bpm, 10) : 60,
        themeId: (theme as ThemeId) || 'classic',
        sender: from || '',
        recipient: to || '',
      });
      setView('view');
    }
  }, []);

  return (
    <>
      {view === 'create' ? (
        <CreateMode initialState={initialState} />
      ) : (
        initialState && <ViewerMode state={initialState} />
      )}
    </>
  );
}

export default App
