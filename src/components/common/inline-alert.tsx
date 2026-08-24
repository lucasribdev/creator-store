import {
	AlertTriangle,
	CheckCircle2,
	Info,
	type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type InlineAlertTone = "info" | "success" | "warning" | "danger";

type InlineAlertProps = {
	tone?: InlineAlertTone;
	title?: string;
	children: ReactNode;
};

const toneClassName: Record<InlineAlertTone, string> = {
	info: "border-border bg-surface text-foreground [&_svg]:text-primary",
	success:
		"border-[color-mix(in_oklab,var(--success)_28%,var(--border))] bg-[color-mix(in_oklab,var(--success)_8%,var(--surface))] text-foreground [&_svg]:text-success",
	warning:
		"border-[color-mix(in_oklab,var(--warning)_32%,var(--border))] bg-[color-mix(in_oklab,var(--warning)_9%,var(--surface))] text-foreground [&_svg]:text-warning",
	danger:
		"border-[color-mix(in_oklab,var(--danger)_32%,var(--border))] bg-[color-mix(in_oklab,var(--danger)_8%,var(--surface))] text-foreground [&_svg]:text-danger",
};

const toneIcon: Record<InlineAlertTone, LucideIcon> = {
	info: Info,
	success: CheckCircle2,
	warning: AlertTriangle,
	danger: AlertTriangle,
};

export function InlineAlert({
	tone = "info",
	title,
	children,
}: InlineAlertProps) {
	const Icon = toneIcon[tone];

	return (
		<div
			className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-xs ${toneClassName[tone]}`}
		>
			<Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
			<div>
				{title ? <p className="font-bold">{title}</p> : null}
				<div className={title ? "mt-1 text-muted-foreground" : undefined}>
					{children}
				</div>
			</div>
		</div>
	);
}
