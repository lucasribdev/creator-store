import type { ReactNode } from "react";

type EmptyStateProps = {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
	variant?: "default" | "products";
};

export function EmptyState({
	icon,
	title,
	description,
	action,
	variant = "default",
}: EmptyStateProps) {
	const isProducts = variant === "products";

	return (
		<section
			className={
				isProducts
					? "rounded-3xl border border-dashed border-slate-300/80 bg-white p-6 shadow-xs"
					: "rounded-2xl border border-dashed border-border/80 bg-surface p-5 shadow-xs"
			}
		>
			{icon ? (
				<div
					className={
						isProducts
							? "flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
							: "flex size-11 items-center justify-center rounded-2xl bg-muted text-muted-foreground"
					}
				>
					{icon}
				</div>
			) : null}
			<h3 className="mt-4 text-lg font-extrabold text-foreground">{title}</h3>
			{description ? (
				<p className="mt-2 text-sm leading-6 text-muted-foreground">
					{description}
				</p>
			) : null}
			{action ? <div className="mt-4">{action}</div> : null}
		</section>
	);
}
