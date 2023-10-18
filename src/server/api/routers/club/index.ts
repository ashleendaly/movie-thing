import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
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

  getForUser: protectedProcedure.query(async ({ ctx }) => {
    const userID = ctx.auth.userId;
    console.log(userID);
    return await ctx.db
      .selectFrom("Club")
      .innerJoin("ClubMembership", "Club.ID", "ClubMembership.clubID")
      .where("ClubMembership.userID", "=", userID)
      .select(["Club.ID", "Club.name"])
      .execute();
  }),
});
