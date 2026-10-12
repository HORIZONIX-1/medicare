"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * Open/close state for the off-canvas sidebar used below the desktop breakpoint.
 * Closes on navigation and Escape, and locks page scroll while open.
 */
export function useMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the drawer whenever the route changes (adjusting state during render)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return { open, toggle, close };
}

export function MenuButton({
  open,
  onClick,
  className = "shell-menu-btn",
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
    >
      {open ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}

export function NavBackdrop({ onClick, className = "shell-backdrop" }: { onClick: () => void; className?: string }) {
  return <div className={className} onClick={onClick} aria-hidden="true" />;
}
