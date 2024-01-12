import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { type ReactNode } from "react";

import { Header } from "~/components/header";
import { Navbar } from "~/components/navbar";
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
      <body className={`font-sans ${inter.variable}`}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider cookies={cookies().toString()}>
              <main className="h-[100dvh] bg-background py-[10dvh]">
                <Header />
                <section className=" h-[80dvh]">{children}</section>
                <Navbar />
              </main>
            </TRPCReactProvider>
            <Toaster closeButton />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
