"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefer = saved === "dark";
    setDark(prefer);
    document.documentElement.classList.toggle("dark", prefer);
  }, []);
  function toggle() {
    const nx = !dark;
    setDark(nx);
    localStorage.setItem("theme", nx ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nx);
  }
  return (
    <header className="py-4 mb-6 border-b">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4">
        <Link href="/" className="text-xl font-bold">
          Kangawa Gallery
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/gallery" className="hidden md:inline">
            Galería
          </Link>
          <Link href="/dashboard" className="hidden md:inline">
            Dashboard
          </Link>
          <button onClick={toggle} className="px-3 py-1 rounded border">
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}
