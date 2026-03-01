"use client";

import { useEffect, useState } from "react";

type StatusType = "idle" | "saving" | "saved";

export function useAutoSaveDraft<T>(key: string, data: T) {
  const [status, setStatus] = useState<StatusType>("idle");

  useEffect(() => {
    if (!data) return;

    setStatus("saving");

    const timeout = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data));
      setStatus("saved");
    }, 800);

    return () => clearTimeout(timeout);
  }, [data, key]);

  const loadDraft = (): T | null => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  };

  const clearDraft = () => {
    localStorage.removeItem(key);
    setStatus("idle");
  };

  return {
    status,
    loadDraft,
    clearDraft,
  };
}
