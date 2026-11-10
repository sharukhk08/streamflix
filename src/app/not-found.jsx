import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="text-[#00FF99] tracking-[0.3em] text-sm">ERROR 404</p>
      <h1 className="mt-4 text-4xl md:text-6xl font-semibold">Scene not found</h1>
      <p className="mt-4 max-w-md text-zinc-400">The page you are looking for has left the building. Let&apos;s get you back to the movies.</p>
      <Link href="/browse" className="mt-8 rounded-full bg-white px-8 py-3 font-medium text-black transition hover:scale-105">Back to browsing</Link>
    </main>
  );
}
