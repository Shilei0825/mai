"use client";

import { useTransition } from "react";

const STATUSES = ["pending", "paid", "fulfilled", "canceled", "refunded"];

export function StatusSelect({
  orderId,
  current,
  action,
}: {
  orderId: string;
  current: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, start] = useTransition();
  return (
    <select
      disabled={pending}
      defaultValue={current}
      onChange={(e) => {
        const form = new FormData();
        form.set("id", orderId);
        form.set("status", e.currentTarget.value);
        start(() => action(form));
      }}
      className="bg-cream border border-line px-2 py-1 text-xs uppercase tracking-[0.18em] disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
