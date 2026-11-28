import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  userName: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  /**
   * Kept in memory only. It is intentionally NOT persisted so that an XSS
   * cannot read it from localStorage. On reload it is restored from the
   * httpOnly refresh cookie via `/auth/refresh`.
   */
  accessToken: string | null;
  isAuthenticated: boolean;
  /** True while we try to restore the session from the refresh cookie. */
  isInitializing: boolean;
  setAuth: (user: User, accessToken: string) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitializing: true,
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
      setInitializing: (isInitializing) => set({ isInitializing }),
    }),
    {
      name: "auth-storage",
      // Never persist the access token.
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
