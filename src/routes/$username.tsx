import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ExternalLink,
	ImageOff,
	Instagram,
	Music2,
	Package,
	Store,
	Youtube,
} from "lucide-react";
import type { ReactNode } from "react";

import {
	EmptyState,
	InlineAlert,
	StatusBadge,
} from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/$username")({
	validateSearch: (search: Record<string, unknown>) => ({
		empty:
			search.empty === true || search.empty === "1" || search.empty === "true",
		published:
			search.published !== false &&
			search.published !== "0" &&
			search.published !== "false",
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
		hasImage: true,
	},
	{
		name: "Mini tripe para celular",
		description: "Ajuda a gravar reviews e stories com enquadramento estavel.",
		buttonLabel: "Ver produto",
		url: "https://example.com/mini-tripe",
		featured: false,
		active: true,
		hasImage: true,
	},
	{
		name: "Checklist impresso para gravar reviews",
		description:
			"Material simples para planejar conteudos antes de ligar a camera.",
		buttonLabel: "Acessar recomendacao",
		url: "https://example.com/checklist-reviews",
		featured: false,
		active: true,
		hasImage: false,
	},
	{
		name: "Ring light de mesa",
		description: "Iluminacao compacta para gravacoes em mesa.",
		buttonLabel: "Ver produto",
		url: "https://example.com/ring-light",
		featured: false,
		active: false,
		hasImage: true,
	},
];

const socialLinks = [
	{
		label: "Instagram",
		url: "https://instagram.com",
		icon: Instagram,
	},
	{
		label: "TikTok",
		url: "https://tiktok.com",
		icon: Music2,
	},
	{
		label: "YouTube",
		url: "https://youtube.com",
		icon: Youtube,
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
			<PublicShell>
				<EmptyState
					icon={<Store className="size-5" aria-hidden="true" />}
					title="Pagina indisponivel"
					description="Nao encontramos uma vitrine publicada para este endereco. Confira o link ou peca ao criador uma nova URL."
					action={
						<Button asChild variant="outline">
							<Link to="/">Voltar para Creator Store</Link>
						</Button>
					}
				/>
			</PublicShell>
		);
	}

	if (!published) {
		return (
			<PublicShell>
				<InlineAlert tone="warning" title="Pagina despublicada">
					Esta vitrine esta temporariamente fora do ar. Quando o criador
					publicar novamente, as recomendacoes voltam a aparecer neste link.
				</InlineAlert>
			</PublicShell>
		);
	}

	return (
		<PublicShell>
			<CreatorHeader />

			{featuredProduct ? (
				<section className="mt-5 rounded-lg border bg-surface p-4 shadow-sm">
					<div className="flex flex-wrap items-center justify-between gap-2">
						<StatusBadge tone="success" icon="featured">
							Produto em destaque
						</StatusBadge>
						<span className="text-xs font-bold text-muted-foreground">
							Recomendacao do criador
						</span>
					</div>
					<ProductImage
						className="mt-3 aspect-[4/3] w-full"
						hasImage={featuredProduct.hasImage}
						name={featuredProduct.name}
					/>
					<h2 className="mt-4 break-words text-xl font-extrabold">
						{featuredProduct.name}
					</h2>
					<p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
						{featuredProduct.description}
					</p>
					<ExternalProductButton
						className="mt-4"
						href={featuredProduct.url}
						label={featuredProduct.buttonLabel}
					/>
				</section>
			) : null}

			<section className="mt-5 space-y-3">
				<div>
					<h2 className="text-lg font-extrabold">Recomendacoes</h2>
					<p className="mt-1 text-sm leading-6 text-muted-foreground">
						Produtos selecionados por {creator.displayName}. Cada botao abre um
						link externo.
					</p>
				</div>
				{activeProducts.length === 0 ? (
					<EmptyState
						icon={<Package className="size-5" aria-hidden="true" />}
						title="Esta vitrine ainda nao tem produtos ativos"
						description={`Quando ${creator.displayName} publicar recomendacoes, elas aparecem aqui.`}
					/>
				) : (
					regularProducts.map((product) => (
						<article
							key={product.name}
							className="rounded-lg border bg-surface p-4 shadow-sm"
						>
							<div className="flex gap-3">
								<ProductImage
									className="size-20 shrink-0"
									hasImage={product.hasImage}
									name={product.name}
								/>
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-2">
										<h3 className="break-words font-extrabold">
											{product.name}
										</h3>
										{product.hasImage ? null : (
											<StatusBadge tone="warning" icon="image-missing">
												Sem imagem
											</StatusBadge>
										)}
									</div>
									<p className="mt-1 break-words text-sm leading-5 text-muted-foreground">
										{product.description}
									</p>
								</div>
							</div>
							<ExternalProductButton
								className="mt-3"
								href={product.url}
								label={product.buttonLabel}
								variant="outline"
							/>
						</article>
					))
				)}
			</section>
		</PublicShell>
	);
}

