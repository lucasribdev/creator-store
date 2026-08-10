import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { sql } from "drizzle-orm";

import { createDb, getDatabaseUrl } from "#/db/index.ts";

export const Route = createFileRoute("/api/health/db")({
	server: {
		handlers: {
			GET: async () => {
				try {
					const db = createDb(getDatabaseUrl());
					const result = await db.execute(sql`select 1 as ok`);
					const row = result.rows[0] as { ok?: unknown } | undefined;

					return Response.json(
						{ ok: row?.ok === 1 || row?.ok === "1" },
						{ headers: { "Cache-Control": "no-store" } },
					);
				} catch {
					return Response.json(
						{ ok: false, error: "database_connection_failed" },
						{ status: 503, headers: { "Cache-Control": "no-store" } },
					);
				}
			},
		},
	},
});
