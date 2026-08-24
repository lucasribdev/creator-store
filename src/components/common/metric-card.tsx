import type { ReactNode } from "react";

type MetricCardProps = {
	icon?: ReactNode;
	label: string;
	value: string;
};

export function MetricCard({ icon, label, value }: MetricCardProps) {
	return (
		<article className="rounded-lg border bg-surface p-4 shadow-sm transition-all duration-[180ms] ease-in-out hover:border-primary/30 hover:shadow-md">
			<div className="flex items-center justify-between gap-3">
				{icon ? (
					<div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
						{icon}
					</div>
				) : null}
				<p className="text-3xl font-extrabold text-foreground">{value}</p>
			</div>
			<p className="mt-4 text-sm font-bold text-muted-foreground">{label}</p>
		</article>
	);
}
