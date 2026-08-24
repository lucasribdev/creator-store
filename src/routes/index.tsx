import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, ImageOff } from "lucide-react";

import {
	AppShell,
	PublicHeader,
	StatusBadge,
} from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<AppShell header={<PublicHeader />} mainClassName="max-w-6xl">
			<div className="grid gap-8 pt-4 md:min-h-[calc(100vh-7rem)] md:grid-cols-[minmax(0,1fr)_22rem] md:items-center lg:grid-cols-[minmax(0,1fr)_24rem]">
				<section className="max-w-2xl">
					<p className="island-kicker">Link da bio para recomendacoes</p>
					<h1 className="display-title mt-4 max-w-2xl text-4xl font-bold leading-tight text-foreground sm:text-5xl">
						Transforme o link da bio em uma vitrine de produtos recomendados.
					</h1>
					<p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
						Organize perfil, redes sociais e recomendacoes em uma pagina publica
						feita para celular. O visitante descobre o produto e segue para o
						link externo cadastrado pelo criador.
					</p>

					<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
						<Button asChild size="lg">
							<Link to="/signup">
								Criar conta
								<ArrowRight aria-hidden="true" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link
								to="/$username"
								params={{ username: "lucasreviews" }}
								search={{ empty: false, published: true }}
							>
								Ver exemplo de vitrine
								<ExternalLink aria-hidden="true" />
							</Link>
						</Button>
					</div>

					<ul className="mt-7 grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-3">
						<li className="rounded-md border bg-surface px-3 py-2">
							Produtos cadastrados manualmente
						</li>
						<li className="rounded-md border bg-surface px-3 py-2">
							Pagina publica sem login
						</li>
						<li className="rounded-md border bg-surface px-3 py-2">
							Cliques levam para fora da plataforma
						</li>
					</ul>
				</section>

				<section
					aria-label="Previa de vitrine publica"
					className="island-shell rounded-lg p-4"
				>
					<div className="rounded-md bg-primary p-5 text-primary-foreground">
						<div className="size-16 rounded-full bg-primary-foreground/20" />
						<h2 className="mt-4 text-2xl font-extrabold">Lucas Reviews</h2>
						<p className="mt-1 text-sm font-semibold text-primary-foreground/75">
							@lucasreviews
						</p>
						<p className="mt-2 text-sm leading-6 text-primary-foreground/85">
							Produtos e acessorios que uso e recomendo.
						</p>
					</div>
					<div className="mt-4 space-y-3">
						<div className="rounded-md border bg-surface p-4">
							<StatusBadge tone="success" icon="featured">
								Produto em destaque
							</StatusBadge>
							<p className="mt-1 font-bold">Fone Bluetooth compacto</p>
							<p className="mt-1 text-sm text-muted-foreground">
								Link externo cadastrado pelo criador.
							</p>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="h-24 rounded-md border bg-surface-muted" />
							<div className="flex h-24 items-center justify-center rounded-md border border-dashed bg-surface text-muted-foreground">
								<ImageOff className="size-5" aria-hidden="true" />
							</div>
						</div>
					</div>
				</section>
			</div>
		</AppShell>
	);
}
