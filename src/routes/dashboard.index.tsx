import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Copy,
	ExternalLink,
	Eye,
	MousePointerClick,
	Package,
	Store,
	UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

import { InlineAlert, MetricCard } from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardHomePage,
});

const publicUrl = "/lucasreviews";

function DashboardHomePage() {
	return (
		<>
			<section className="mt-7 rounded-lg border bg-surface p-5 shadow-sm">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-sm font-bold text-muted-foreground">
							Link publico da vitrine
						</p>
						<p className="mt-2 break-all text-2xl font-extrabold text-foreground">
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
				<MetricCard
					icon={<Package className="size-5" aria-hidden="true" />}
					label="Produtos cadastrados"
					value="3"
				/>
				<MetricCard
					icon={<Store className="size-5" aria-hidden="true" />}
					label="Produtos ativos"
					value="2"
				/>
				<MetricCard
					icon={<Eye className="size-5" aria-hidden="true" />}
					label="Visualizacoes"
					value="184"
				/>
				<MetricCard
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
					description="Revisar recomendacoes, estados ativo/inativo e destaque."
					to="/dashboard/products"
				/>
			</section>

			<div className="mt-6">
				<InlineAlert tone="info" title="Metricas demonstrativas">
					Visualizacoes e cliques usam dados de exemplo enquanto o registro real
					nao esta conectado.
				</InlineAlert>
			</div>
		</>
	);
}

function QuickAction({
	icon,
	title,
	description,
	to,
}: {
	icon: ReactNode;
	title: string;
	description: string;
	to: "/dashboard/profile" | "/dashboard/products";
}) {
	return (
		<Link
			to={to}
			className="group rounded-lg border bg-surface p-5 text-foreground no-underline shadow-sm transition hover:bg-accent"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
					{icon}
				</div>
				<ArrowRight
					className="size-5 text-muted-foreground transition group-hover:translate-x-1"
					aria-hidden="true"
				/>
			</div>
			<h2 className="mt-4 text-xl font-extrabold">{title}</h2>
			<p className="mt-2 text-sm leading-6 text-muted-foreground">
				{description}
			</p>
		</Link>
	);
}
