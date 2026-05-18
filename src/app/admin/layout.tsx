import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  if (user.role !== "admin") redirect("/account");

  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/baskets", label: "Baskets" },
    { href: "/admin/chef", label: "Chef" },
    { href: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <div className="border-b border-line bg-ivory">
        <Container className="py-6 flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-2xl">Mai Admin</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
              {user.email}
            </span>
          </div>
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
          >
            View site →
          </Link>
        </Container>
        <Container className="pb-3">
          <nav className="flex gap-6 -mb-px">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12px] uppercase tracking-[0.18em] py-3 border-b-2 border-transparent text-ink-soft hover:text-wine hover:border-wine"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
      <Container className="py-10">{children}</Container>
    </div>
  );
}
