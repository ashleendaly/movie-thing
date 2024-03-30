import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const aggregationRouter = createTRPCRouter({
  getRankings: protectedProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input: { clubId } }) => {
      return await ctx.db
        .selectFrom("ClubRanking")
        .select(["movieID", "rank"])
        .where("clubName", "==", clubId)
        .orderBy("rank asc")
        .execute();
    }),
  computeRankings: protectedProcedure
    .input(z.object({ clubName: z.string() }))
    .mutation(async ({ ctx, input: { clubName } }) => {
      const rawPreferences = await ctx.db
        .selectFrom("WantsToWatch")
        .select(["movieID", "preference", "userID"])
        .innerJoin(
          "ClubMembership",
          "ClubMembership.userID",
          "WantsToWatch.userID",
        )
        .where("ClubMembership.clubName", "==", clubName)
        .groupBy("userID")
        .execute();

      const userPrefLists = partitionByUser(rawPreferences);

      const aggregateList = bordaFuze(userPrefLists);

      await ctx.db
        .deleteFrom("ClubRanking")
        .where("clubName", "==", clubName)
        .execute();

      await ctx.db
        .insertInto("ClubRanking")
        .values(
          aggregateList.map((movieID, rank) => ({ clubName, movieID, rank })),
        )
        .execute();
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
    .sort(({ points: xPoints }, { points: yPoints }) => xPoints - yPoints);

  return aggregatePoints.map((e) => e.name);
}
