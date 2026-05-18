"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, Field, Input } from "@/components/ui";

type Mode = "signin" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    start(async () => {
      const supabase = createClient();
      if (mode === "signup") {
        const { error: signErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName || null },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (signErr) {
          setError(signErr.message);
          return;
        }
        setSent(true);
      } else {
        const { error: signErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signErr) {
          setError(signErr.message);
          return;
        }
        router.push(next);
        router.refresh();
      }
    });
  }

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <h1 className="font-display text-3xl">Check your email</h1>
        <p className="text-muted">
          We sent a confirmation link to <strong>{email}</strong>. Open it to
          finish creating your account.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-display text-4xl">
          {mode === "signin" ? "Welcome back" : "Reserve your place"}
        </h1>
        <p className="text-muted mt-2">
          {mode === "signin"
            ? "Sign in to manage your seats and orders."
            : "Create an account to book events and order baskets."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <Field label="Your name">
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              autoComplete="name"
            />
          </Field>
        )}
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
          />
        </Field>
        {error && <p className="text-sm text-wine">{error}</p>}
        <Button
          type="submit"
          disabled={pending}
          variant="wine"
          size="lg"
          className="w-full"
        >
          {pending
            ? "One moment…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        {mode === "signin" ? (
          <>
            New here?{" "}
            <a href="/signup" className="text-wine underline">
              Create an account
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href="/login" className="text-wine underline">
              Sign in
            </a>
          </>
        )}
      </p>
    </div>
  );
}
