"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to your account"
      />

      <form onSubmit={handleLogin} className="space-y-4" onSelect={() => setError(null)}>
        <AuthField id="email" label="Email" type="email" placeholder="you@example.com" required={true} />
        <AuthField id="password" label="Password" type="password" placeholder="********" required={true} />

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Sign In
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <AuthFooter
        text="Don't have an account?"
        linkText="Create one"
        href="/register"
      />
    </AuthLayout>
  );
}