import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { type ReactNode } from "react";

import { Navbar } from "~/app/(home)/navbar";
import { ThemeProvider } from "~/components/theme";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/lib/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Moviething",
  description: "Pick movies with your friends",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-mono ${inter.variable}`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider cookies={cookies().toString()}>
              <main className="h-dvh pb-28">
                <section className="h-[calc(100dvh-7rem)]">{children}</section>
                <Navbar />
              </main>
            </TRPCReactProvider>
            <Toaster closeButton position="top-center" richColors />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
