import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  join: protectedProcedure
    .input(z.object({ joinCode: z.string() }))
    .mutation(async ({ input: { joinCode }, ctx }) => {
      const userID = ctx.auth.userId;

      const club = await ctx.db
        .selectFrom("Club")
        .selectAll()
        .where("joinCode", "=", joinCode)
        .executeTakeFirstOrThrow();

      const membership = await ctx.db
        .selectFrom("ClubMembership")
        .where("ClubMembership.clubName", "=", club.name)
        .where("ClubMembership.userID", "=", userID)
        .select("ClubMembership.clubName")
        .executeTakeFirst();

      if (membership?.clubName) return club;

      if (!club.joinable) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Club is not joinable",
        });
      }

      await ctx.db
        .insertInto("ClubMembership")
        .values({
          clubName: club.name,
          userID: userID,
          isPresent: false,
        })
        .executeTakeFirstOrThrow();

      return club;
    }),

  list: protectedProcedure
    .input(
      z.object({
        clubName: z.string(),
      }),
    )
    .query(async ({ input: { clubName }, ctx }) => {
      const members = await ctx.db
        .selectFrom("ClubMembership")
        .select(["userID", "isPresent"])
        .where("clubName", "=", clubName)
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
        clubName: z.string(),
        userID: z.string(),
        isPresent: z.boolean(),
      }),
    )
    .mutation(async ({ input: { isPresent, clubName, userID }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("ClubMembership")
        .set({
          isPresent,
        })
        .where("clubName", "=", clubName)
        .where("userID", "=", userID)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});
