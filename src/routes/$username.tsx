import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Instagram, Music2, Youtube } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/$username")({
	validateSearch: (search: Record<string, unknown>) => ({
		empty: search.empty === "1",
		published: search.published !== "0",
	}),
	component: CreatorPage,
});

const creator = {
	username: "lucasreviews",
	displayName: "Lucas Reviews",
	bio: "Produtos e acessorios que uso no dia a dia e recomendo para quem cria conteudo pelo celular.",
};

const products = [
	{
		name: "Fone Bluetooth compacto",
		description:
			"Modelo leve para editar videos, assistir aulas e gravar em movimento.",
		buttonLabel: "Ver produto",
		url: "https://example.com/fone-bluetooth",
		featured: true,
		active: true,
	},
	{
		name: "Mini tripe para celular",
		description: "Ajuda a gravar reviews e stories com enquadramento estavel.",
		buttonLabel: "Ver oferta",
		url: "https://example.com/mini-tripe",
		featured: false,
		active: true,
	},
	{
		name: "Ring light de mesa",
		description:
			"Produto inativo usado apenas para validar o painel do criador.",
		buttonLabel: "Ver produto",
		url: "https://example.com/ring-light",
		featured: false,
		active: false,
	},
];

function CreatorPage() {
	const { username } = Route.useParams();
	const { empty, published } = Route.useSearch();
	const activeProducts = empty
		? []
		: products.filter((product) => product.active);
	const featuredProduct = activeProducts.find((product) => product.featured);
	const regularProducts = activeProducts.filter((product) => !product.featured);

	if (username !== creator.username) {
		return (
			<main className="min-h-screen px-4 py-5 text-[var(--sea-ink)]">
				<div className="mx-auto w-full max-w-md">
					<Link to="/" className="text-sm font-bold no-underline">
						Creator Store
					</Link>
					<section className="mt-5 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
						<h1 className="text-2xl font-extrabold">Pagina indisponivel</h1>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Neste prototipo, apenas /lucasreviews representa uma vitrine
							publica ficticia.
						</p>
					</section>
				</div>
			</main>
		);
	}

	if (!published) {
		return (
			<main className="min-h-screen px-4 py-5 text-[var(--sea-ink)]">
				<div className="mx-auto w-full max-w-md">
					<Link to="/" className="text-sm font-bold no-underline">
						Creator Store
					</Link>
					<section className="mt-5 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
						<h1 className="text-2xl font-extrabold">Pagina despublicada</h1>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Esta vitrine existe no prototipo, mas esta marcada como
							despublicada e nao exibe produtos para visitantes.
						</p>
					</section>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen px-4 py-5 text-[var(--sea-ink)]">
			<div className="mx-auto w-full max-w-md">
				<Link to="/" className="text-sm font-bold no-underline">
					Creator Store
				</Link>

				<section className="mt-5 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] shadow-sm">
					<div className="h-28 bg-[var(--sea-ink)]" />
					<div className="px-5 pb-5">
						<div className="-mt-10 size-20 rounded-full border-4 border-white bg-[var(--lagoon)]" />
						<h1 className="mt-4 text-3xl font-extrabold">
							{creator.displayName}
						</h1>
						<p className="mt-1 text-sm font-semibold text-[var(--sea-ink-soft)]">
							@{creator.username}
						</p>
						<p className="mt-3 text-sm leading-6 text-[var(--sea-ink-soft)]">
							{creator.bio}
						</p>

						<div className="mt-4 flex gap-2">
							<Button asChild variant="outline" size="icon-sm">
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noreferrer"
									aria-label="Instagram"
								>
									<Instagram aria-hidden="true" />
								</a>
							</Button>
							<Button asChild variant="outline" size="icon-sm">
								<a
									href="https://tiktok.com"
									target="_blank"
									rel="noreferrer"
									aria-label="TikTok"
								>
									<Music2 aria-hidden="true" />
								</a>
							</Button>
							<Button asChild variant="outline" size="icon-sm">
								<a
									href="https://youtube.com"
									target="_blank"
									rel="noreferrer"
									aria-label="YouTube"
								>
									<Youtube aria-hidden="true" />
								</a>
							</Button>
						</div>
					</div>
				</section>

				{featuredProduct ? (
					<section className="mt-5 rounded-lg border border-[var(--line)] bg-white/85 p-4 shadow-sm">
						<p className="text-xs font-bold text-[var(--palm)] uppercase">
							Produto em destaque
						</p>
						<div className="mt-3 aspect-[4/3] rounded-md bg-[var(--sand)]" />
						<h2 className="mt-4 text-xl font-extrabold">
							{featuredProduct.name}
						</h2>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							{featuredProduct.description}
						</p>
						<Button asChild className="mt-4 w-full">
							<a href={featuredProduct.url} target="_blank" rel="noreferrer">
								{featuredProduct.buttonLabel}
								<ExternalLink aria-hidden="true" />
							</a>
						</Button>
					</section>
				) : null}

				<section className="mt-5 space-y-3">
					<h2 className="text-lg font-extrabold">Recomendacoes</h2>
					{activeProducts.length === 0 ? (
						<div className="rounded-lg border border-dashed border-[var(--line)] bg-white/70 p-5 text-center">
							<p className="font-extrabold">
								Nenhum produto ativo por enquanto.
							</p>
							<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
								Quando Lucas publicar recomendacoes, elas aparecem aqui.
							</p>
						</div>
					) : (
						regularProducts.map((product) => (
							<article
								key={product.name}
								className="rounded-lg border border-[var(--line)] bg-white/85 p-4 shadow-sm"
							>
								<div className="flex gap-3">
									<div className="size-20 shrink-0 rounded-md bg-[var(--sand)]" />
									<div className="min-w-0 flex-1">
										<h3 className="font-extrabold">{product.name}</h3>
										<p className="mt-1 text-sm leading-5 text-[var(--sea-ink-soft)]">
											{product.description}
										</p>
									</div>
								</div>
								<Button asChild variant="outline" className="mt-3 w-full">
									<a href={product.url} target="_blank" rel="noreferrer">
										{product.buttonLabel}
										<ExternalLink aria-hidden="true" />
									</a>
								</Button>
							</article>
						))
					)}
				</section>
			</div>
		</main>
	);
}
