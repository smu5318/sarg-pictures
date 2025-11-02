import "../styles/globals.css";
import { ReactNode } from "react";
import Header from "../components/Header";

export const metadata = {
  title: "Kangawa Gallery",
  description: "Galería minimalista de multimedia",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
