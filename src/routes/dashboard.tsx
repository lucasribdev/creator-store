import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,
});

const isPublished = true;

function DashboardLayout() {
	return (
		<main className="min-h-screen px-5 py-6 text-[var(--sea-ink)] sm:px-8">
			<div className="mx-auto w-full max-w-6xl">
				<header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<p className="font-bold text-sm text-[var(--kicker)] uppercase">
							Painel ficticio
						</p>
						<h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
							Boas-vindas, Lucas Reviews
						</h1>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--sea-ink-soft)]">
							Resumo visual do painel minimo do MVP. Os numeros e estados sao
							ficticios nesta etapa do prototipo.
						</p>
					</div>

					<StatusBadge published={isPublished} />
				</header>

				<Outlet />
			</div>
		</main>
	);
}

function StatusBadge({ published }: { published: boolean }) {
	return (
		<div className="w-fit rounded-lg border border-[var(--line)] bg-white/85 px-4 py-3 shadow-sm">
			<p className="text-xs font-bold text-[var(--sea-ink-soft)] uppercase">
				Status da pagina
			</p>
			<div className="mt-2 flex items-center gap-2">
				<span
					className="size-2.5 rounded-full bg-[var(--palm)]"
					aria-hidden="true"
				/>
				<p className="font-extrabold">
					{published ? "Publicada" : "Despublicada"}
				</p>
			</div>
		</div>
	);
}
