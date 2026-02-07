"use client";

import { useState } from "react";

interface LoginModalProps {
  onLogin: (code: string) => void;
  isLoading?: boolean;
  error?: string;
}

export function LoginModal({ onLogin, isLoading, error }: LoginModalProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onLogin(code);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Solo números
    if (value.length <= 6) {
      setCode(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Iniciar Sesión
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Ingrese el código de 6 dígitos de su sucursal
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={code}
              onChange={handleInputChange}
              placeholder="000000"
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={code.length !== 6 || isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {isLoading ? "Validando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Solicite su código al administrador del sistema
        </p>
      </div>
    </div>
  );
}
