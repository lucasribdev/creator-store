import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema.ts";

export function createDb(databaseUrl: string) {
	return drizzle(databaseUrl, { schema });
}

export function getDatabaseUrl() {
	const databaseUrl = process.env.DATABASE_URL;

	if (!databaseUrl) {
		throw new Error("DATABASE_URL is required");
	}

	return databaseUrl;
}

export function getDb() {
	return createDb(getDatabaseUrl());
}
