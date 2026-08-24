import type { ReactNode } from "react";

type EmptyStateProps = {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
};

export function EmptyState({
	icon,
	title,
	description,
	action,
}: EmptyStateProps) {
	return (
		<section className="rounded-lg border border-dashed bg-surface p-5">
			{icon ? (
				<div className="flex size-11 items-center justify-center rounded-md bg-muted text-muted-foreground">
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
