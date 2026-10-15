"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearSession,
  getSessionUser,
  getToken,
  homeForRole,
  type Role,
  type SessionUser,
} from "@/lib/auth";

/**
 * Redirects to the login page when there is no session, and to the user's own
 * portal when their role is not allowed here. `user` is null until verified.
 */
export function useRequireRole(allowedRoles: Role[]) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const rolesKey = allowedRoles.join(",");

  useEffect(() => {
    const token = getToken();
    const sessionUser = getSessionUser();

    if (!token || !sessionUser) {
      clearSession();
      router.replace("/");
      return;
    }

    if (!rolesKey.split(",").includes(sessionUser.role)) {
      router.replace(homeForRole(sessionUser.role));
      return;
    }

    // Reading the session from storage is an external-system sync
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(sessionUser);
  }, [router, rolesKey]);

  return { user, ready: user !== null };
}