function PublicShell({ children }: { children: ReactNode }) {
	return (
		<main className="min-h-screen px-4 py-5 text-foreground">
			<div className="mx-auto w-full max-w-md">
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-sm font-extrabold text-foreground no-underline"
				>
					<span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<Store className="size-4" aria-hidden="true" />
					</span>
					Creator Store
				</Link>
				<div className="mt-5">{children}</div>
			</div>
		</main>
	);
}

function CreatorHeader() {
	return (
		<section className="overflow-hidden rounded-lg border bg-surface shadow-sm">
			<div className="h-24 bg-primary sm:h-28" />
			<div className="px-5 pb-5">
				<div className="-mt-10 flex size-20 items-center justify-center rounded-full border-4 border-surface bg-secondary text-lg font-extrabold text-secondary-foreground">
					LR
				</div>
				<div className="mt-4 flex flex-wrap items-center gap-2">
					<h1 className="break-words text-3xl font-extrabold">
						{creator.displayName}
					</h1>
					<StatusBadge tone="success" icon="active">
						Publicado
					</StatusBadge>
				</div>
				<p className="mt-1 break-words text-sm font-semibold text-muted-foreground">
					@{creator.username}
				</p>
				<p className="mt-3 break-words text-sm leading-6 text-muted-foreground">
					{creator.bio}
				</p>

				<div className="mt-4 flex flex-wrap gap-2">
					{socialLinks.map((socialLink) => {
						const Icon = socialLink.icon;

						return (
							<Button
								asChild
								key={socialLink.label}
								variant="outline"
								size="icon-sm"
							>
								<a
									href={socialLink.url}
									target="_blank"
									rel="noreferrer"
									aria-label={socialLink.label}
								>
									<Icon aria-hidden="true" />
								</a>
							</Button>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function ProductImage({
	className,
	hasImage,
	name,
}: {
	className: string;
	hasImage: boolean;
	name: string;
}) {
	if (!hasImage) {
		return (
			<div
				className={`flex items-center justify-center rounded-md border border-dashed bg-surface-muted text-muted-foreground ${className}`}
				role="img"
				aria-label={`Produto sem imagem: ${name}`}
			>
				<ImageOff className="size-6" aria-hidden="true" />
			</div>
		);
	}

	return (
		<div
			className={`flex items-center justify-center rounded-md bg-surface-muted text-muted-foreground ${className}`}
			role="img"
			aria-label={`Imagem do produto: ${name}`}
		>
			<Package className="size-6" aria-hidden="true" />
		</div>
	);
}

function ExternalProductButton({
	className,
	href,
	label,
	variant,
}: {
	className?: string;
	href: string;
	label: string;
	variant?: "outline";
}) {
	return (
		<Button
			asChild
			className={`min-h-10 w-full ${className ?? ""}`}
			variant={variant}
		>
			<a href={href} target="_blank" rel="noreferrer">
				<span className="min-w-0 break-words text-center">{label}</span>
				<ExternalLink aria-hidden="true" />
			</a>
		</Button>
	);
}
