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
          clubName: club.name,
          userID: userID,
          isPresent: false,
        })
        .executeTakeFirstOrThrow();

      return club;
    }),

  setJoinable: protectedProcedure
    .input(
      z.object({
        clubName: z.string(),
        joinable: z.boolean(),
      }),
    )
    .mutation(async ({ input: { clubName, joinable }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("Club")
        .set({
          joinable,
        })
        .where("Club.name", "=", clubName)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  activate: protectedProcedure
    .input(z.object({ clubName: z.string() }))
    .mutation(async ({ input: { clubName }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("Club")
        .set({
          sessionActive: true,
        })
        .where("Club.name", "=", clubName)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  resetJoinCode: protectedProcedure
    .input(z.object({ clubName: z.string() }))
    .mutation(async ({ input: { clubName }, ctx }) => {
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
        .where("Club.name", "=", clubName)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  rename: protectedProcedure
    .input(
      z.object({
        clubName: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input: { clubName, name }, ctx }) => {
      // TODO check if user has permission
      return await ctx.db
        .updateTable("Club")
        .set({
          name,
        })
        .where("Club.name", "=", clubName)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});
