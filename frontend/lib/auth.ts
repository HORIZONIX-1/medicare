export type Role = "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "DISPENSER";

export interface SessionUser {
  user_id?: number;
  id?: number;
  name: string;
  email: string;
  role: Role;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const ROLE_HOME: Record<Role, string> = {
  ADMIN: "/admin",
  DOCTOR: "/doctor/dashboard",
  RECEPTIONIST: "/receptionist/dashboard",
  DISPENSER: "/dispenser",
};

const isBrowser = () => typeof window !== "undefined";

export const getToken = (): string | null => {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const getSessionUser = (): SessionUser | null => {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
};

export const saveSession = (token: string, user: SessionUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // storage unavailable; nothing to clear
  }
};

export const homeForRole = (role?: string | null): string =>
  (role && ROLE_HOME[role as Role]) || "/";
