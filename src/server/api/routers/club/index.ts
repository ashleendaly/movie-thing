import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { adminRouter } from "./admin";
import { memberRouter } from "./members";

export const clubRouter = createTRPCRouter({
  admin: adminRouter,
  members: memberRouter,

  getAllForUser: protectedProcedure.query(async ({ ctx }) => {
    const userID = ctx.auth.userId;
    return await ctx.db
      .selectFrom("Club")
      .innerJoin("ClubMembership", "Club.name", "ClubMembership.clubName")
      .where("ClubMembership.userID", "=", userID)
      .select(["Club.name"])
      .execute();
  }),
});
