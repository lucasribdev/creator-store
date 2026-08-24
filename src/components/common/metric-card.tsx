import type { ReactNode } from "react";

type MetricCardProps = {
	icon?: ReactNode;
	label: string;
	value: string;
};

export function MetricCard({ icon, label, value }: MetricCardProps) {
	return (
		<article className="rounded-2xl border border-border/80 bg-surface p-4 shadow-xs transition-all duration-[180ms] ease-in-out hover:border-primary/30">
			<div className="flex items-center justify-between gap-3">
				{icon ? (
					<div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
						{icon}
					</div>
				) : null}
				<p className="text-3xl font-extrabold text-foreground">{value}</p>
			</div>
			<p className="mt-4 text-sm font-bold text-muted-foreground">{label}</p>
		</article>
	);
}
