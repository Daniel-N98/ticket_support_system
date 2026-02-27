"use client";

import { AuthField } from "@/components/auth/AuthField";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { AuthHeader } from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create your account"
        subtitle="Get started in just a few seconds"
      />

      <form className="space-y-4">
        <AuthField id="name" label="Name" type="name" placeholder="John Doe" />
        <AuthField id="email" label="Email" type="email" placeholder="you@example.com" />
        <AuthField id="password" label="Password" type="password" placeholder="********" />
        <AuthField id="confirm-password" label="Confirm Password" type="password" placeholder="********" />

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Create Account
        </Button>
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    </AuthLayout>
  );
}