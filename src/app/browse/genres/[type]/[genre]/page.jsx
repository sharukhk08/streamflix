import Header from "../../../../../components/content/common/Header";
import GenreGrid from "../../../../../components/content/GenreGrid";
import { getContent } from "../../../../../api/content/getcontent";
import { notFound } from "next/navigation";

export default async function GenrePage({ params }) {
  if (!["movie", "series"].includes(params.type)) notFound();
  const genre = decodeURIComponent(params.genre);
  const data = await getContent();
  const seen = new Set();
  const items = (data?.collections || [])
    .flatMap((c) => c.items)
    .filter((i) => i.content === params.type && i.type === genre && !seen.has(i.id) && seen.add(i.id));
  return (
    <div>
      <Header />
      <GenreGrid title={genre} subtitle={`${params.type === "movie" ? "Movies" : "Series"} · ${items.length} titles`} items={items} />
    </div>
  );
}
