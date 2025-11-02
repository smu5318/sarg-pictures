"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UploadForm({ creatorId }: { creatorId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("image");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!file) return alert("Selecciona un archivo");
    setLoading(true);
    try {
      const path = `media/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { error: dbErr } = await supabase.from("media_items").insert([
        {
          title,
          description: "",
          type,
          file_path: path,
          creator_id: creatorId,
        },
      ]);
      if (dbErr) throw dbErr;
      alert("Subido!");
      setTitle("");
      setFile(null);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-3">
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full p-2 border rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="image">Imagen</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
        <option value="model">Modelo 3D</option>
        <option value="game">Juego HTML</option>
      </select>
      <input
        required
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        disabled={loading}
        className="px-4 py-2 bg-kangawa-accent text-white rounded"
      >
        {loading ? "Subiendo..." : "Subir"}
      </button>
    </form>
  );
}
