import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const watchlistRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        ID: z.string(),
        title: z.string(),
        posterURL: z.string().url(),
      }),
    )
    .mutation(async ({ input: newMovie, ctx }) => {
      const userID = ctx.auth.userId;

      let movieRecord = await ctx.db
        .selectFrom("Movie")
        .selectAll()
        .where("Movie.ID", "==", newMovie.ID)
        .executeTakeFirst();

      if (!movieRecord) {
        movieRecord = await ctx.db
          .insertInto("Movie")
          .values(newMovie)
          .returningAll()
          .executeTakeFirstOrThrow();
      }

      const count =
        (
          await ctx.db
            .selectFrom("WantsToWatch")
            .select((eb) => [eb.fn.countAll<number>().as("count")]) //i.e. COUNT(*) as count
            .where("userID", "==", userID)
            .executeTakeFirst()
        )?.count ?? 0;

      return await ctx.db
        .insertInto("WantsToWatch")
        .values({
          movieID: movieRecord.ID,
          userID,
          preference: count,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    }),

  remove: protectedProcedure
    .input(z.object({ ID: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .deleteFrom("WantsToWatch")
        .where("movieID", "==", input.ID)
        .where("userID", "==", ctx.auth.userId)
        .returningAll()
        .executeTakeFirstOrThrow();
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
            .where("movieID", "==", change.movieID)
            .where("userID", "==", userID)
            .returningAll()
            .executeTakeFirstOrThrow();
        }
      });
    }),
});
