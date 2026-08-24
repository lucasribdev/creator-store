import { Link } from "@tanstack/react-router";
import { ExternalLink, LogIn, Store, UserPlus } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";
import { StatusBadge } from "./status-badge.tsx";

type AppShellProps = {
	children: ReactNode;
	header: ReactNode;
	className?: string;
	mainClassName?: string;
};

export function AppShell({
	children,
	header,
	className,
	mainClassName,
}: AppShellProps) {
	return (
		<div
			className={cn(
				"min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100",
				className,
			)}
		>
			{header}
			<main
				className={cn(
					"mx-auto w-full px-4 pb-10 pt-4 sm:px-6 lg:px-8",
					mainClassName,
				)}
			>
				{children}
			</main>
		</div>
	);
}

export function PublicHeader() {
	return (
		<header className="border-b bg-surface/95 backdrop-blur">
			<div className="mx-auto flex min-h-14 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
				<BrandLink />

				<nav className="flex shrink-0 items-center gap-1.5 sm:gap-2">
					<Button asChild variant="ghost" size="sm">
						<Link to="/login" aria-label="Entrar">
							<LogIn aria-hidden="true" />
							<span className="hidden sm:inline">Entrar</span>
						</Link>
					</Button>
					<Button asChild size="sm">
						<Link to="/signup">
							<UserPlus aria-hidden="true" />
							<span className="hidden min-[360px]:inline">Criar conta</span>
						</Link>
					</Button>
				</nav>
			</div>
		</header>
	);
}

export function DashboardHeader({
	displayName,
	username,
	published,
}: {
	displayName: string;
	username: string;
	published: boolean;
}) {
	const initials = displayName
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<header className="border-b bg-surface/95 backdrop-blur">
			<div className="mx-auto flex min-h-14 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
				<BrandLink />

				<div className="flex min-w-0 items-center gap-2 sm:gap-3">
					<StatusPill published={published} />
					<a
						href={`/${username}`}
						target="_blank"
						rel="noreferrer"
						className="hidden items-center gap-1 text-sm font-bold no-underline sm:inline-flex"
					>
						Ver pagina
						<ExternalLink className="size-3.5" aria-hidden="true" />
					</a>
					<div
						className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-muted text-sm font-extrabold text-foreground"
						title={displayName}
					>
						{initials}
					</div>
				</div>
			</div>
		</header>
	);
}

export function StatusPill({ published }: { published: boolean }) {
	return (
		<StatusBadge
			tone={published ? "success" : "warning"}
			icon={published ? "active" : "inactive"}
		>
			{published ? "Publicada" : "Despublicada"}
		</StatusBadge>
	);
}

function BrandLink() {
	return (
		<Link
			to="/"
			className="flex min-w-0 items-center gap-2 font-extrabold text-foreground no-underline"
		>
			<span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<Store className="size-5" aria-hidden="true" />
			</span>
			<span className="truncate">Creator Store</span>
		</Link>
	);
}
