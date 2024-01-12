import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { env } from "~/env";
import { type DB } from "~/types/db";

const globalForKysely = globalThis as unknown as {
  kysely: Kysely<DB> | undefined;
};

export const db =
  globalForKysely.kysely ??
  new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: env.POSTGRES_URL,
        ssl: true,
        max: 10,
      }),
    }),
  });

if (env.NODE_ENV !== "production") globalForKysely.kysely = db;
