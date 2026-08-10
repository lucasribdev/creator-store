import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BarChart3,
	Copy,
	ExternalLink,
	Eye,
	MousePointerClick,
	Package,
	Store,
	UserRound,
} from "lucide-react";

import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardHomePage,
});

const publicUrl = "/lucasreviews";

function DashboardHomePage() {
	return (
		<>
			<section className="mt-7 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-sm font-bold text-[var(--sea-ink-soft)]">
							Link publico da vitrine
						</p>
						<p className="mt-2 break-all text-2xl font-extrabold">
							{publicUrl}
						</p>
					</div>

					<div className="grid gap-2 sm:grid-cols-2">
						<Button asChild>
							<Link
								to="/$username"
								params={{ username: "lucasreviews" }}
								search={{ empty: false, published: true }}
							>
								Ver pagina
								<ExternalLink aria-hidden="true" />
							</Link>
						</Button>
						<Button type="button" variant="outline">
							<Copy aria-hidden="true" />
							Copiar link
						</Button>
					</div>
				</div>
			</section>

			<section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<DashboardMetric
					icon={<Package className="size-5" aria-hidden="true" />}
					label="Produtos cadastrados"
					value="3"
				/>
				<DashboardMetric
					icon={<Store className="size-5" aria-hidden="true" />}
					label="Produtos ativos"
					value="2"
				/>
				<DashboardMetric
					icon={<Eye className="size-5" aria-hidden="true" />}
					label="Visualizacoes"
					value="184"
				/>
				<DashboardMetric
					icon={<MousePointerClick className="size-5" aria-hidden="true" />}
					label="Cliques"
					value="37"
				/>
			</section>

			<section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
				<QuickAction
					icon={<UserRound className="size-5" aria-hidden="true" />}
					title="Editar perfil"
					description="Ajustar username, nome publico, bio e identidade da pagina."
					to="/dashboard/profile"
				/>
				<QuickAction
					icon={<Package className="size-5" aria-hidden="true" />}
					title="Gerenciar produtos"
					description="Revisar produtos ficticios, estados ativo/inativo e destaque."
					to="/dashboard/products"
				/>
			</section>

			<section className="mt-6 rounded-lg border border-[var(--line)] bg-white/80 p-5 shadow-sm">
				<div className="flex items-start gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
						<BarChart3 className="size-5" aria-hidden="true" />
					</div>
					<div>
						<h2 className="text-xl font-extrabold">Metricas simuladas</h2>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Visualizacoes e cliques sao apenas numeros ficticios para validar
							a organizacao do painel. O registro real fica fora desta etapa.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

function DashboardMetric({
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
			<div className="flex items-center justify-between gap-3">
				<div className="flex size-10 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
					{icon}
				</div>
				<p className="text-3xl font-extrabold">{value}</p>
			</div>
			<p className="mt-4 text-sm font-bold text-[var(--sea-ink-soft)]">
				{label}
			</p>
		</article>
	);
}

function QuickAction({
	icon,
	title,
	description,
	to,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	to: "/dashboard/profile" | "/dashboard/products";
}) {
	return (
		<Link
			to={to}
			className="group rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 text-[var(--sea-ink)] no-underline shadow-sm transition hover:bg-white"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
					{icon}
				</div>
				<ArrowRight
					className="size-5 text-[var(--sea-ink-soft)] transition group-hover:translate-x-1"
					aria-hidden="true"
				/>
			</div>
			<h2 className="mt-4 text-xl font-extrabold">{title}</h2>
			<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
				{description}
			</p>
		</Link>
	);
}
