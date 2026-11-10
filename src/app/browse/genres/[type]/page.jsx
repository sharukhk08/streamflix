import Header from "../../../../components/content/common/Header";
import GenreGrid from "../../../../components/content/GenreGrid";
import { getContent } from "../../../../api/content/getcontent";
import { notFound } from "next/navigation";

const TYPES = { movie: "Movies", series: "Series" };

export default async function TypePage({ params }) {
  const label = TYPES[params.type];
  if (!label) notFound();
  const data = await getContent();
  const seen = new Set();
  const items = (data?.collections || [])
    .flatMap((c) => c.items)
    .filter((i) => i.content === params.type && !seen.has(i.id) && seen.add(i.id));
  return (
    <div>
      <Header />
      <GenreGrid title={label} subtitle={`${items.length} titles`} items={items} />
    </div>
  );
}
