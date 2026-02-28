"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/api/auth.api";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters.")
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return;
    }

    setIsLoading(true);

    const response: string | null = await registerUser({ name, email, password });
    if (response) {
      const loginRes = await signIn("credentials", { redirect: false, email: email.toLowerCase(), password });
      if (loginRes?.error) {
        setError("Invalid credentials.");
        setIsLoading(false);
        return;
      }
      router.push("/dashboard");
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Create your account"
        subtitle="Get started in just a few seconds"
      />

      <form onSubmit={handleRegister} className="space-y-4" onSelect={() => setError(null)}>
        <AuthField id="name" label="Name" type="name" placeholder="John Doe" required={true} />
        <AuthField id="email" label="Email" type="email" placeholder="you@example.com" required={true} />
        <AuthField id="password" label="Password" type="password" placeholder="********" required={true} />
        <AuthField id="confirm-password" label="Confirm Password" type="password" placeholder="********" required={true} />

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Create Account
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    </AuthLayout>
  );
}