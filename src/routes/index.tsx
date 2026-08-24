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
		title: "Vitrine publica",
		description: "Uma pagina rapida para perfil, redes e produtos ativos.",
		icon: Store,
	},
	{
		title: "Recomendacoes manuais",
		description: "Cadastre produtos com nome, imagem e link externo.",
		icon: Package,
	},
	{
		title: "Cliques rastreados",
		description: "Entenda quais recomendacoes levam visitantes para a loja.",
		icon: TrendingUp,
	},
];

function Home() {
	return (
		<div className="min-h-screen bg-slate-50 text-slate-950">
			<header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
				<div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
					<Link
						to="/"
						className="flex min-w-0 items-center gap-2.5 text-slate-950 no-underline"
					>
						<span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs">
							<Store className="size-5" aria-hidden="true" />
						</span>
						<span className="truncate text-base font-black">Creator Store</span>
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

			<main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
				<Card className="overflow-hidden rounded-3xl border-slate-200 bg-white shadow-xs">
					<div className="grid gap-8 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_21rem] md:items-center lg:grid-cols-[minmax(0,1fr)_24rem] lg:p-10">
						<section className="min-w-0">
							<Badge
								variant="secondary"
								shape="pill"
								className="border border-blue-100 bg-blue-50 text-blue-700"
							>
								<Sparkles aria-hidden="true" />
								<span className="uppercase tracking-wider">Link da bio</span>
							</Badge>

							<h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
								Sua vitrine de produtos recomendados em um unico link.
							</h1>
							<p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
								Monte uma pagina publica para apresentar perfil, redes sociais e
								produtos favoritos. A compra acontece sempre fora da Creator
								Store.
							</p>

							<div className="mt-7 grid gap-3 sm:flex sm:items-center">
								<Button asChild size="lg">
									<Link to="/signup">
										Criar minha vitrine
										<ArrowRight aria-hidden="true" />
									</Link>
								</Button>
								<Button asChild variant="outline" size="lg">
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

						<section aria-label="Preview da vitrine" className="mx-auto w-full">
							<div className="mx-auto max-w-[21rem] rounded-[2rem] border border-slate-200 bg-slate-950 p-2 shadow-xs">
								<div className="rounded-[1.55rem] bg-white p-4">
									<div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-slate-200" />
									<div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white">
										<div className="flex items-center gap-3">
											<div className="flex size-14 items-center justify-center rounded-full bg-white/20 font-black">
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
											Acessorios que uso para gravar, editar e viajar.
										</p>
									</div>

									<div className="mt-4 flex gap-2">
										<span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
											Instagram
										</span>
										<span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
											YouTube
										</span>
									</div>

									<div className="mt-4 space-y-3">
										<ProductPreview
											featured
											title="Microfone sem fio compacto"
											priceLabel="Recomendado para videos curtos"
										/>
										<ProductPreview
											title="Luz LED portatil"
											priceLabel="Setup leve para gravacao"
										/>
									</div>
								</div>
							</div>
						</section>
					</div>
				</Card>

				<section className="mt-8">
					<p className="text-xs font-black uppercase tracking-wider text-blue-700">
						Beneficios
					</p>
					<h2 className="mt-2 text-2xl font-black text-slate-950">
						Feita para criadores que recomendam com contexto.
					</h2>
					<div className="mt-4 grid gap-3 md:grid-cols-3">
						{benefits.map((benefit) => (
							<Card
								key={benefit.title}
								className="border-slate-200 bg-white p-4 shadow-xs"
							>
								<div className="flex items-start gap-3">
									<span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
										<benefit.icon className="size-5" aria-hidden="true" />
									</span>
									<div className="min-w-0">
										<h3 className="text-sm font-black text-slate-950">
											{benefit.title}
										</h3>
										<p className="mt-1 text-sm leading-6 text-slate-600">
											{benefit.description}
										</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>

				<section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-950 shadow-xs">
					<div className="flex gap-3">
						<CheckCircle2
							className="mt-0.5 size-5 shrink-0 text-blue-700"
							aria-hidden="true"
						/>
						<div>
							<p className="text-sm font-black uppercase tracking-wider text-blue-700">
								Modelo simples
							</p>
							<p className="mt-1 text-sm leading-6">
								A Creator Store apresenta recomendacoes e redireciona o
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
		<div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
			<div className="flex items-center gap-3">
				<div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
					<Package className="size-5" aria-hidden="true" />
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<p className="truncate text-sm font-black text-slate-950">
							{title}
						</p>
						{featured ? (
							<span className="rounded-full bg-blue-50 px-2 py-0.5 text-[0.625rem] font-black uppercase tracking-wider text-blue-700">
								Destaque
							</span>
						) : null}
					</div>
					<p className="mt-1 truncate text-xs font-semibold text-slate-500">
						{priceLabel}
					</p>
				</div>
				<Link2 className="size-4 shrink-0 text-blue-700" aria-hidden="true" />
			</div>
		</div>
	);
}
