import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { adminRouter } from "./admin";
import { memberRouter } from "./members";
import { aggregationRouter } from "./aggregate";
import { z } from "zod";
import { clubNameSchema } from "~/lib/utils/club-name";

export const clubRouter = createTRPCRouter({
  admin: adminRouter,
  members: memberRouter,
  aggregate: aggregationRouter,

  getJoinCode: protectedProcedure
    .input(z.object({ clubName: clubNameSchema }))
    .query(async ({ ctx, input: { clubName } }) => {
      return await ctx.db
        .selectFrom("Club")
        .where("Club.name", "=", clubName)
        .select(["Club.joinCode"])
        .executeTakeFirstOrThrow();
    }),

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
