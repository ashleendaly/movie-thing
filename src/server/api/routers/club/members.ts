import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { triggerClubReload } from "~/lib/pusher/server";
import { clubNameSchema } from "~/lib/utils/club-name";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type ClubMember } from "~/types";

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
          isPresent: true,
        })
        .executeTakeFirstOrThrow();

      await triggerClubReload(club.name);

      return club;
    }),

  list: protectedProcedure
    .input(z.object({ clubName: clubNameSchema }))
    .query(async ({ input: { clubName }, ctx }) => {
      const members = await ctx.db
        .selectFrom("ClubMembership")
        .select(["userID", "isPresent"])
        .where("clubName", "=", clubName)
        .orderBy("userID")
        .execute();

      return await Promise.all(
        members.map(async ({ userID, isPresent }) => {
          const { id, imageUrl, username } =
            await clerkClient.users.getUser(userID);
          return {
            id,
            imageUrl,
            username,
            isPresent,
          } as ClubMember;
        }),
      );
    }),

  setPresence: protectedProcedure
    .input(
      z.object({
        clubName: clubNameSchema,
        userID: z.string(),
        isPresent: z.boolean(),
      }),
    )
    .mutation(async ({ input: { isPresent, clubName, userID }, ctx }) => {
      // TODO check if user has permission
      const data = await ctx.db
        .updateTable("ClubMembership")
        .set({ isPresent })
        .where("clubName", "=", clubName)
        .where("userID", "=", userID)
        .returningAll()
        .executeTakeFirstOrThrow();

      await triggerClubReload(clubName);

      return data;
    }),
});
