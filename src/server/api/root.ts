import { createTRPCRouter } from "~/server/api/trpc";
import { watchlistRouter } from "./routers/watchlist";
import { clubRouter } from "./routers/club";

export const appRouter = createTRPCRouter({
  club: clubRouter,
  watchList: watchlistRouter,
});

export type AppRouter = typeof appRouter;
