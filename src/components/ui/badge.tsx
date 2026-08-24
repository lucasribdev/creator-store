import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "#/lib/utils.ts";

const badgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center gap-1 border px-2 py-0.5 text-[0.6875rem] font-bold tracking-normal whitespace-nowrap transition-colors [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground",
				secondary: "border-transparent bg-secondary text-secondary-foreground",
				outline: "border-border bg-transparent text-foreground",
				success:
					"border-[color-mix(in_oklab,var(--success)_30%,var(--border))] bg-[color-mix(in_oklab,var(--success)_9%,var(--surface))] text-success",
				warning:
					"border-[color-mix(in_oklab,var(--warning)_34%,var(--border))] bg-[color-mix(in_oklab,var(--warning)_9%,var(--surface))] text-warning",
				destructive:
					"border-[color-mix(in_oklab,var(--danger)_34%,var(--border))] bg-[color-mix(in_oklab,var(--danger)_8%,var(--surface))] text-danger",
			},
			shape: {
				pill: "rounded-full",
				soft: "rounded-md",
			},
			tone: {
				default: "",
				uppercase: "uppercase",
			},
		},
		defaultVariants: {
			variant: "default",
			shape: "pill",
			tone: "default",
		},
	},
);

function Badge({
	className,
	variant,
	shape,
	tone,
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return (
		<span
			data-slot="badge"
			className={cn(badgeVariants({ variant, shape, tone, className }))}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
