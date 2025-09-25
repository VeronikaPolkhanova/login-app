import { createContext, useContext, useState } from "react";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import {
  mockLogin,
  mockVerifyCode,
  type LoginResponse,
  type VerifyResponse,
} from "../api/mockAuth";

type Key = "login" | "auth";

type AuthContextType = {
  step: Key;
  setStep: (key: Key) => void;
  loginMutation: UseMutationResult<
    LoginResponse,
    Error,
    { email: string; password: string },
    unknown
  >;
  verifyMutation: UseMutationResult<
    VerifyResponse,
    Error,
    { code: string },
    unknown
  >;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Key>("login");

  const loginMutation = useMutation<
    LoginResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => mockLogin(email, password),
  });

  const verifyMutation = useMutation<VerifyResponse, Error, { code: string }>({
    mutationFn: ({ code }) => mockVerifyCode(code),
  });

  return (
    <AuthContext.Provider
      value={{ step, setStep, loginMutation, verifyMutation }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
