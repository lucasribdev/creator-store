import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon, Store } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";
import { cn } from "#/lib/utils.ts";

type AuthScreenProps = {
	backTo: LinkProps["to"];
	backLabel?: string;
	title: string;
	description: string;
	children: ReactNode;
	footer?: ReactNode;
};

export function AuthScreen({
	backTo,
	backLabel = "Voltar",
	title,
	description,
	children,
	footer,
}: AuthScreenProps) {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<header className="mx-auto flex min-h-16 w-full max-w-md items-center px-4 sm:px-6">
				<Button asChild variant="ghost" className="-ml-3">
					<Link to={backTo}>
						<ArrowLeft aria-hidden="true" />
						{backLabel}
					</Link>
				</Button>
			</header>

			<main className="mx-auto flex w-full max-w-md flex-col px-4 pb-10 pt-2 sm:px-6">
				<div className="flex flex-col items-center text-center">
					<div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs">
						<Store className="size-7" aria-hidden="true" />
					</div>
					<h1 className="mt-5 text-3xl font-extrabold tracking-normal text-slate-950">
						{title}
					</h1>
					<p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
						{description}
					</p>
				</div>

				<section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
					{children}
				</section>

				{footer ? (
					<div className="mt-5 text-center text-sm text-slate-600">
						{footer}
					</div>
				) : null}
			</main>
		</div>
	);
}

type AuthInputProps = ComponentProps<"input"> & {
	icon: LucideIcon;
	label: string;
};

export function AuthInput({
	className,
	icon: Icon,
	id,
	label,
	...props
}: AuthInputProps) {
	return (
		<div className="space-y-2">
			<Label
				htmlFor={id}
				className="text-xs font-bold uppercase text-slate-700"
			>
				{label}
			</Label>
			<div className="relative">
				<Icon
					className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
					aria-hidden="true"
				/>
				<Input
					id={id}
					className={cn("h-11 bg-white pl-10", className)}
					{...props}
				/>
			</div>
		</div>
	);
}

export function AuthError({ children }: { children: ReactNode }) {
	return (
		<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-900">
			{children}
		</div>
	);
}
