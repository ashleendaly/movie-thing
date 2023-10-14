import { KyselyAuth, type Codegen } from "@auth/kysely-adapter";
import { type DB } from "@kysely/client";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { env } from "~/env.mjs";

const globalForKysely = globalThis as unknown as {
  kysely: KyselyAuth<DB, Codegen> | undefined;
};

export const db =
  globalForKysely.kysely ??
  new KyselyAuth<DB, Codegen>({
    dialect: new PostgresDialect({
      // TODO work out why this is broken
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      pool: new Pool({
        connectionString: env.POSTGRES_URL,
        max: 10,
      }),
    }),
  });

if (env.NODE_ENV !== "production") globalForKysely.kysely = db;
