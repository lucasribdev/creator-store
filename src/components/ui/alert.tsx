import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type * as React from "react";

import { cn } from "#/lib/utils.ts";

const alertVariants = cva(
	"relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-2xl border px-4 py-3 text-sm [&_svg]:mt-0.5 [&_svg]:size-5 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"border-border bg-surface text-foreground [&_svg]:text-primary",
				info: "border-[color-mix(in_oklab,var(--primary)_26%,var(--border))] bg-[color-mix(in_oklab,var(--primary)_7%,var(--surface))] text-foreground [&_svg]:text-primary",
				success:
					"border-[color-mix(in_oklab,var(--success)_28%,var(--border))] bg-[color-mix(in_oklab,var(--success)_8%,var(--surface))] text-foreground [&_svg]:text-success",
				warning:
					"border-[color-mix(in_oklab,var(--warning)_32%,var(--border))] bg-[color-mix(in_oklab,var(--warning)_9%,var(--surface))] text-foreground [&_svg]:text-warning",
				destructive:
					"border-[color-mix(in_oklab,var(--danger)_32%,var(--border))] bg-[color-mix(in_oklab,var(--danger)_8%,var(--surface))] text-foreground [&_svg]:text-danger",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const alertIcons = {
	default: Info,
	info: Info,
	success: CheckCircle2,
	warning: AlertTriangle,
	destructive: AlertCircle,
};

function Alert({
	className,
	variant = "default",
	icon,
	children,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof alertVariants> & {
		icon?: React.ReactNode;
	}) {
	const Icon = variant ? alertIcons[variant] : alertIcons.default;

	return (
		<div
			role="alert"
			data-slot="alert"
			className={cn(alertVariants({ variant, className }))}
			{...props}
		>
			{icon ?? <Icon aria-hidden="true" />}
			{children}
		</div>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn("col-start-2 font-bold leading-none", className)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn("col-start-2 text-muted-foreground", className)}
			{...props}
		/>
	);
}

export { Alert, AlertDescription, AlertTitle, alertVariants };
