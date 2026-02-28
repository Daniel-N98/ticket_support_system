"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import SpinningLoadingIcon from "@/components/ui/SpinningLoadingIcon";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const loginRes = await signIn("credentials", { redirect: false, email: email.toLowerCase(), password });
    if (loginRes?.error) {
      setError("Invalid credentials.");
      setIsLoading(false);
      return;
    }
    router.push("/dashboard");
    setIsLoading(false);
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to your account"
      />

      <form onSubmit={handleLogin} className="space-y-4" onSelect={() => setError(null)}>
        <AuthField id="email" label="Email" type="email" placeholder="you@example.com" required={true} disabled={isLoading} />
        <AuthField id="password" label="Password" type="password" placeholder="********" required={true} disabled={isLoading} />

        <Button className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
          Sign In
          {isLoading && <SpinningLoadingIcon />}
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