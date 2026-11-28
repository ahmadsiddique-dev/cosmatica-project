import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  userName: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken) => 
        set({ user, accessToken, isAuthenticated: true }),
      clearAuth: () => 
        set({ user: null, accessToken: null, isAuthenticated: false }),
      setAccessToken: (accessToken) => 
        set({ accessToken }),
    }),
    { name: "auth-storage" }
  )
);