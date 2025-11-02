// app/detail/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";

interface Props {
  params: { id: string };
}

export default async function Detail({ params }: Props) {
  // Trae el item y la info de su creator si tienes la relación adecuada
  const { data: item, error } = await supabase
    .from("media_items")
    .select("*, profiles(username, display_name)")
    .eq("id", params.id)
    .single();

  if (error || !item) return <div>No encontrado</div>;

  // getPublicUrl() devuelve { data: { publicUrl } }
  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(item.file_path);
  const publicUrl = urlData?.publicUrl ?? "";

  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="text-sm mb-4">
        Publicado por{" "}
        <a href={`/vendor/${item.profiles?.username}`} className="underline">
          @{item.profiles?.username}
        </a>
      </p>

      <div className="mb-4">
        {item.type === "image" && (
          <img
            src={publicUrl}
            alt={item.title}
            className="w-full max-h-[60vh] object-contain"
          />
        )}
        {item.type === "video" && (
          <video controls src={publicUrl} className="w-full max-h-[60vh]" />
        )}
        {item.type === "audio" && (
          <audio controls src={publicUrl} className="w-full" />
        )}
        {item.type === "model" && (
          // model-viewer necesita cargarse client-side. Esto funciona si el webcomponent fue instalado.
          // Si Next da warnings, carga model-viewer dinámicamente en cliente.
          // @ts-ignore
          <model-viewer
            src={publicUrl}
            alt={item.title}
            auto-rotate
            camera-controls
            style={{ width: "100%", height: "60vh" }}
          />
        )}
        {item.type === "game" && (
          <iframe
            src={publicUrl}
            className="w-full h-[60vh]"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>

      <p>{item.description}</p>
    </section>
  );
}
