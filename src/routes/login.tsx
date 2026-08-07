import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LogIn } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
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
						<LogIn className="size-5" aria-hidden="true" />
					</div>
					<h1 className="mt-5 text-3xl font-extrabold">Entrar</h1>
					<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
						Tela simulada para navegar ate o painel do criador nas proximas
						entregas do prototipo.
					</p>

					<form className="mt-6 space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="criador@email.com" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Senha</Label>
							<Input id="password" type="password" placeholder="********" />
						</div>
						<p className="rounded-md border border-[var(--line)] bg-white/70 px-3 py-2 text-sm text-[var(--sea-ink-soft)]">
							Prototipo sem autenticacao real: o botao leva direto ao painel.
						</p>
					</form>
					<Button asChild className="mt-4 w-full">
						<Link to="/dashboard">Entrar no prototipo</Link>
					</Button>
				</section>
			</div>
		</main>
	);
}
