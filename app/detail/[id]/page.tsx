import { supabase } from "@/lib/supabaseClient";

interface Props {
  params: { id: string };
}

export default async function Detail({ params }: Props) {
  const { data: items } = await supabase
    .from("media_items")
    .select("*, profiles(username,display_name)")
    .eq("id", params.id)
    .limit(1)
    .single();

  if (!items) return <div>No encontrado</div>;
  const m = items;
  const publicURL = supabase.storage
    .from("media")
    .getPublicUrl(m.file_path).publicURL;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">{m.title}</h1>
      <p className="text-sm mb-4">
        Publicado por{" "}
        <a href={`/vendor/${m.profiles?.username}`} className="underline">
          @{m.profiles?.username}
        </a>
      </p>

      <div className="mb-4">
        {m.type === "image" && (
          <img
            src={publicURL}
            alt={m.title}
            className="w-full max-h-[60vh] object-contain"
          />
        )}
        {m.type === "video" && (
          <video controls src={publicURL} className="w-full max-h-[60vh]" />
        )}
        {m.type === "audio" && (
          <audio controls src={publicURL} className="w-full" />
        )}
        {m.type === "model" && (
          // model-viewer web component
          // @ts-ignore
          <model-viewer
            src={publicURL}
            alt={m.title}
            auto-rotate
            camera-controls
            style={{ width: "100%", height: "60vh" }}
          />
        )}
        {m.type === "game" && (
          <iframe
            src={publicURL}
            className="w-full h-[60vh]"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
      <p>{m.description}</p>
    </section>
  );
}
