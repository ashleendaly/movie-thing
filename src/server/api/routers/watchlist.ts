import { sql } from "kysely";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const watchlistRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        imdbID: z.string(),
        title: z.string(),
        posterURL: z.string().url(),
      }),
    )
    .mutation(async ({ input: newMovie, ctx }) => {
      console.log("called");

      const userID = ctx.auth.userId;

      const movieRecord = await ctx.db
        .selectFrom("Movie")
        .selectAll()
        .where("Movie.imdbID", "=", newMovie.imdbID)
        .executeTakeFirst();

      if (!movieRecord) {
        await ctx.db
          .insertInto("Movie")
          .values(newMovie)
          .onConflict((oc) => oc.doUpdateSet(newMovie))
          .returningAll()
          .executeTakeFirstOrThrow();
      }

      return await ctx.db
        .insertInto("WantsToWatch")
        .values((eb) => ({
          movieID: newMovie.imdbID,
          userID,
          preference: eb
            .selectFrom("WantsToWatch")
            .select((eb) =>
              eb(
                eb.fn.coalesce(eb.fn.max("preference"), sql<number>`0`),
                "+",
                1,
              ).as("preference"),
            )
            .where("userID", "=", userID),
        }))
        .returningAll()
        .onConflict((oc) => oc.doNothing())
        .executeTakeFirst();
    }),

  getForUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .selectFrom("WantsToWatch")
      .innerJoin("Movie", "Movie.imdbID", "WantsToWatch.movieID")
      .select([
        "Movie.imdbID",
        "Movie.posterURL",
        "Movie.title",
        "WantsToWatch.preference",
      ])
      .where("WantsToWatch.userID", "=", ctx.auth.userId)
      .execute();
  }),

  reorder: protectedProcedure
    .input(
      z.object({
        changes: z.array(
          z.object({ movieID: z.string(), newPreference: z.number() }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userID = ctx.auth.userId;
      return await ctx.db.transaction().execute(async (trx) => {
        for (const change of input.changes) {
          await trx
            .updateTable("WantsToWatch")
            .set({
              preference: change.newPreference,
            })
            .where("movieID", "=", change.movieID)
            .where("userID", "=", userID)
            .returningAll()
            .executeTakeFirstOrThrow();
        }
      });
    }),

  remove: protectedProcedure
    .input(z.object({ ID: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .deleteFrom("WantsToWatch")
        .where("movieID", "=", input.ID)
        .where("userID", "=", ctx.auth.userId)
        .returningAll()
        .executeTakeFirstOrThrow();
    }),
});
