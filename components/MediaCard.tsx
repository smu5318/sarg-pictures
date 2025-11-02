// components/MediaCard.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function MediaCard({ item }: { item: any }) {
  // getPublicUrl devuelve { data: { publicUrl: string } }
  const { data } = supabase.storage.from("media").getPublicUrl(item.file_path);
  const url = data?.publicUrl ?? "";

  return (
    <article className="bg-white/60 dark:bg-black/40 rounded overflow-hidden shadow-sm">
      <Link href={`/detail/${item.id}`}>
        {item.type === "image" ? (
          <img
            src={url}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="text-sm">{(item.type || "").toUpperCase()}</span>
          </div>
        )}
        <div className="p-3">
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {item.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
