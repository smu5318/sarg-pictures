import { supabase } from "@/lib/supabaseClient";
import MediaCard from "@/components/MediaCard";

export default async function Vendor({
  params,
}: {
  params: { username: string };
}) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();
  if (!profile) return <div>No existe el creador</div>;

  const { data: items } = await supabase
    .from("media_items")
    .select("*")
    .eq("creator_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          {profile.display_name || profile.username}
        </h1>
        <p className="text-sm">{profile.bio}</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items?.map((m: any) => (
          <MediaCard key={m.id} item={m} />
        ))}
      </div>
    </section>
  );
}
