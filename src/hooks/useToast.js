// src/hooks/useToast.js
// Imperative toast queue used by the contact form. Auto-dismiss with type
// colors that always pair with text (no color-only status indicators).

import { useCallback, useState } from "react";

let nextId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast) => {
      const id = ++nextId;
      const item = {
        id,
        type: "info", // "info" | "success" | "error"
        duration: 5000,
        ...toast,
      };
      setToasts((list) => [...list, item]);
      if (item.duration > 0) {
        window.setTimeout(() => removeToast(id), item.duration);
      }
      return id;
    },
    [removeToast]
  );

  return { toasts, addToast, removeToast };
}

export default useToast;
