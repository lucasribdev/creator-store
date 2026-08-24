import { Check } from "lucide-react";

import { cn } from "#/lib/utils.ts";

type ToastProps = {
	message: string;
	visible: boolean;
	className?: string;
};

export function Toast({ message, visible, className }: ToastProps) {
	if (!visible) {
		return null;
	}

	return (
		<output
			className={cn(
				"fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3",
				className,
			)}
			aria-live="polite"
		>
			<Check className="size-4 text-emerald-400" aria-hidden="true" />
			<span>{message}</span>
		</output>
	);
}
