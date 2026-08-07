import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Package, Store, UserRound } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	return (
		<main className="min-h-screen px-5 py-6 text-[var(--sea-ink)] sm:px-8">
			<div className="mx-auto w-full max-w-5xl">
				<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="font-bold text-sm text-[var(--kicker)] uppercase">
							Painel ficticio
						</p>
						<h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
							Boas-vindas, Lucas Reviews
						</h1>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Esta tela confirma a entrada simulada do criador. Os dados ainda
							nao sao persistidos.
						</p>
					</div>

					<Button asChild variant="outline">
						<Link to="/lucasreviews">
							Ver vitrine
							<ExternalLink aria-hidden="true" />
						</Link>
					</Button>
				</header>

				<section className="mt-8 grid gap-4 sm:grid-cols-3">
					<DashboardCard
						icon={<Store className="size-5" aria-hidden="true" />}
						label="Pagina publica"
						value="/lucasreviews"
					/>
					<DashboardCard
						icon={<Package className="size-5" aria-hidden="true" />}
						label="Produtos"
						value="3 itens ficticios"
					/>
					<DashboardCard
						icon={<UserRound className="size-5" aria-hidden="true" />}
						label="Perfil"
						value="Configuracao pendente"
					/>
				</section>

				<section className="mt-6 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
					<h2 className="text-xl font-extrabold">Proximas entregas</h2>
					<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
						As proximas telas do prototipo vao conectar este painel com edicao
						de perfil, lista de produtos e formulario de produto usando dados
						ficticios.
					</p>
				</section>
			</div>
		</main>
	);
}

function DashboardCard({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<article className="rounded-lg border border-[var(--line)] bg-white/85 p-4 shadow-sm">
			<div className="flex size-10 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
				{icon}
			</div>
			<p className="mt-4 text-sm font-bold text-[var(--sea-ink-soft)]">
				{label}
			</p>
			<p className="mt-1 text-lg font-extrabold">{value}</p>
		</article>
	);
}
