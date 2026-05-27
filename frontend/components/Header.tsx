"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleRoleChange = (role: string) => {
    if (!user) return;
    const updated = { ...user, role };
    localStorage.setItem("user", JSON.stringify(updated));
    // reload to let app route and pages react to role change
    window.location.reload();
  };

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
        <a href="/" className="nav-link">Home</a>

        {user && Array.isArray(user.roles) && user.roles.length > 1 ? (
          <select
            value={user.role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="btn-ghost select-role"
          >
            {user.roles.map((r: string) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        ) : null}

        {user ? null : (
          <a href="/auth/login" className="btn btn-ghost">Sign in</a>
        )}
      </nav>
    </div>
  );
}
