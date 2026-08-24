import { Eye, EyeOff, ImageOff, Star } from "lucide-react";
import type { ReactNode } from "react";

type StatusBadgeTone = "neutral" | "success" | "warning" | "danger";
type StatusBadgeIcon = "active" | "inactive" | "featured" | "image-missing";

type StatusBadgeProps = {
	children: ReactNode;
	tone?: StatusBadgeTone;
	icon?: StatusBadgeIcon;
};

const toneClassName: Record<StatusBadgeTone, string> = {
	neutral: "border-border bg-muted text-foreground",
	success:
		"border-[color-mix(in_oklab,var(--success)_30%,var(--border))] bg-[color-mix(in_oklab,var(--success)_9%,var(--surface))] text-success",
	warning:
		"border-[color-mix(in_oklab,var(--warning)_34%,var(--border))] bg-[color-mix(in_oklab,var(--warning)_9%,var(--surface))] text-warning",
	danger:
		"border-[color-mix(in_oklab,var(--danger)_34%,var(--border))] bg-[color-mix(in_oklab,var(--danger)_8%,var(--surface))] text-danger",
};

const icons = {
	active: Eye,
	inactive: EyeOff,
	featured: Star,
	"image-missing": ImageOff,
};

export function StatusBadge({
	children,
	tone = "neutral",
	icon,
}: StatusBadgeProps) {
	const Icon = icon ? icons[icon] : null;

	return (
		<span
			className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-bold ${toneClassName[tone]}`}
		>
			{Icon ? <Icon className="size-3" aria-hidden="true" /> : null}
			{children}
		</span>
	);
}
