import Link from "next/link";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { getChefProfile } from "@/lib/data";
import {
  addCertification,
  deleteCertification,
  updateChef,
} from "./actions";

export default async function AdminChefPage() {
  const chef = await getChefProfile();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl">Chef profile</h1>
        <p className="text-muted mt-1">
          Edit Maimouna&apos;s bio, photos, and credentials. Public page lives at{" "}
          <Link href="/chef" className="underline">
            /chef
          </Link>
          .
        </p>
      </div>

      <form action={updateChef} className="space-y-6 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Name">
            <Input
              name="name"
              required
              defaultValue={chef?.name ?? "Maimouna Niang"}
            />
          </Field>
          <Field label="Title">
            <Input
              name="title"
              defaultValue={chef?.title ?? "Chef · Founder"}
              placeholder="Chef · Founder"
            />
          </Field>
        </div>

        <Field label="Origin (e.g. 'Italia · Senegal')">
          <Input name="origin" defaultValue={chef?.origin ?? ""} />
        </Field>

        <Field label="Bio">
          <Textarea
            name="bio"
            rows={8}
            defaultValue={chef?.bio ?? ""}
            placeholder="Where she trained, how she sources, what she serves…"
          />
        </Field>

        <Field label="Philosophy (one short Italian sentence)">
          <Input
            name="philosophy"
            defaultValue={chef?.philosophy ?? ""}
            placeholder="L'Italia non è un solo sapore. È mille tavole."
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Signature dish">
            <Input
              name="signature_dish"
              defaultValue={chef?.signature_dish ?? ""}
              placeholder="Risotto al saffron, hand-stirred for forty minutes."
            />
          </Field>
          <Field label="Instagram handle">
            <Input
              name="instagram_handle"
              defaultValue={chef?.instagram_handle ?? ""}
              placeholder="@maimouna.mai"
            />
          </Field>
        </div>

        <Field label="Portrait photo URL" hint="Square or 4:5 portrait works best.">
          <Input
            name="photo_url"
            defaultValue={chef?.photo_url ?? ""}
            placeholder="https://…"
          />
        </Field>

        <Field label="Hero/banner photo URL" hint="Wide image used at top of /chef.">
          <Input
            name="hero_image_url"
            defaultValue={chef?.hero_image_url ?? ""}
            placeholder="https://…"
          />
        </Field>

        <div className="flex items-center gap-4 pt-4">
          <Button type="submit" variant="wine" size="lg">
            Save profile
          </Button>
        </div>
      </form>

      <div className="pt-12 border-t border-line space-y-6 max-w-3xl">
        <div>
          <h2 className="font-display text-3xl">Certifications & training</h2>
          <p className="text-muted mt-1">
            Add diplomas, programs attended, awards. Image URLs optional — they
            render as a card without an image.
          </p>
        </div>

        <ul className="space-y-2">
          {(chef?.certifications ?? []).map((c, i) => (
            <li
              key={c.id}
              className="flex items-start justify-between gap-4 border border-line bg-ivory p-4"
            >
              <div className="flex gap-4">
                <span className="font-display text-gold italic tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted">
                    {c.issuer ?? "—"}
                    {c.year ? ` · ${c.year}` : ""}
                  </p>
                </div>
              </div>
              <form action={deleteCertification}>
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="text-[11px] uppercase tracking-[0.18em] text-muted hover:text-wine"
                >
                  Remove
                </button>
              </form>
            </li>
          ))}
        </ul>

        <form action={addCertification} className="border border-line bg-cream p-6 space-y-4">
          <h3 className="font-display text-xl">Add a credential</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <Input
                name="name"
                required
                placeholder="ALMA · Italian Cuisine Diploma"
              />
            </Field>
            <Field label="Issuer">
              <Input name="issuer" placeholder="Scuola Internazionale di Cucina, Colorno" />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Year">
              <Input type="number" name="year" min="1900" max="2100" placeholder="2018" />
            </Field>
            <Field label="Image URL (optional)">
              <Input name="image_url" placeholder="https://…" />
            </Field>
          </div>
          <Button type="submit" variant="primary">
            Add credential
          </Button>
        </form>
      </div>
    </div>
  );
}
