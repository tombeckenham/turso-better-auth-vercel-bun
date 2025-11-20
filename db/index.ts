import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@tursodatabase/serverless/compat";
import { type Client } from "@libsql/client";

import * as schema from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle({ client: client as unknown as Client, schema });

export { db };
