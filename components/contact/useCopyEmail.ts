"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { contact } from "../../app/data/contact";

/** Copy the contact email; `copied` is true for a moment afterwards. Falls back to opening the mail app. */
export function useCopyEmail(duration = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), duration);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  }, [duration]);

  return { copied, copy };
}
