"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSessionUser, homeForRole, type SessionUser } from "@/lib/auth";

export default function Header() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getSessionUser());
  }, []);

  return (
    <div className="header-container">
      <div className="header-logo">
        <div className="logo-box">H</div>
        <div>
          <div className="logo-title">Project Hope</div>
          <div className="logo-subtitle">Medical records · modern UI</div>
        </div>
      </div>

      <nav className="header-nav">
        <Link href="/" className="nav-link">Home</Link>

        {user ? (
          <Link href={homeForRole(user.role)} className="btn btn-ghost">My portal</Link>
        ) : (
          <Link href="/" className="btn btn-ghost">Sign in</Link>
        )}
      </nav>
    </div>
  );
}
