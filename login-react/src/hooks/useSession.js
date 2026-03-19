import { useState, useCallback } from 'react';

function readSession() {
  try {
    return JSON.parse(localStorage.getItem('sm_session'));
  } catch {
    return null;
  }
}

export function useSession() {
  const [session, setSession] = useState(() => readSession());

  const saveSession = useCallback((provider, name, email, picture) => {
    const s = { provider, name, email, picture, ts: Date.now() };
    localStorage.setItem('sm_session', JSON.stringify(s));
    setSession(s);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sm_session');
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }
    setSession(null);
  }, []);

  const refreshSession = useCallback(() => {
    setSession(readSession());
  }, []);

  return { session, saveSession, logout, refreshSession };
}
