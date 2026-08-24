import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Copy,
	ExternalLink,
	Eye,
	Link2,
	MousePointerClick,
	Package,
	Plus,
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
			<section className="mt-6 rounded-lg border bg-surface p-4 shadow-sm sm:p-5">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div className="min-w-0">
						<p className="text-xs font-bold text-muted-foreground uppercase">
							Link publico da vitrine
						</p>
						<p className="mt-2 break-all text-xl font-extrabold text-foreground sm:text-2xl">
							{publicUrl}
						</p>
					</div>

					<div className="grid gap-2 sm:grid-cols-2 lg:min-w-72">
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

			<section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<QuickAction
					icon={<UserRound className="size-5" aria-hidden="true" />}
					title="Editar perfil"
					description="Username, nome publico, bio, avatar e banner."
					to="/dashboard/profile"
				/>
				<QuickAction
					icon={<Link2 className="size-5" aria-hidden="true" />}
					title="Redes sociais"
					description="Atualizar os links exibidos na pagina publica."
					to="/dashboard/social-links"
				/>
				<QuickAction
					icon={<Plus className="size-5" aria-hidden="true" />}
					title="Adicionar produto"
					description="Cadastrar uma nova recomendacao com link externo."
					to="/dashboard/products/new"
				/>
				<QuickAction
					icon={<Package className="size-5" aria-hidden="true" />}
					title="Gerenciar produtos"
					description="Revisar status, destaque, imagens e links externos."
					to="/dashboard/products"
				/>
			</section>

			<div className="mt-6">
				<InlineAlert tone="info" title="Metricas basicas">
					Acompanhe visualizacoes e cliques para entender quais recomendacoes
					geram mais interesse.
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
	to:
		| "/dashboard/profile"
		| "/dashboard/products"
		| "/dashboard/products/new"
		| "/dashboard/social-links";
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
