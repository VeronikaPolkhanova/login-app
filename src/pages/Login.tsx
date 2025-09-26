import { useState } from "react";

import { Lock, UserRound } from "lucide-react";

import Page from "../components/Page";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginMutation, setStep } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.requires2FA) {
            setStep("auth");
          }
        },
      }
    );
  };

  return (
    <Page>
      <Logo className="mb-5 mt-5" />
      <h1 className="text-2xl font-semibold text-center mb-6">
        Sign in to your account to continue
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <UserRound className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loginMutation.isError && (
          <p className="text-red-500 text-sm">
            {(loginMutation.error as any).message || "Login failed"}
          </p>
        )}
        <Button
          type="submit"
          disabled={!email || !password || loginMutation.isPending}
        >
          Log in
        </Button>
      </form>
    </Page>
  );
};

export default Login;
