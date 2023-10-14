import { type DB } from "@kysely/client";
import { PostgresDialect, Kysely } from "kysely";
import { Pool } from "pg";
import { env } from "~/env.mjs";

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
