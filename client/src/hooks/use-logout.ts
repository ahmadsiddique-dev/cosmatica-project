"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { logoutRequest } from "@/lib/authApi";
import { useAuthStore } from "@/store/useAuthStore";

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // Even if the server call fails, clear the local session.
    } finally {
      clearAuth();
      router.replace("/login");
    }
  }, [clearAuth, router]);
}
