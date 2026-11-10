import Link from "next/link";
import Header from "../../components/content/common/Header";

const FAQ = [
  ["Is this a real streaming service?", "No. This is a portfolio demo that uses open-licensed film posters and sample videos."],
  ["How do I add a film to my watchlist?", "Open any title and press the + button. Find it later under Watchlist."],
  ["Are these real films?", "The posters are from the open Blender movies (2006 to 2022), but the videos are free public sample clips, not the full films."],
  ["Who do I contact?", "demo@example.com"],
];

export default function Help() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-8 text-white">
        <h1 className="text-3xl md:text-4xl font-semibold">Help Centre</h1>
        <dl className="mt-8 space-y-6">
          {FAQ.map(([q, a]) => (
            <div key={q} className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
              <dt className="font-medium">{q}</dt>
              <dd className="mt-1 text-zinc-400">{a}</dd>
            </div>
          ))}
        </dl>
        <Link href="/browse" className="mt-10 inline-block text-[#00FF99] underline">Back to browsing</Link>
      </main>
    </div>
  );
}
