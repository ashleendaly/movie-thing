import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { v4 as uuidv4 } from "uuid";

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
          joinCode: uuidv4(),
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
          joinCode: uuidv4(),
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

  join: protectedProcedure
    .input(z.object({ joinCode: z.string() }))
    .mutation(async ({ ctx, input: { joinCode } }) => {
      // find club
      const clubID = (
        await ctx.db
          .selectFrom("Club")
          .select(["Club.ID"])
          .where("Club.joinCode", "=", joinCode)
          .executeTakeFirstOrThrow()
      ).ID;

      return await ctx.db
        .insertInto("ClubMembership")
        .values({
          clubID,
          isPresent: false,
          userID: ctx.auth.userId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});
