import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, UserPlus } from "lucide-react";

import { InlineAlert } from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
	return (
		<main className="min-h-screen px-5 py-6 text-[var(--sea-ink)]">
			<div className="mx-auto flex w-full max-w-md flex-col gap-8">
				<Button asChild variant="ghost" className="w-fit px-0">
					<Link to="/">
						<ArrowLeft aria-hidden="true" />
						Voltar
					</Link>
				</Button>

				<section className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
					<div className="flex size-11 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
						<UserPlus className="size-5" aria-hidden="true" />
					</div>
					<h1 className="mt-5 text-3xl font-extrabold">Criar conta</h1>
					<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
						Comece pela configuracao da pagina publica e dos produtos
						recomendados.
					</p>

					<form className="mt-6 space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nome</Label>
							<Input
								id="name"
								placeholder="Lucas Reviews"
								autoComplete="name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="criador@email.com"
								autoComplete="email"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Senha</Label>
							<Input
								id="password"
								type="password"
								placeholder="********"
								autoComplete="new-password"
							/>
						</div>
						<InlineAlert tone="info" title="Cadastro em preparacao">
							O envio dos dados sera conectado em uma etapa posterior. Por
							enquanto, continue para revisar a experiencia inicial.
						</InlineAlert>
					</form>
					<Button asChild className="mt-4 w-full">
						<Link to="/dashboard">Continuar para o painel</Link>
					</Button>
				</section>
			</div>
		</main>
	);
}
