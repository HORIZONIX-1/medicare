"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const DEMO_ACCOUNTS = [
  {
    role: "DOCTOR",
    email: "doctor@example.com",
    label: "Doctor",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="login-role-icon-svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        <circle cx="12" cy="8" r="3" />
        <path strokeLinecap="round" d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" />
      </svg>
    ),
    desc: "Patient profiles & consultations",
    color: "role-doctor",
  },
  {
    role: "RECEPTIONIST",
    email: "reception@example.com",
    label: "Receptionist",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="login-role-icon-svg">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path strokeLinecap="round" d="M8 2v4M16 2v4M3 10h18" />
        <path strokeLinecap="round" d="M8 14h4M8 17h6" />
      </svg>
    ),
    desc: "Queue management & check-ins",
    color: "role-receptionist",
  },
  {
    role: "DISPENSER",
    email: "dispenser@example.com",
    label: "Pharmacist",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="login-role-icon-svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        <path strokeLinecap="round" d="M12 12v6M9 15h6" />
      </svg>
    ),
    desc: "Prescriptions & inventory",
    color: "role-dispenser",
  },
  {
    role: "ADMIN",
    email: "admin@example.com",
    label: "Admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="login-role-icon-svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    desc: "System management & audits",
    color: "role-admin",
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
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        router.push("/admin");
      } else if (user.role === "DOCTOR") {
        router.push("/doctor/dashboard");
      } else if (user.role === "RECEPTIONIST") {
        router.push("/receptionist/dashboard");
      } else if (user.role === "DISPENSER" || user.role === "PHARMACIST") {
        router.push("/dispenser");
      } else {
        router.push("/admin/dashboard"); // Assuming admin, else fallback
      }
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
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .header-main,
        .footer {
          display: none !important;
        }

        .main-content {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .root-body {
          overflow: hidden;
        }

        .login-root {
          min-height: 100dvh;
          height: 100dvh;
          display: flex;
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          background: radial-gradient(circle at 12% 20%, #0b233c 0%, #071426 42%, #040b16 100%);
          overflow: hidden;
        }

        /* ── LEFT PANEL ── */
        .login-left {
          display: none;
          flex: 1;
          position: relative;
          background: linear-gradient(135deg, #061326 0%, #0a1f3c 55%, #0f2f58 100%);
          overflow: hidden;
        }
        @media (min-width: 1024px) { .login-left { display: flex; flex-direction: column; justify-content: center; align-items: center; } }

        /* Animated gradient orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .orb-1 { width: 480px; height: 480px; background: radial-gradient(circle, #0ea5e9, #0369a1); top: -120px; left: -120px; animation-delay: 0s; }
        .orb-2 { width: 360px; height: 360px; background: radial-gradient(circle, #14b8a6, #0d9488); bottom: -80px; right: -80px; animation-delay: 3s; }
        .orb-3 { width: 240px; height: 240px; background: radial-gradient(circle, #6366f1, #4f46e5); top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: 1.5s; }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }
        .orb-3 { animation: orbFloat3 8s ease-in-out infinite; }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50% { transform: translate(-50%,-52%) scale(1.06); }
        }

        /* Grid lines decoration */
        .login-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ECG / pulse line */
        .ecg-line {
          position: absolute;
          bottom: 80px;
          left: 0; right: 0;
          opacity: 0.18;
        }
        .ecg-path {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: ecgDraw 3s ease forwards 0.8s;
        }
        @keyframes ecgDraw {
          to { stroke-dashoffset: 0; }
        }

        .login-left-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 1.25rem;
          max-width: 380px;
        }

        .login-brand-icon {
          width: 80px; height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 48px rgba(14,165,233,0.4), 0 0 96px rgba(14,165,233,0.15);
          animation: iconPulse 3s ease-in-out infinite;
        }
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 48px rgba(14,165,233,0.4), 0 0 96px rgba(14,165,233,0.15); }
          50% { box-shadow: 0 0 64px rgba(14,165,233,0.6), 0 0 128px rgba(14,165,233,0.25); }
        }

        .login-brand-title {
          font-family: 'Sora', sans-serif;
          font-size: 2.1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 50%, #5eead4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .login-brand-sub {
          font-size: 0.875rem;
          color: #64748b;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .login-stats {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1.5rem;
        }
        .login-stat {
          text-align: center;
        }
        .login-stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #38bdf8, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .login-stat-label {
          font-size: 0.7rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
          margin-top: 0.15rem;
        }
        .stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.06);
          margin: 4px 0;
          align-self: stretch;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          text-align: left;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #94a3b8;
          font-size: 0.875rem;
        }
        .feature-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #14b8a6);
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(14,165,233,0.5);
        }

        /* ── RIGHT PANEL ── */
        .login-right {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
          padding: clamp(0.75rem, 2vh, 1.5rem) clamp(1rem, 3.6vw, 1.75rem);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 1024px) { .login-right { width: 520px; flex-shrink: 0; padding: clamp(1rem, 3vh, 2rem) clamp(1.5rem, 2.8vw, 2.5rem); } }

        /* Subtle bg glow */
        .login-right::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(14,165,233,0.06), transparent 70%);
          pointer-events: none;
        }
        .login-right::after {
          content: '';
          position: absolute;
          bottom: -150px; left: -150px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(20,184,166,0.05), transparent 70%);
          pointer-events: none;
        }

        .login-form-wrapper {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
          background: linear-gradient(165deg, rgba(15, 34, 59, 0.68) 0%, rgba(9, 20, 36, 0.88) 100%);
          border: 1px solid rgba(125, 211, 252, 0.16);
          border-radius: 22px;
          padding: clamp(0.9rem, 2vh, 1.5rem) clamp(0.9rem, 2.4vw, 1.35rem);
          box-shadow: 0 24px 80px rgba(2, 8, 23, 0.55), inset 0 1px 0 rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
        }

        /* Mobile logo */
        .login-mobile-brand {
          text-align: center;
          margin-bottom: 1.2rem;
        }
        @media (min-width: 1024px) { .login-mobile-brand { display: none; } }
        .login-mobile-icon {
          width: 56px; height: 56px;
          margin: 0 auto 0.875rem;
          background: linear-gradient(135deg, #0ea5e9, #14b8a6);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 32px rgba(14,165,233,0.35);
        }

        /* Form header */
        .login-form-header {
          margin-bottom: 1.15rem;
        }
        .login-form-greeting {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0ea5e9;
          margin-bottom: 0.5rem;
        }
        .login-form-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.4rem, 1.5vw + 1rem, 1.7rem);
          font-weight: 800;
          color: #f0f9ff;
          letter-spacing: -0.025em;
          margin-bottom: 0.375rem;
        }
        .login-form-desc {
          font-size: 0.875rem;
          color: #94a3b8;
        }

        /* Role selector */
        .role-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.45rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) { .role-grid { grid-template-columns: repeat(4, 1fr); } }
        .role-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          padding: 0.58rem 0.45rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
        }
        .role-card:hover {
          border-color: rgba(14,165,233,0.25);
          background: rgba(14,165,233,0.06);
          transform: translateY(-2px);
        }
        .role-card.active {
          border-color: rgba(14,165,233,0.5);
          background: rgba(14,165,233,0.1);
          box-shadow: 0 0 20px rgba(14,165,233,0.12), inset 0 0 20px rgba(14,165,233,0.04);
          transform: translateY(-2px);
        }
        .role-card.active.role-doctor    { border-color: rgba(14,165,233,0.5); background: rgba(14,165,233,0.1); box-shadow: 0 0 20px rgba(14,165,233,0.15); }
        .role-card.active.role-receptionist { border-color: rgba(20,184,166,0.5); background: rgba(20,184,166,0.1); box-shadow: 0 0 20px rgba(20,184,166,0.15); }
        .role-card.active.role-dispenser  { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.1); box-shadow: 0 0 20px rgba(99,102,241,0.15); }
        .role-card.active.role-admin      { border-color: rgba(245,158,11,0.5); background: rgba(245,158,11,0.08); box-shadow: 0 0 20px rgba(245,158,11,0.12); }

        .role-card-active-dot {
          position: absolute;
          top: 6px; right: 6px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #0ea5e9;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .role-card.active .role-card-active-dot { opacity: 1; }
        .role-card.active.role-receptionist .role-card-active-dot { background: #14b8a6; }
        .role-card.active.role-dispenser .role-card-active-dot    { background: #6366f1; }
        .role-card.active.role-admin .role-card-active-dot        { background: #f59e0b; }

        .login-role-icon-svg {
          width: 22px; height: 22px;
          color: #475569;
          transition: color 0.2s;
        }
        .role-card.active .login-role-icon-svg { color: #0ea5e9; }
        .role-card.active.role-receptionist .login-role-icon-svg { color: #14b8a6; }
        .role-card.active.role-dispenser .login-role-icon-svg    { color: #818cf8; }
        .role-card.active.role-admin .login-role-icon-svg        { color: #f59e0b; }

        .role-card-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #cbd5e1;
          transition: color 0.2s;
          text-align: center;
          line-height: 1.2;
        }
        .role-card.active .role-card-label { color: #7dd3fc; }
        .role-card.active.role-receptionist .role-card-label { color: #5eead4; }
        .role-card.active.role-dispenser .role-card-label    { color: #a5b4fc; }
        .role-card.active.role-admin .role-card-label        { color: #fcd34d; }

        /* Keyboard focus for accessibility */
        .role-card:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
          border-color: rgba(14,165,233,0.4);
        }

        /* Divider */
        .form-divider {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .form-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .form-divider-text {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #334155;
        }

        /* Form fields */
        .form-field { margin-bottom: 0.8rem; }
        .form-field-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }
        .form-input-wrap { position: relative; }
        .form-input-icon {
          position: absolute;
          left: 14px; top: 50%; transform: translateY(-50%);
          color: #334155;
          width: 16px; height: 16px;
          pointer-events: none;
        }
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 0.72rem 1rem 0.72rem 2.65rem;
          font-size: 0.9rem;
          color: #e2e8f0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none;
          transition: all 0.2s ease;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
        }
        .form-input::placeholder { color: #94a3b8; }
        .form-input:focus {
          border-color: rgba(14,165,233,0.5);
          background: rgba(14,165,233,0.04);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.12), inset 0 1px 2px rgba(0,0,0,0.1);
        }
        .form-input-toggle {
          position: absolute;
          right: 12px; top: 50%; transform: translateY(-50%);
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          padding: 4px;
          display: flex; align-items: center;
          transition: color 0.2s;
        }
        .form-input-toggle:hover { color: #94a3b8; }

        /* Error */
        .login-error {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.75rem 1rem;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          color: #fca5a5;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
          animation: fadeSlideIn 0.3s ease;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Submit button */
        .login-submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 0.78rem 1.35rem;
          border-radius: 12px;
          border: none;
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #0891b2 100%);
          box-shadow: 0 4px 24px rgba(14,165,233,0.35), 0 1px 3px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: all 0.25s ease;
          margin-top: 0.25rem;
          position: relative;
          overflow: hidden;
        }
        .login-submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0));
          opacity: 0;
          transition: opacity 0.2s;
        }
        .login-submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .login-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(14,165,233,0.45), 0 2px 6px rgba(0,0,0,0.3);
        }
        .login-submit-btn:active:not(:disabled) { transform: translateY(0); }
        .login-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Spinner */
        .btn-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer note */
        .login-footer-note {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          color: #94a3b8;
        }
        .login-footer-note svg { color: #0ea5e9; }
        .login-bottom-text {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.72rem;
          color: #94a3b8;
        }
        .login-bottom-text a {
          color: #0ea5e9;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .login-bottom-text a:hover { color: #38bdf8; }

        @media (max-height: 860px) {
          .feature-list,
          .login-stats {
            display: none;
          }

          .login-brand-sub {
            margin-bottom: 0;
          }
        }

        @media (max-height: 760px) {
          .login-form-header {
            margin-bottom: 0.8rem;
          }

          .role-grid {
            margin-bottom: 0.7rem;
          }

          .form-divider {
            margin-bottom: 0.7rem;
          }

          .form-field {
            margin-bottom: 0.65rem;
          }

          .login-footer-note,
          .login-bottom-text {
            display: none;
          }
        }

        @media (max-width: 420px) {
          .login-form-wrapper {
            border-radius: 18px;
            padding: 0.85rem;
          }

          .role-card-label {
            font-size: 0.61rem;
          }
        }
      `}</style>

      <div className="login-root">
        {/* ── LEFT BRANDING PANEL ── */}
        <div className="login-left">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="login-grid-lines" />

          {/* ECG pulse animation */}
          <svg className="ecg-line" viewBox="0 0 900 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              className="ecg-path"
              d="M0 40 L120 40 L140 40 L160 8 L180 72 L200 8 L220 72 L240 40 L280 40 L300 40 L320 40 L340 40 L360 8 L380 72 L400 8 L420 72 L440 40 L540 40 L560 40 L580 8 L600 72 L620 8 L640 72 L660 40 L900 40"
              stroke="url(#ecgGrad)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="ecgGrad" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                <stop offset="30%" stopColor="#0ea5e9" />
                <stop offset="70%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="login-left-content">
            {/* Icon */}
            <div className="login-brand-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="16" y="4" width="8" height="32" rx="4" fill="white" />
                <rect x="4" y="16" width="32" height="8" rx="4" fill="white" />
              </svg>
            </div>

            <h1 className="login-brand-title">MediCare</h1>
            <p className="login-brand-sub">Clinical Management System</p>

            <div className="feature-list">
              {[
                "Unified patient records and consultations",
                "Real-time queue, billing, and dispensing",
                "Role-based security with full audit tracking",
              ].map((f) => (
                <div className="feature-item" key={f}>
                  <span className="feature-dot" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="login-stats">
              <div className="login-stat">
                <div className="login-stat-num">4+</div>
                <div className="login-stat-label">Roles</div>
              </div>
              <div className="stat-divider" />
              <div className="login-stat">
                <div className="login-stat-num">256‑bit</div>
                <div className="login-stat-label">Encryption</div>
              </div>
              <div className="stat-divider" />
              <div className="login-stat">
                <div className="login-stat-num">99.9%</div>
                <div className="login-stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ── */}
        <div className="login-right">
          <div className="login-form-wrapper">
            {/* Mobile brand */}
            <div className="login-mobile-brand">
              <div className="login-mobile-icon">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <rect x="16" y="4" width="8" height="32" rx="4" fill="white" />
                  <rect x="4" y="16" width="32" height="8" rx="4" fill="white" />
                </svg>
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#e0f2fe", letterSpacing: "-0.02em" }}>MediCare</div>
              <div style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.25rem" }}>Clinical Management System</div>
            </div>

            {/* Header */}
            <div className="login-form-header">
              <div className="login-form-greeting">Secure Access Portal</div>
              <div className="login-form-title">Welcome back</div>
              <div className="login-form-desc">Select your role and sign in to continue.</div>
            </div>

            {/* Role Selector */}
            <div className="role-grid">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  title={acc.desc}
                  onClick={() => selectDemoAccount(acc.role, acc.email)}
                  className={`role-card ${acc.color} ${selectedRole === acc.role ? "active" : ""}`}
                >
                  <div className="role-card-active-dot" />
                  {acc.icon}
                  <span className="role-card-label">{acc.label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="form-divider">
              <div className="form-divider-line" />
              <span className="form-divider-text">Enter credentials</span>
              <div className="form-divider-line" />
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="form-field">
                <label htmlFor="login-email" className="form-field-label">Email Address</label>
                <div className="form-input-wrap">
                  <svg className="form-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSelectedRole(""); }}
                    className="form-input"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-field">
                <label htmlFor="login-password" className="form-field-label">Password</label>
                <div className="form-input-wrap">
                  <svg className="form-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="form-input-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="login-submit-btn"
              >
                {isLoading ? (
                  <>
                    <div className="btn-spinner" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Sign In to Portal
                  </>
                )}
              </button>
            </form>

            {/* Security badge */}
            <div className="login-footer-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>256-bit encrypted · HIPAA-compliant session</span>
            </div>

            <div className="login-bottom-text">
              Project Hope &mdash; MediCare v2.0 &nbsp;·&nbsp;{" "}
              <a href="#">Support</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
