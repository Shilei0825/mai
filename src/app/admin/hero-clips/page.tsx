import Image from "next/image";
import { Button, Field, Input } from "@/components/ui";
import { getHeroClips } from "@/lib/data";
import {
  addHeroClip,
  deleteHeroClip,
  reorderHeroClip,
  updateHeroClip,
} from "./actions";

export default async function AdminHeroClipsPage() {
  const clips = await getHeroClips();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl">Hero video reel</h1>
        <p className="text-muted mt-1 max-w-2xl">
          The looping video reel at the top of the homepage. Paste an MP4 URL
          and a poster image URL for each clip. The reel cycles in order. If
          you leave the table empty the homepage falls back to the cycling
          poster photos.
        </p>
        <div className="mt-4 p-4 bg-cream border border-line text-sm text-ink/80 max-w-2xl">
          <p className="font-medium">Where to host your MP4 files</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-ink/70">
            <li>
              Recommended: Supabase Dashboard → Storage → create a public
              <code className="mx-1">videos</code> bucket → upload your MP4s
              → copy the public URL into this form
            </li>
            <li>
              Or: Vercel Blob, Cloudflare R2, Cloudinary, etc. — any HTTPS
              URL ending in <code>.mp4</code> works
            </li>
            <li>
              Hot-linking Pexels / Mixkit videos is unreliable — they often
              return 403 in production
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4 max-w-3xl">
        {clips.map((c, i) => {
          const updateAction = updateHeroClip.bind(null, c.id);
          return (
            <div key={c.id} className="border border-line bg-ivory p-5">
              <div className="flex items-start gap-5">
                <div className="relative w-32 aspect-[4/3] bg-ivory-2 overflow-hidden flex-shrink-0">
                  {c.poster_url && (
                    <Image
                      src={c.poster_url}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute top-1 left-1 text-[10px] uppercase tracking-[0.18em] bg-ink/80 text-ivory px-1.5 py-0.5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <form action={updateAction} className="flex-1 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Label (EN)">
                      <Input name="label_en" defaultValue={c.label_en} required />
                    </Field>
                    <Field label="Label (IT, optional)">
                      <Input name="label_it" defaultValue={c.label_it ?? ""} />
                    </Field>
                  </div>
                  <Field label="Video MP4 URL">
                    <Input
                      name="video_url"
                      defaultValue={c.video_url}
                      required
                      placeholder="https://your-bucket.supabase.co/storage/v1/object/public/videos/wine.mp4"
                    />
                  </Field>
                  <Field label="Poster image URL">
                    <Input
                      name="poster_url"
                      defaultValue={c.poster_url}
                      required
                      placeholder="https://…"
                    />
                  </Field>
                  <div className="flex items-center gap-3">
                    <Button type="submit" variant="wine">
                      Save
                    </Button>
                  </div>
                </form>
                <div className="flex flex-col gap-2 items-end flex-shrink-0">
                  <form action={reorderHeroClip} className="flex flex-col gap-1">
                    <input type="hidden" name="id" value={c.id} />
                    <button
                      type="submit"
                      name="direction"
                      value="up"
                      disabled={i === 0}
                      className="text-[11px] uppercase tracking-[0.18em] text-muted hover:text-wine disabled:opacity-30"
                    >
                      ↑ Up
                    </button>
                    <button
                      type="submit"
                      name="direction"
                      value="down"
                      disabled={i === clips.length - 1}
                      className="text-[11px] uppercase tracking-[0.18em] text-muted hover:text-wine disabled:opacity-30"
                    >
                      ↓ Down
                    </button>
                  </form>
                  <form action={deleteHeroClip}>
                    <input type="hidden" name="id" value={c.id} />
                    <button
                      type="submit"
                      className="text-[11px] uppercase tracking-[0.18em] text-muted hover:text-wine"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        action={addHeroClip}
        className="max-w-3xl border border-line bg-cream p-6 space-y-4"
      >
        <h2 className="font-display text-2xl">Add a new clip</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Label (EN)">
            <Input name="label_en" required placeholder="Olive oil" />
          </Field>
          <Field label="Label (IT, optional)">
            <Input name="label_it" placeholder="Olio" />
          </Field>
        </div>
        <Field label="Video MP4 URL">
          <Input
            name="video_url"
            required
            placeholder="https://your-bucket.supabase.co/storage/v1/object/public/videos/olive-oil.mp4"
          />
        </Field>
        <Field label="Poster image URL">
          <Input name="poster_url" required placeholder="https://…" />
        </Field>
        <Button type="submit" variant="primary">
          Add clip
        </Button>
      </form>
    </div>
  );
}
