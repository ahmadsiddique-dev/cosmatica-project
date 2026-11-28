import axios from "axios";

import { API_URL, api } from "./api";
import type { User } from "@/store/useAuthStore";

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}

export async function loginRequest(
  payload: LoginPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function signupRequest(
  payload: SignupPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/signup", payload);
  return data;
}

/**
 * Restores the session using the httpOnly refresh cookie.
 * Uses plain axios so it never goes through the auth interceptor.
 */
export async function refreshSession(): Promise<RefreshResponse> {
  const { data } = await axios.post<RefreshResponse>(
    `${API_URL}/api/v1/auth/refresh`,
    {},
    { withCredentials: true }
  );
  return data;
}

export async function fetchMe(): Promise<User> {
  const { data } = await api.get<{ user: User }>("/auth/me");
  return data.user;
}

export async function logoutRequest(): Promise<void> {
  await api.post("/auth/logout");
}
