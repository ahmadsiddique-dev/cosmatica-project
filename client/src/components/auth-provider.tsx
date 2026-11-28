"use client";

import { useEffect } from "react";

import { refreshSession } from "@/lib/authApi";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Restores the session on every full page load.
 *
 * The access token lives in memory, so after a reload we exchange the
 * httpOnly refresh cookie for a fresh access token. While this runs,
 * `isInitializing` is true and protected routes show a loader.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const { accessToken, user } = await refreshSession();

        if (!cancelled) {
          useAuthStore.getState().setAuth(user, accessToken);
        }
      } catch {
        if (!cancelled) {
          useAuthStore.getState().clearAuth();
        }
      } finally {
        if (!cancelled) {
          useAuthStore.getState().setInitializing(false);
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}
