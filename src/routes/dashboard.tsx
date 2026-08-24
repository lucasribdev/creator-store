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
					className="mt-5 grid grid-cols-4 gap-1 rounded-2xl border border-border/80 bg-surface p-1 shadow-xs sm:flex sm:gap-2"
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
					"bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
			}}
			inactiveProps={{
				className:
					"text-muted-foreground hover:bg-accent/70 hover:text-foreground",
			}}
			className="inline-flex h-12 min-w-0 items-center justify-center gap-1 rounded-xl px-1 text-center text-[0.6875rem] font-bold leading-none no-underline transition-colors duration-[180ms] ease-in-out outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:h-10 sm:min-w-28 sm:flex-row sm:gap-2 sm:px-3 sm:text-sm"
		>
			<span className="[&_svg]:size-4">{icon}</span>
			<span className="min-w-0 text-balance">{label}</span>
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
