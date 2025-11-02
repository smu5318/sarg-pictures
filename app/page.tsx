import { supabase } from "@/lib/supabaseClient";
import MediaCard from "@/components/MediaCard";

export default async function Home() {
  const { data: items } = await supabase
    .from("media_items")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-4">Últimos trabajos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items?.map((m: any) => (
          <MediaCard key={m.id} item={m} />
        ))}
      </div>
    </section>
  );
}
