import { useState, useEffect } from 'react';
import { CreateMode } from './views/CreateMode';
import { ViewerMode } from './views/ViewerMode';
import type { HeartbeatState, ThemeId } from './lib/types';
import { getHeartbeatDataFromUrl } from './lib/urlUtils';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [view, setView] = useState<'create' | 'view'>('create');
  const [initialState, setInitialState] = useState<HeartbeatState | undefined>(undefined);

  useEffect(() => {
    const data = getHeartbeatDataFromUrl();

    if (data) {
      setInitialState({
        message: data.message || 'I love you',
        bpm: data.bpm || 60,
        themeId: (data.themeId as ThemeId) || 'rose',
        sender: data.sender || '',
        recipient: data.recipient || '',
      });
      setView('view');
    }
  }, []);

  return (
    <>
      <Analytics />
      {view === 'create' ? (
        <CreateMode initialState={initialState} />
      ) : (
        initialState && <ViewerMode state={initialState} />
      )}
    </>
  );
}

export default App
