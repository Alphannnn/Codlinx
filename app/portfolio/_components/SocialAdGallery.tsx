import Image from "next/image";
import Reveal from "../../components/Reveal";
import AdVideo from "./AdVideo";

const SWATCH = "#3FC9B4";

type Tile =
  | { kind: "video"; src: string; handle: string; time: string; emojis: string; aspect: string }
  | { kind: "image"; img: string; handle: string; time: string; emojis: string; aspect: string };

// Masonry feed: real ad clips interleaved with poster-style creatives, in
// varied heights — the Digital Otters "creative collection" look, recolored.
const TILES: Tile[] = [
  { kind: "video", src: "/portfolio-ads/ad-2.mp4", handle: "lumenretail", time: "2 mins ago", emojis: "😍 🔥 👏 😄", aspect: "aspect-[9/16]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80", handle: "ateliernord", time: "9 mins ago", emojis: "🔥 💬 ❤️", aspect: "aspect-[4/5]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=600&q=80", handle: "brightwave", time: "14 mins ago", emojis: "🚀 👏 ✨", aspect: "aspect-square" },
  { kind: "video", src: "/portfolio-ads/ad-4.mp4", handle: "cobaltfilms", time: "19 mins ago", emojis: "🎬 🔥 👀", aspect: "aspect-[4/5]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80", handle: "northstarlabs", time: "23 mins ago", emojis: "📈 💼 👏", aspect: "aspect-[3/4]" },
  { kind: "video", src: "/portfolio-ads/ad-6.mp4", handle: "vegamobility", time: "27 mins ago", emojis: "😍 🔥 👏 😄", aspect: "aspect-[9/16]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=600&q=80", handle: "finlee", time: "31 mins ago", emojis: "💸 🙌 😍", aspect: "aspect-[4/5]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80", handle: "halalgetaways", time: "33 mins ago", emojis: "🔥 😄 👀", aspect: "aspect-[3/4]" },
  { kind: "video", src: "/portfolio-ads/ad-1.mp4", handle: "halcyonpay", time: "38 mins ago", emojis: "💹 🔥 😍", aspect: "aspect-[4/5]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=600&q=80", handle: "lumenretail", time: "46 mins ago", emojis: "😍 🔥 👏 😄", aspect: "aspect-square" },
  { kind: "video", src: "/portfolio-ads/ad-5.mp4", handle: "ateliernord", time: "52 mins ago", emojis: "🔥 💬 ❤️", aspect: "aspect-[9/16]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=600&q=80", handle: "vascularhealth", time: "56 mins ago", emojis: "😍 🔥 👏 😄", aspect: "aspect-[4/5]" },
  { kind: "video", src: "/portfolio-ads/ad-3.mp4", handle: "brightwave", time: "1 hr ago", emojis: "⚡ 💬 ❤️", aspect: "aspect-[4/5]" },
  { kind: "image", img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=600&q=80", handle: "cobaltrobotics", time: "1 hr ago", emojis: "📈 🔥 👏", aspect: "aspect-[3/4]" },
];

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 4h12v16l-6-4-6 4V4Z" />
    </svg>
  );
}

function PostTile({ tile }: { tile: Tile }) {
  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      {/* header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-black" style={{ backgroundColor: SWATCH }}>
            {tile.handle.charAt(0).toUpperCase()}
          </span>
          <span className="text-[12px] font-semibold text-white">{tile.handle}</span>
        </div>
        <span className="text-[10px] text-white/40">{tile.time}</span>
      </div>

      {/* media */}
      <div className={`relative w-full overflow-hidden ${tile.aspect}`}>
        {tile.kind === "video" ? (
          <>
            <AdVideo src={tile.src} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" style={{ animation: "codlinx-grid-pulse 1.4s ease-in-out infinite" }} />
              Ad
            </span>
          </>
        ) : (
          <Image
            src={tile.img}
            alt={`${tile.handle} creative`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        )}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-sm">{tile.emojis}</span>
        <span className="text-white/40 transition-colors hover:text-white">
          <BookmarkIcon />
        </span>
      </div>
    </div>
  );
}

export default function SocialAdGallery() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div
        aria-hidden
        className="codlinx-float-orb absolute right-[6%] top-1/4 -z-10 h-[380px] w-[380px] rounded-full opacity-[0.12] blur-[150px]"
        style={{ backgroundColor: SWATCH }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: SWATCH, animation: "codlinx-grid-pulse 1.4s ease-in-out infinite" }}
              />
              Creative collection
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              A feed of the work we ship.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Reels, video ads, and post creative — a fixed gallery of recent work. Nothing scrolls away.
            </p>
          </div>
        </Reveal>

        {/* Masonry — varied heights, mixed video + image, all static. */}
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {TILES.map((tile, i) => (
            <PostTile key={`${tile.handle}-${i}`} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
