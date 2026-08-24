import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Package, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader, StatusBadge } from "#/components/common/index.ts";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,
});

const isPublished = true;

function DashboardLayout() {
	return (
		<main className="min-h-screen px-4 py-5 text-foreground sm:px-8 sm:py-7">
			<div className="mx-auto w-full max-w-6xl">
				<PageHeader
					kicker="Painel"
					title="Boas-vindas, Lucas Reviews"
					description="Gerencie o status da pagina, o perfil publico e os produtos recomendados."
					status={<PageStatusBadge published={isPublished} />}
				/>

				<nav
					className="mt-5 flex gap-2 overflow-x-auto rounded-lg border bg-surface p-1 shadow-sm"
					aria-label="Navegacao da area privada"
				>
					<DashboardNavLink
						to="/dashboard"
						icon={<LayoutDashboard aria-hidden="true" />}
						label="Painel"
						exact
					/>
					<DashboardNavLink
						to="/dashboard/profile"
						icon={<UserRound aria-hidden="true" />}
						label="Perfil"
					/>
					<DashboardNavLink
						to="/dashboard/products"
						icon={<Package aria-hidden="true" />}
						label="Produtos"
					/>
				</nav>

				<Outlet />
			</div>
		</main>
	);
}

function DashboardNavLink({
	to,
	icon,
	label,
	exact = false,
}: {
	to: "/dashboard" | "/dashboard/profile" | "/dashboard/products";
	icon: ReactNode;
	label: string;
	exact?: boolean;
}) {
	return (
		<Link
			to={to}
			data-slot="button"
			activeOptions={{ exact }}
			activeProps={{
				className:
					"bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground",
			}}
			inactiveProps={{
				className:
					"text-muted-foreground hover:bg-accent hover:text-foreground",
			}}
			className="inline-flex h-10 min-w-28 shrink-0 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold no-underline"
		>
			<span className="[&_svg]:size-4">{icon}</span>
			{label}
		</Link>
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
