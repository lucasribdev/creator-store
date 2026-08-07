import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Instagram, Music2, Youtube } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/$username")({
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
	},
	{
		name: "Mini tripe para celular",
		description: "Ajuda a gravar reviews e stories com enquadramento estavel.",
		buttonLabel: "Ver oferta",
		url: "https://example.com/mini-tripe",
		featured: false,
	},
];

function CreatorPage() {
	const featuredProduct = products.find((product) => product.featured);
	const regularProducts = products.filter((product) => !product.featured);

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
								<a href="https://instagram.com" aria-label="Instagram">
									<Instagram aria-hidden="true" />
								</a>
							</Button>
							<Button asChild variant="outline" size="icon-sm">
								<a href="https://tiktok.com" aria-label="TikTok">
									<Music2 aria-hidden="true" />
								</a>
							</Button>
							<Button asChild variant="outline" size="icon-sm">
								<a href="https://youtube.com" aria-label="YouTube">
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
							<a href={featuredProduct.url}>
								{featuredProduct.buttonLabel}
								<ExternalLink aria-hidden="true" />
							</a>
						</Button>
					</section>
				) : null}

				<section className="mt-5 space-y-3">
					<h2 className="text-lg font-extrabold">Recomendacoes</h2>
					{regularProducts.map((product) => (
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
								<a href={product.url}>
									{product.buttonLabel}
									<ExternalLink aria-hidden="true" />
								</a>
							</Button>
						</article>
					))}
				</section>
			</div>
		</main>
	);
}
