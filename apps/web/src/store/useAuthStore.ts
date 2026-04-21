'use client';

import { create } from 'zustand';
import type { User, UserRole } from '@coaching-ops/types';

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_COOKIE_KEY = 'authToken';

export interface AuthStoreState {
  token: string | null;
  user: User | null;
  role: UserRole | null;
  hydrated: boolean;
  hydrate: () => void;
  login: (payload: { token: string; user: User }) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

function writeAuthCookie(token: string | null) {
  if (typeof document === 'undefined') {
    return;
  }

  if (token) {
    document.cookie = `${AUTH_COOKIE_KEY}=${token}; path=/; SameSite=Lax`;
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; Max-Age=0; SameSite=Lax`;
}

function readStoredToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

function persistToken(token: string | null) {
  if (typeof window !== 'undefined') {
    if (token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  writeAuthCookie(token);
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  token: null,
  user: null,
  role: null,
  hydrated: false,
  hydrate: () => {
    const token = readStoredToken();
    set({
      token,
      role: get().user?.role ?? null,
      hydrated: true,
    });
  },
  login: ({ token, user }) => {
    persistToken(token);
    set({ token, user, role: user.role, hydrated: true });
  },
  setUser: (user) => set({ user, role: user?.role ?? null }),
  setToken: (token) => {
    persistToken(token);
    set({ token });
  },
  logout: () => {
    persistToken(null);
    set({ token: null, user: null, role: null, hydrated: true });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('coaching-ops:logout'));
    }
  },
  isAuthenticated: () => Boolean(get().token),
}));

export { AUTH_COOKIE_KEY, AUTH_TOKEN_KEY };
