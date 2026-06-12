"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  visible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <div
      className={`fixed bottom-8 right-8 z-[1000] rounded-xl border border-lime-400/50 bg-neutral-900 px-6 py-4 text-sm text-white transition-all duration-400 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0 pointer-events-none"
      }`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {message}
    </div>
  );
}
