"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Sucursal } from "../models/Pedido.Schema";
import { supabase } from "../lib/supabaseClient";

interface AuthContextType {
  sucursal: Sucursal | null;
  isAuthenticated: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "lgx_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sucursal, setSucursal] = useState<Sucursal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setSucursal(data);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Error al cargar sesión:", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const passkey = Number(code);
      if (!Number.isFinite(passkey)) {
        setError("Código inválido. Verifique e intente nuevamente.");
        setIsLoading(false);
        return false;
      }

      const { data, error: fetchError } = await supabase
        .from("sucursales")
        .select("id, name, passkey")
        .eq("passkey", passkey)
        .single();

      if (fetchError || !data) {
        setError("Código inválido. Verifique e intente nuevamente.");
        setIsLoading(false);
        return false;
      }

      const foundSucursal = data as Sucursal;
      setSucursal(foundSucursal);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foundSucursal));
      setIsLoading(false);
      return true;
    } catch (e) {
      console.error("Error al validar código:", e);
      setError("Error al validar código. Intente nuevamente.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setSucursal(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ sucursal, isAuthenticated, login, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
