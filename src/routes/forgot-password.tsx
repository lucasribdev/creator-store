import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { InlineAlert } from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";

export const Route = createFileRoute("/forgot-password")({
	validateSearch: (search: Record<string, unknown>) => ({
		error:
			search.error === true || search.error === 1 || search.error === "1"
				? 1
				: undefined,
	}),
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	const search = Route.useSearch();
	const hasError = search.error === 1;
	const [sent, setSent] = useState(false);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSent(true);
	}

	return (
		<main className="min-h-screen px-5 py-6 text-[var(--sea-ink)]">
			<div className="mx-auto flex w-full max-w-md flex-col gap-8">
				<Button asChild variant="ghost" className="w-fit px-0">
					<Link to="/login">
						<ArrowLeft aria-hidden="true" />
						Voltar para login
					</Link>
				</Button>

				<section className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
					<div className="flex size-11 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
						<Mail className="size-5" aria-hidden="true" />
					</div>
					<h1 className="mt-5 text-3xl font-extrabold">Recuperar senha</h1>
					<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
						Informe o email usado na Creator Store para receber as instrucoes de
						recuperacao.
					</p>

					<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="criador@email.com"
								autoComplete="email"
								required
							/>
						</div>

						{hasError ? (
							<InlineAlert tone="danger" title="Nao foi possivel enviar">
								Tente novamente em instantes. Se o problema continuar, volte ao
								login e refaca o acesso mais tarde.
							</InlineAlert>
						) : null}

						{sent ? (
							<InlineAlert tone="success" title="Confira seu email">
								Se esse email estiver cadastrado, as instrucoes para recuperar a
								senha serao enviadas.
							</InlineAlert>
						) : null}

						<Button type="submit" className="w-full">
							{sent ? (
								<>
									<RotateCcw aria-hidden="true" />
									Reenviar instrucoes
								</>
							) : (
								"Enviar instrucoes"
							)}
						</Button>
					</form>

					<div className="mt-5 flex flex-col gap-2 text-center text-sm sm:flex-row sm:justify-center sm:gap-4">
						<Link
							to="/login"
							className="font-bold text-[var(--sea-ink)] underline-offset-4 hover:underline"
						>
							Voltar para login
						</Link>
						<Link
							to="/"
							className="font-bold text-[var(--sea-ink)] underline-offset-4 hover:underline"
						>
							Voltar para home
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
