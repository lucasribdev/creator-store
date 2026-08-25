import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CheckCircle2,
	ExternalLink,
	Link2,
	Package,
	Sparkles,
	Store,
	TrendingUp,
	UserPlus,
} from "lucide-react";

import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import { Card } from "#/components/ui/card.tsx";

export const Route = createFileRoute("/")({ component: Home });

const benefits = [
	{
		title: "Vitrine pública",
		description: "Uma página rápida para perfil, redes e produtos ativos.",
		icon: Store,
	},
	{
		title: "Recomendações manuais",
		description: "Cadastre produtos com nome, imagem e link externo.",
		icon: Package,
	},
	{
		title: "Cliques rastreados",
		description: "Entenda quais recomendações levam visitantes para a loja.",
		icon: TrendingUp,
	},
];

function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur">
				<div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
					<Link
						to="/"
						className="flex min-w-0 items-center gap-2.5 text-foreground no-underline"
					>
						<span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
							<Store className="size-5" aria-hidden="true" />
						</span>
						<span className="truncate text-base font-black max-[430px]:sr-only">
							Creator Store
						</span>
					</Link>

					<nav className="flex shrink-0 items-center gap-2">
						<Button asChild variant="ghost" size="sm">
							<Link to="/login">Entrar</Link>
						</Button>
						<Button asChild size="sm">
							<Link to="/signup">
								<UserPlus aria-hidden="true" />
								<span>Criar conta</span>
							</Link>
						</Button>
					</nav>
				</div>
			</header>

			<main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<Card className="overflow-hidden rounded-3xl border-border/80 bg-card shadow-xs">
					<div className="grid min-w-0 gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center lg:p-10 xl:p-12">
						<section className="min-w-0">
							<Badge
								variant="secondary"
								shape="pill"
								className="max-w-full border border-primary/20 bg-primary/10 text-primary"
							>
								<Sparkles aria-hidden="true" />
								<span className="uppercase tracking-normal">Link da bio</span>
							</Badge>

							<h1 className="mt-5 max-w-3xl text-balance break-words text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
								Sua vitrine de produtos recomendados em um único link.
							</h1>
							<p className="mt-4 max-w-2xl text-pretty break-words text-base leading-7 text-muted-foreground sm:text-lg">
								Monte uma página pública para apresentar perfil, redes sociais e
								produtos favoritos. A compra acontece sempre fora da Creator
								Store.
							</p>

							<div className="mt-7 grid max-w-full gap-3 sm:flex sm:flex-wrap sm:items-center">
								<Button asChild size="lg" className="w-full min-w-0 sm:w-auto">
									<Link to="/signup">
										Criar minha vitrine
										<ArrowRight aria-hidden="true" />
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="lg"
									className="w-full min-w-0 sm:w-auto"
								>
									<Link
										to="/$username"
										params={{ username: "lucasreviews" }}
										search={{ empty: false, published: true }}
									>
										Ver exemplo
										<ExternalLink aria-hidden="true" />
									</Link>
								</Button>
							</div>
						</section>

						<section
							aria-label="Preview da vitrine"
							className="mx-auto min-w-0 w-full"
						>
							<div className="mx-auto w-full max-w-full rounded-3xl border border-border bg-slate-950 p-2 shadow-xs sm:max-w-[22rem] lg:max-w-[26rem] dark:bg-slate-100">
								<div className="aspect-[10/16] min-h-0 overflow-hidden rounded-[1.35rem] bg-surface p-4">
									<div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-muted" />
									<div className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-xs">
										<div className="flex items-center gap-3">
											<div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/20 font-black">
												LR
											</div>
											<div className="min-w-0">
												<p className="truncate text-lg font-black">
													Lucas Reviews
												</p>
												<p className="text-sm font-bold text-white/75">
													@lucasreviews
												</p>
											</div>
										</div>
										<p className="mt-3 text-sm leading-6 text-white/85">
											Acessórios que uso para gravar, editar e viajar.
										</p>
									</div>

									<div className="mt-4 flex flex-wrap gap-2">
										<span className="rounded-full border border-border px-3 py-1 text-xs font-bold text-foreground shadow-xs">
											Instagram
										</span>
										<span className="rounded-full border border-border px-3 py-1 text-xs font-bold text-foreground shadow-xs">
											YouTube
										</span>
									</div>

									<div className="mt-4 space-y-3 overflow-hidden">
										<ProductPreview
											featured
											title="Microfone sem fio compacto"
											priceLabel="Recomendado para vídeos curtos"
										/>
										<ProductPreview
											title="Luz LED portátil"
											priceLabel="Setup leve para gravação"
										/>
									</div>
								</div>
							</div>
						</section>
					</div>
				</Card>

				<section className="mt-8">
					<p className="text-xs font-black uppercase tracking-normal text-primary">
						Benefícios
					</p>
					<h2 className="mt-2 max-w-3xl text-pretty break-words text-2xl font-black text-foreground sm:text-3xl">
						Feita para criadores que recomendam com contexto.
					</h2>
					<div className="mt-4 grid gap-3 md:grid-cols-3">
						{benefits.map((benefit) => (
							<Card
								key={benefit.title}
								className="border-border bg-card p-4 shadow-xs"
							>
								<div className="flex items-start gap-3">
									<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
										<benefit.icon className="size-5" aria-hidden="true" />
									</span>
									<div className="min-w-0">
										<h3 className="break-words text-sm font-black text-foreground">
											{benefit.title}
										</h3>
										<p className="mt-1 text-pretty break-words text-sm leading-6 text-muted-foreground">
											{benefit.description}
										</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>

				<section className="mt-8 rounded-2xl border border-primary/25 bg-primary/10 p-4 text-foreground shadow-xs">
					<div className="flex gap-3">
						<CheckCircle2
							className="mt-0.5 size-5 shrink-0 text-primary"
							aria-hidden="true"
						/>
						<div className="min-w-0">
							<p className="break-words text-sm font-black uppercase tracking-normal text-primary">
								Modelo simples
							</p>
							<p className="mt-1 text-pretty break-words text-sm leading-6">
								A Creator Store apresenta recomendações e redireciona o
								visitante para links externos. Sem carrinho, checkout, estoque
								ou pedidos.
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function ProductPreview({
	title,
	priceLabel,
	featured = false,
}: {
	title: string;
	priceLabel: string;
	featured?: boolean;
}) {
	return (
		<div className="rounded-2xl border border-border bg-card p-3 shadow-xs">
			<div className="flex items-center gap-3">
				<div className="flex aspect-square w-14 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
					<Package className="size-5" aria-hidden="true" />
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex min-w-0 items-center gap-2">
						<p className="truncate text-sm font-black text-foreground">
							{title}
						</p>
						{featured ? (
							<span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[0.625rem] font-black uppercase tracking-normal text-primary">
								Destaque
							</span>
						) : null}
					</div>
					<p className="mt-1 truncate text-xs font-semibold text-muted-foreground">
						{priceLabel}
					</p>
				</div>
				<Link2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
			</div>
		</div>
	);
}
