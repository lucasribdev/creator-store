import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LogIn } from "lucide-react";

import { AppShell, PublicHeader } from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
	return (
		<AppShell header={<PublicHeader />} mainClassName="max-w-md">
			<div className="flex w-full flex-col gap-5">
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
						Acesse seu painel para atualizar perfil, publicacao e produtos
						recomendados.
					</p>

					<form className="mt-6 space-y-4">
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
							<div className="flex items-center justify-between gap-3">
								<Label htmlFor="password">Senha</Label>
								<Link
									to="/forgot-password"
									search={{ error: undefined }}
									className="text-sm font-bold text-[var(--sea-ink)] underline-offset-4 hover:underline"
								>
									Esqueci minha senha
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="********"
								autoComplete="current-password"
							/>
						</div>
					</form>
					<Button asChild className="mt-4 w-full">
						<Link to="/dashboard">Acessar painel</Link>
					</Button>
				</section>
			</div>
		</AppShell>
	);
}
