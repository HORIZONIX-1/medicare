"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const DEMO_ACCOUNTS = [
  { role: "DOCTOR", email: "doctor@example.com", label: "Doctor Portal", icon: "🩺", desc: "Access patient profiles, consultation logs & register new patients." },
  { role: "RECEPTIONIST", email: "reception@example.com", label: "Receptionist", icon: "📋", desc: "Manage patient checks, queue status and registrations." },
  { role: "DISPENSER", email: "dispenser@example.com", label: "Pharmacy / Dispenser", icon: "💊", desc: "Prescription fulfillment and drug inventory controls." },
  { role: "ADMIN", email: "admin@example.com", label: "System Administrator", icon: "🔐", desc: "User creation, audits, and role-based permissions access." }
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("doctor@example.com");
  const [password, setPassword] = useState("password");
  const [selectedRole, setSelectedRole] = useState("DOCTOR");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      
      // Route based on role
      if (user.role === "DOCTOR") {
        router.push("/doctor/patients");
      } else if (user.role === "RECEPTIONIST") {
        router.push("/doctor/patients"); // Fallback for receptionist patients feature
      } else {
        router.push("/doctor/patients");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Invalid credentials or backend connection issue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-2xl shadow-lg shadow-indigo-500/20 mb-4 animate-bounce">
          <span className="text-3xl text-white">🏥</span>
        </span>
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-200 tracking-tight">
          MediCare Portal
        </h2>
        <p className="mt-2 text-sm text-indigo-300 max-w">
          Advanced Clinical & Patient Management Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 px-4 sm:px-0">
        
        {/* Quick Select Panel */}
        <div className="md:col-span-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span>⚡</span> Fast Demo Access
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Select an identity to automatically load credentials for seeded clinic members.
            </p>
            
            <div className="space-y-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => selectDemoAccount(acc.role, acc.email)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] flex items-center gap-4 ${
                    selectedRole === acc.role
                      ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10"
                      : "bg-slate-950/40 border-slate-800/50 hover:bg-slate-800/30 hover:border-slate-700"
                  }`}
                >
                  <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800">{acc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{acc.label}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{acc.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between">
            <span>Server status: Online (Port 4000)</span>
            <span>v1.2.0-stable</span>
          </div>
        </div>

        {/* Login Form Panel */}
        <div className="md:col-span-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-center">
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <span>🔑</span> Authentication
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Provide credentials manually or use the quick selection helper.
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            {errorMessage && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-300 font-medium">
                ⚠️ {errorMessage}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSelectedRole("");
                }}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="doctor@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all duration-200 transform hover:scale-[1.01] shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "SIGN IN TO PORTAL"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
