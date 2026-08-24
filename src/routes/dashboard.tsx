import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Link2, Package, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import {
	AppShell,
	DashboardHeader,
	PageHeader,
	StatusPill,
} from "#/components/common/index.ts";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,
});

const isPublished = true;

function DashboardLayout() {
	return (
		<AppShell
			header={
				<DashboardHeader
					displayName="Lucas Reviews"
					username="lucasreviews"
					published={isPublished}
				/>
			}
			mainClassName="max-w-6xl"
		>
			<div className="space-y-5">
				<PageHeader
					kicker="Painel"
					title="Boas-vindas, Lucas Reviews"
					description="Gerencie o status da pagina, o perfil publico e os produtos recomendados."
					status={<PageStatusBadge published={isPublished} />}
				/>

				<nav
					className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-border/80 bg-surface p-1 shadow-xs"
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
					<DashboardNavLink
						to="/dashboard/social-links"
						icon={<Link2 aria-hidden="true" />}
						label="Redes sociais"
					/>
				</nav>

				<Outlet />
			</div>
		</AppShell>
	);
}

function DashboardNavLink({
	to,
	icon,
	label,
	exact = false,
}: {
	to:
		| "/dashboard"
		| "/dashboard/profile"
		| "/dashboard/products"
		| "/dashboard/social-links";
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
			className="inline-flex h-10 min-w-28 shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold no-underline"
		>
			<span className="[&_svg]:size-4">{icon}</span>
			{label}
		</Link>
	);
}

function PageStatusBadge({ published }: { published: boolean }) {
	return (
		<div className="w-fit rounded-2xl border border-border/80 bg-surface px-4 py-3 shadow-xs">
			<p className="text-xs font-bold text-muted-foreground uppercase">
				Status da pagina
			</p>
			<div className="mt-2 flex items-center gap-2">
				<StatusPill published={published} />
			</div>
		</div>
	);
}
