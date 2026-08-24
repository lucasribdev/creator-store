import type { ReactNode } from "react";

type SectionHeaderProps = {
	icon?: ReactNode;
	title: string;
	description?: string;
	actions?: ReactNode;
};

export function SectionHeader({
	icon,
	title,
	description,
	actions,
}: SectionHeaderProps) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
			<div className="min-w-0">
				{icon ? (
					<div className="mb-4 flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
						{icon}
					</div>
				) : null}
				<h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
					{title}
				</h2>
				{description ? (
					<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
						{description}
					</p>
				) : null}
			</div>
			{actions ? <div className="shrink-0">{actions}</div> : null}
		</div>
	);
}
