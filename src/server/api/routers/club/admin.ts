import { generate } from "random-words";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input: newClub, ctx }) => {
      const userID = ctx.auth.userId;

      const club = await ctx.db
        .insertInto("Club")
        .values({
          name: newClub.name,
          sessionActive: false,
          joinable: true,
          joinCode: generate({
            exactly: 1,
            wordsPerString: 4,
            minLength: 4,
            maxLength: 4,
            separator: "-",
          }).at(0)!,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

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

  setJoinable: protectedProcedure
    .input(
      z.object({
        clubID: z.string(),
        joinable: z.boolean(),
      }),
    )
    .mutation(async ({ input: { clubID, joinable }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("Club")
        .set({
          joinable,
        })
        .where("ID", "==", clubID)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  activate: protectedProcedure
    .input(z.object({ clubID: z.string() }))
    .mutation(async ({ input: { clubID }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("Club")
        .set({
          sessionActive: true,
        })
        .where("ID", "==", clubID)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  resetJoinCode: protectedProcedure
    .input(z.object({ clubID: z.string() }))
    .mutation(async ({ input: { clubID }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("Club")
        .set({
          joinCode: generate({
            exactly: 1,
            wordsPerString: 4,
            minLength: 4,
            maxLength: 4,
            separator: "-",
          }).at(0)!,
        })
        .where("ID", "==", clubID)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  rename: protectedProcedure
    .input(
      z.object({
        clubID: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input: { clubID, name }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("Club")
        .set({
          name,
        })
        .where("ID", "==", clubID)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});
