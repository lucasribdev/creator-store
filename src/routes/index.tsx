import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, LogIn, Store, UserPlus } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="min-h-screen px-5 py-5 text-[var(--sea-ink)] sm:px-8">
			<header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 py-2">
				<Link
					to="/"
					className="flex items-center gap-2 font-extrabold text-[var(--sea-ink)] no-underline"
				>
					<span className="flex size-9 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
						<Store className="size-5" aria-hidden="true" />
					</span>
					<span>Creator Store</span>
				</Link>

				<nav className="flex items-center gap-2">
					<Button asChild variant="ghost" size="sm">
						<Link to="/login">
							<LogIn aria-hidden="true" />
							Entrar
						</Link>
					</Button>
					<Button asChild size="sm">
						<Link to="/signup">
							<UserPlus aria-hidden="true" />
							Criar conta
						</Link>
					</Button>
				</nav>
			</header>

			<main className="mx-auto grid w-full max-w-6xl gap-10 pb-12 pt-10 md:min-h-[calc(100vh-5rem)] md:grid-cols-[minmax(0,1fr)_24rem] md:items-center md:pt-6">
				<section className="max-w-3xl">
					<p className="font-bold text-sm text-[var(--kicker)] uppercase tracking-normal">
						Link da bio para recomendacoes
					</p>
					<h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-[var(--sea-ink)] sm:text-5xl lg:text-6xl">
						Transforme suas recomendacoes em uma vitrine simples de
						compartilhar.
					</h1>
					<p className="mt-5 max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)] sm:text-lg">
						A Creator Store ajuda criadores a organizar perfil, redes sociais e
						produtos recomendados em uma pagina publica mobile first. A compra
						continua acontecendo fora da plataforma.
					</p>

					<div className="mt-7 flex flex-col gap-3 sm:flex-row">
						<Button asChild size="lg">
							<Link to="/signup">
								Comecar prototipo
								<ArrowRight aria-hidden="true" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link
								to="/$username"
								params={{ username: "lucasreviews" }}
								search={{ empty: false, published: true }}
							>
								Ver vitrine ficticia
								<ExternalLink aria-hidden="true" />
							</Link>
						</Button>
					</div>
				</section>

				<section
					aria-label="Previa de vitrine publica"
					className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-4 shadow-sm"
				>
					<div className="rounded-md bg-[var(--sea-ink)] p-5 text-white">
						<div className="size-16 rounded-full bg-white/20" />
						<h2 className="mt-4 text-2xl font-bold">Lucas Reviews</h2>
						<p className="mt-2 text-sm leading-6 text-white/80">
							Produtos e acessorios que uso e recomendo.
						</p>
					</div>
					<div className="mt-4 space-y-3">
						<div className="rounded-md border border-[var(--line)] bg-white/80 p-4">
							<p className="text-xs font-bold text-[var(--palm)] uppercase">
								Produto em destaque
							</p>
							<p className="mt-1 font-bold">Fone Bluetooth compacto</p>
							<p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
								Link externo cadastrado pelo criador.
							</p>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="h-24 rounded-md border border-[var(--line)] bg-white/70" />
							<div className="h-24 rounded-md border border-[var(--line)] bg-white/70" />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
