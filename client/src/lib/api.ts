import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/store/useAuthStore";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/**
 * Shared axios instance for every authenticated request.
 *
 * - Sends cookies (refresh token) with every request.
 * - Attaches `Authorization: Bearer <accessToken>` automatically.
 * - On a 401 it refreshes the access token once and retries the request.
 */
export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// Shared promise so several parallel 401s only trigger one refresh call.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  try {
    // Use a plain axios call here to avoid the interceptor loop.
    const { data } = await axios.post<{ accessToken: string }>(
      `${API_URL}/api/v1/auth/refresh`,
      {},
      { withCredentials: true }
    );

    useAuthStore.getState().setAccessToken(data.accessToken);
    return data.accessToken;
  } catch {
    useAuthStore.getState().clearAuth();
    return null;
  }
}

// These endpoints must never trigger a refresh attempt.
const SKIP_REFRESH = ["/auth/login", "/auth/signup", "/auth/refresh"];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | RetriableRequestConfig
      | undefined;
    const status = error.response?.status;
    const url = originalRequest?.url ?? "";

    const shouldRefresh =
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !SKIP_REFRESH.some((path) => url.includes(path));

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    refreshPromise ??= refreshAccessToken().finally(() => {
      refreshPromise = null;
    });

    const accessToken = await refreshPromise;

    if (!accessToken) {
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return api(originalRequest);
  }
);
