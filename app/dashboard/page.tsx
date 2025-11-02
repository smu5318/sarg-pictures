"use client";
import UploadForm from "@/components/UploadForm";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then((r) => setUser(r.data?.user ?? null));
  }, []);

  if (!user) {
    return (
      <div>
        Inicia sesión para acceder al dashboard (implementa login con Supabase
        Auth)
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <UploadForm creatorId={user.id} />
    </section>
  );
}
