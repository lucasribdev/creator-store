import type { ReactNode } from "react";

type PageHeaderProps = {
	kicker?: string;
	title: string;
	description?: string;
	actions?: ReactNode;
	status?: ReactNode;
};

export function PageHeader({
	kicker,
	title,
	description,
	actions,
	status,
}: PageHeaderProps) {
	return (
		<header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
			<div className="min-w-0">
				{kicker ? (
					<p className="text-sm font-bold text-primary uppercase">{kicker}</p>
				) : null}
				<h1 className="mt-2 text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
					{title}
				</h1>
				{description ? (
					<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
						{description}
					</p>
				) : null}
			</div>
			{(actions ?? status) ? (
				<div className="flex shrink-0 flex-col gap-2 sm:items-end">
					{status}
					{actions}
				</div>
			) : null}
		</header>
	);
}
