import { z } from "zod";
import { triggerClubReload } from "~/lib/pusher/server";
import { clubNameSchema } from "~/lib/utils/club-name";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const aggregationRouter = createTRPCRouter({
  getRankings: protectedProcedure
    .input(z.object({ clubName: clubNameSchema }))
    .query(async ({ ctx, input: { clubName } }) => {
      return await ctx.db
        .selectFrom("ClubRanking")
        .innerJoin("Movie", "ClubRanking.movieID", "Movie.imdbID")
        .select([
          "Movie.imdbID",
          "ClubRanking.rank",
          "Movie.title",
          "Movie.posterURL",
        ])
        .where("clubName", "=", clubName)
        .orderBy("rank asc")
        .execute();
    }),

  computeRankings: protectedProcedure
    .input(z.object({ clubName: clubNameSchema }))
    .mutation(async ({ ctx, input: { clubName } }) => {
      const rawPreferences = await ctx.db
        .selectFrom("WantsToWatch")
        .select([
          "WantsToWatch.movieID",
          "WantsToWatch.preference",
          "WantsToWatch.userID",
        ])
        .innerJoin(
          "ClubMembership",
          "ClubMembership.userID",
          "WantsToWatch.userID",
        )
        .where("ClubMembership.clubName", "=", clubName)
        .execute();

      const userPrefLists = partitionByUser(rawPreferences);

      const aggregateList = bordaFuze(userPrefLists);

      await ctx.db
        .deleteFrom("ClubRanking")
        .where("clubName", "=", clubName)
        .execute();

      const res = aggregateList.map((movieID, rank) => ({
        clubName,
        movieID,
        rank,
      }));

      await ctx.db.insertInto("ClubRanking").values(res).execute();

      await triggerClubReload(clubName);
    }),
});

function partitionByUser(
  preferences: {
    movieID: string;
    preference: number;
    userID: string;
  }[],
): string[][] {
  const prefs: Record<string, { preference: number; movieID: string }[]> = {};

  preferences.forEach(({ userID, ...rest }) => {
    const userPrefs = prefs[userID] ?? [];
    userPrefs.push({ ...rest });
    prefs[userID] = userPrefs;
  });

  const userPrefLists = Object.values(prefs);

  return userPrefLists.map((list) =>
    list.sort((a, b) => a.preference - b.preference).map((e) => e.movieID),
  );
}

function bordaFuze(rankings: string[][]): string[] {
  const uniqueNames = new Set(rankings.flat());
  const maxPoints = uniqueNames.size;

  const userPoints = rankings.map((prefList) =>
    prefList.reduce(
      (acc, name, i) => ({ ...acc, [name]: maxPoints - i }),
      {} as Record<string, number>,
    ),
  );

  const aggregatePoints = [...uniqueNames]
    .map((name) => {
      const points = userPoints.reduce(
        (totalPoints, userPointMapping) =>
          totalPoints + (userPointMapping[name] ?? 0),
        0,
      );
      return { name, points };
    })
    .sort((x, y) => y.points - x.points);

  return aggregatePoints.map((e) => e.name);
}
