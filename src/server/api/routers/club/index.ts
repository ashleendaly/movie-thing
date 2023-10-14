import { createTRPCRouter } from "~/server/api/trpc";
import { adminRouter } from "./admin";
import { memberRouter } from "./members";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const clubRouter = createTRPCRouter({
  admin: adminRouter,
  members: memberRouter,
});
