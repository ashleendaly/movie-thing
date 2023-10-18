import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  join: protectedProcedure
    .input(
      z.object({
        joinCode: z.string(),
      }),
    )
    .mutation(async ({ input: { joinCode }, ctx }) => {
      const userID = ctx.auth.userId;

      const club = await ctx.db
        .selectFrom("Club")
        .selectAll()
        .where("joinCode", "=", joinCode)
        .executeTakeFirstOrThrow();

      const membership = await ctx.db
        .selectFrom("ClubMembership")
        .where("ClubMembership.clubID", "=", club.ID)
        .where("ClubMembership.userID", "=", userID)
        .select("ClubMembership.clubID")
        .executeTakeFirst();

      if (membership?.clubID) return club;

      if (!club.joinable) {
        throw new Error("club is not joinable");
      }

      await ctx.db
        .insertInto("ClubMembership")
        .values({
          clubID: club.ID,
          userID: userID,
          isPresent: false,
        })
        .executeTakeFirstOrThrow();

      return club;
    }),

  list: protectedProcedure
    .input(
      z.object({
        clubID: z.string(),
      }),
    )
    .query(async ({ input: { clubID }, ctx }) => {
      const members = await ctx.db
        .selectFrom("ClubMembership")
        .select(["userID", "isPresent"])
        .where("clubID", "==", clubID)
        .execute();

      return await Promise.all(
        members.map(async ({ userID, isPresent }) => ({
          user: await clerkClient.users.getUser(userID),
          isPresent,
        })),
      );
    }),

  setPresence: protectedProcedure
    .input(
      z.object({
        clubID: z.string(),
        userID: z.string(),
        isPresent: z.boolean(),
      }),
    )
    .mutation(async ({ input: { isPresent, clubID, userID }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("ClubMembership")
        .set({
          isPresent,
        })
        .where("clubID", "==", clubID)
        .where("userID", "==", userID)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});
