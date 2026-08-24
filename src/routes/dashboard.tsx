import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PageHeader, StatusBadge } from "#/components/common/index.ts";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,
});

const isPublished = true;

function DashboardLayout() {
	return (
		<main className="min-h-screen px-5 py-6 text-foreground sm:px-8">
			<div className="mx-auto w-full max-w-6xl">
				<PageHeader
					kicker="Painel"
					title="Boas-vindas, Lucas Reviews"
					description="Acompanhe o link publico, os produtos cadastrados e os principais ajustes da sua vitrine."
					status={<PageStatusBadge published={isPublished} />}
				/>

				<Outlet />
			</div>
		</main>
	);
}

function PageStatusBadge({ published }: { published: boolean }) {
	return (
		<div className="w-fit rounded-lg border bg-surface px-4 py-3 shadow-sm">
			<p className="text-xs font-bold text-muted-foreground uppercase">
				Status da pagina
			</p>
			<div className="mt-2 flex items-center gap-2">
				<StatusBadge tone={published ? "success" : "warning"}>
					{published ? "Publicada" : "Despublicada"}
				</StatusBadge>
			</div>
		</div>
	);
}
