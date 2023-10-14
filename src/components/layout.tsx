import { type ReactNode } from "react";
import { Navbar } from "./navbar";

import { Header } from "./header";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-[100dvh] bg-background">
      <Header />
      {children}
      <Navbar />
    </main>
  );
}
