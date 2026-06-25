"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface AuthState {
  email: string | null;
  credits: number;
  plan: string | null;
  loading: boolean;
  showLogin: boolean;
  login: (email: string, credits?: number) => void;
  logout: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  refreshCredits: () => void;
}

const AuthContext = createContext<AuthState>({
  email: null,
  credits: 0,
  plan: null,
  loading: true,
  showLogin: false,
  login: () => {},
  logout: () => {},
  openLogin: () => {},
  closeLogin: () => {},
  refreshCredits: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [credits, setCredits] = useState(0);
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.email) {
        setEmail(data.email);
        setCredits(data.credits || 0);
        setPlan(data.plan || null);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = useCallback((newEmail: string, newCredits?: number) => {
    setEmail(newEmail);
    if (newCredits !== undefined) setCredits(newCredits);
    setShowLogin(false);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setEmail(null);
    setCredits(0);
    setPlan(null);
  }, []);

  const openLogin = useCallback(() => setShowLogin(true), []);
  const closeLogin = useCallback(() => setShowLogin(false), []);
  const refreshCredits = useCallback(() => { fetchUser(); }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{ email, credits, plan, loading, showLogin, login, logout, openLogin, closeLogin, refreshCredits }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
