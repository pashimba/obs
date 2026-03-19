import { useState, useCallback, useRef } from 'react';

export function useToast() {
  const [toast, setToast] = useState({ msg: '', type: 'ok', visible: false });
  const timerRef = useRef(null);

  const showToast = useCallback((msg, type = 'ok') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ msg, type, visible: true });
    timerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3500);
  }, []);

  return { toast, showToast };
}
