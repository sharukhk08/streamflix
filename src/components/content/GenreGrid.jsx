"use client";
import Link from "next/link";
import Image from "next/image";

export default function GenreGrid({ title, subtitle, items }) {
  return (
    <main className="px-4 md:px-12 pb-16 pt-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-white">{title}</h1>
      {subtitle && <p className="mt-2 text-zinc-400">{subtitle}</p>}
      {items.length === 0 ? (
        <div className="mt-16 text-center text-zinc-400">
          <p className="text-xl text-white">Nothing here yet</p>
          <p className="mt-2">Check back soon or <Link className="text-[#00FF99] underline" href="/browse">browse everything</Link>.</p>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {items.map((it) => (
            <li key={it.id}>
              <Link href={`/browse/${it.id}`} className="group block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/10 transition duration-300 group-hover:scale-[1.04] group-hover:ring-[#00FF99]/60">
                  <Image src={it.poster || it.src} alt={it.title} fill sizes="(max-width:768px) 45vw, 16vw" className="object-cover" />
                </div>
                <p className="mt-2 truncate text-sm text-zinc-200">{it.title}</p>
                <p className="text-xs text-zinc-500">{it.type}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
