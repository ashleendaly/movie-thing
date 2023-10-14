import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const omdbQueryClient = new QueryClient()
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={omdbQueryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
