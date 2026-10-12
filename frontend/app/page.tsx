"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { homeForRole, saveSession } from "@/lib/auth";

const DEMO_ACCOUNTS = [
  {
    role: "DOCTOR",
    email: "doctor@example.com",
    label: "Doctor",
    desc: "Patient consultations & prescriptions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <circle cx="12" cy="8" r="3.2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
  },
  {
    role: "RECEPTIONIST",
    email: "reception@example.com",
    label: "Receptionist",
    desc: "Queue management & check-ins",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path strokeLinecap="round" d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    role: "DISPENSER",
    email: "dispenser@example.com",
    label: "Pharmacist",
    desc: "Drug dispensing & inventory",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    role: "ADMIN",
    email: "admin@example.com",
    label: "Admin",
    desc: "System management & user audit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("doctor@example.com");
  const [password, setPassword] = useState("password");
  const [selectedRole, setSelectedRole] = useState("DOCTOR");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const selectDemoAccount = (role: string, email: string) => {
    setSelectedRole(role);
    setEmail(email);
    setPassword("password");
    setErrorMessage("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      const home = homeForRole(user?.role);

      if (home === "/") {
        setErrorMessage("Your account does not have access to any portal.");
        return;
      }

      saveSession(token, user);
      router.push(home);
    } catch (error: unknown) {
      console.error(error);
      const apiError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(
        apiError.response?.data?.message ||
        "Invalid credentials or connection issue."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`

        html, body {
          margin: 0;
          padding: 0;
          height: 100vh;
          overflow: hidden !important;
          background: #090e17;
        }

        .header-main,
        .footer {
          display: none !important;
        }

        .main-content {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* ── Solid Dark Non-Scrolling Page Container ── */
        .login-page-root {
          height: 100vh;
          width: 100vw;
          max-height: 100vh;
          max-width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
          background: #090e17;
          position: relative;
          overflow: hidden !important;
          color: #f8fafc;
        }

        /* Outer Solid Panel Card */
        .portal-card {
          width: 100%;
          max-width: 820px;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 1.25rem;
          padding: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
        }

        /* Header Bar */
        .portal-header {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #1e293b;
        }

        .logo-box {
          width: 44px;
          height: 44px;
          border-radius: 0.75rem;
          background: #0ea5e9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .header-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .header-sub {
          font-size: 0.85rem;
          color: #0ea5e9;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* 2-Column Split: Left = Select User, Right = Enter Credentials */
        .split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        /* Column Headers */
        .col-title {
          font-size: 0.875rem;
          font-weight: 800;
          color: #0ea5e9;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem 0;
        }

        /* Left Column: Select User Buttons Stack */
        .user-list-stack {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .user-select-btn {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #1e293b;
          background: #131d31;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
        }

        .user-select-btn:hover {
          border-color: #0ea5e9;
          background: #1b2942;
        }

        .user-select-btn.active {
          border-color: #0ea5e9;
          background: #0e243a;
          box-shadow: 0 0 0 1px #0ea5e9;
        }

        .user-btn-icon {
          width: 36px;
          height: 36px;
          border-radius: 0.5rem;
          background: #1e293b;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-select-btn.active .user-btn-icon {
          background: #0ea5e9;
          color: #ffffff;
        }

        .user-btn-label {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .user-btn-desc {
          font-size: 0.8125rem;
          color: #cbd5e1;
          margin-top: 0.1rem;
        }

        .user-select-btn.active .user-btn-desc {
          color: #ffffff;
        }

        /* Right Column: Enter Credentials Form */
        .form-group {
          margin-bottom: 1rem;
        }

        .field-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.4rem;
        }

        .input-box-wrapper {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          width: 16px;
          height: 16px;
        }

        .solid-input {
          width: 100%;
          background: #131d31;
          border: 1px solid #1e293b;
          border-radius: 0.65rem;
          padding: 0.72rem 0.875rem 0.72rem 2.6rem;
          font-size: 0.9375rem;
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .solid-input:focus {
          border-color: #0ea5e9;
          background: #16233b;
        }

        .pass-toggle {
          position: absolute;
          right: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .pass-toggle:hover {
          color: #0ea5e9;
        }

        /* Solid Action Button */
        .solid-submit-btn {
          width: 100%;
          padding: 0.8rem 1.25rem;
          border-radius: 0.65rem;
          border: none;
          background: #0ea5e9;
          color: #ffffff;
          font-size: 0.9375rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
        }

        .solid-submit-btn:hover:not(:disabled) {
          background: #0284c7;
        }

        .solid-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-msg {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid #ef4444;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          color: #fca5a5;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        /* Bottom Security Badge */
        .security-footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: #64748b;
        }
        .security-footer svg {
          color: #0ea5e9;
        }

        @media (max-width: 640px) {
          .login-page-root {
            padding: 1rem;
            align-items: flex-start;
          }
          .portal-card {
            padding: 1.25rem;
          }
          .split-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .header-title {
            font-size: 1.35rem;
          }
        }
      `}</style>

      <div className="login-page-root">
        {/* Main Solid Panel Container */}
        <div className="portal-card">
          {/* Header Bar */}
          <div className="portal-header">
            <div className="logo-box">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                <rect x="16" y="4" width="8" height="32" rx="4" fill="white" />
                <rect x="4" y="16" width="32" height="8" rx="4" fill="white" />
              </svg>
            </div>
            <div>
              <h1 className="header-title">MediCare Portal</h1>
              <div className="header-sub">Clinical Management System</div>
            </div>
          </div>

          {/* 2-Column Split: Left = Select User, Right = Enter Credentials */}
          <div className="split-grid">
            
            {/* Left Column: Select User */}
            <div>
              <h2 className="col-title">1. Select User Role</h2>
              <div className="user-list-stack">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => selectDemoAccount(acc.role, acc.email)}
                    className={`user-select-btn ${selectedRole === acc.role ? "active" : ""}`}
                  >
                    <div className="user-btn-icon">
                      {acc.icon}
                    </div>
                    <div>
                      <div className="user-btn-label">{acc.label}</div>
                      <div className="user-btn-desc">{acc.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Enter Credentials */}
            <div>
              <h2 className="col-title">2. Enter Credentials</h2>

              {errorMessage && (
                <div className="error-msg">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleLogin}>
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email-field" className="field-label">Email Address</label>
                  <div className="input-box-wrapper">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                      id="email-field"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setSelectedRole(""); }}
                      className="solid-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password-field" className="field-label">Password</label>
                  <div className="input-box-wrapper">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      id="password-field"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="solid-input"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="pass-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} className="solid-submit-btn">
                  {isLoading ? "Authenticating..." : "Sign In To Portal →"}
                </button>
              </form>
            </div>

          </div>

          {/* Footer Security Badge */}
          <div className="security-footer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>256-bit SSL Encrypted &bull; HIPAA Compliant Session</span>
          </div>

        </div>
      </div>
    </>
  );
}
