// src/lib/useLightboxKeys.js
// Shared keyboard handler for screenshot lightboxes / dialogs. Mounts a
// window keydown listener while `open` is true. Arrow keys call
// `onPrev` / `onNext`, Escape calls `onClose`. Reused by ScreenshotGallery
// and the new ScreenshotWall so the behaviour is consistent.

import { useEffect } from "react";

export function useLightboxKeys({ open, onPrev, onNext, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    if (typeof window === "undefined") return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (onClose) onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (onPrev) onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (onNext) onNext();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onPrev, onNext, onClose]);
}

export default useLightboxKeys;
