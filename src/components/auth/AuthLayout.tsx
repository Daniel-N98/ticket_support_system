"use client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-main-primary px-4">
      <div className="w-full max-w-md bg-main-secondary rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        {children}
      </div>
    </main>
  );
}