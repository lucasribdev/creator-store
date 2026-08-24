import { createFileRoute, Link } from "@tanstack/react-router";
import {
	BadgeCheck,
	ExternalLink,
	ImageOff,
	Instagram,
	Music2,
	Package,
	Share2,
	ShoppingBag,
	Youtube,
} from "lucide-react";

import {
	AppShell,
	EmptyState,
	InlineAlert,
	StatusBadge,
} from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";

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
	avatarUrl: "",
	bannerUrl:
		"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
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
		imageUrl:
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
	},
	{
		name: "Mini tripe para celular",
		description: "Ajuda a gravar reviews e stories com enquadramento estavel.",
		buttonLabel: "Ver produto",
		url: "https://example.com/mini-tripe",
		featured: false,
		active: true,
		hasImage: true,
		imageUrl:
			"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
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
		imageUrl: "",
	},
	{
		name: "Ring light de mesa",
		description: "Iluminacao compacta para gravacoes em mesa.",
		buttonLabel: "Ver produto",
		url: "https://example.com/ring-light",
		featured: false,
		active: false,
		hasImage: true,
		imageUrl:
			"https://images.unsplash.com/photo-1617957689233-207e3cd3c610?auto=format&fit=crop&w=900&q=80",
	},
];

const socialLinks = [
	{
		label: "Instagram",
		url: "https://instagram.com/lucasreviews",
		icon: Instagram,
	},
	{
		label: "TikTok",
		url: "https://tiktok.com/@lucasreviews",
		icon: Music2,
	},
	{
		label: "YouTube",
		url: "https://youtube.com/@lucasreviews",
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
			<AppShell mainClassName="max-w-2xl">
				<EmptyState
					icon={<Package className="size-5" aria-hidden="true" />}
					title="Pagina indisponivel"
					description="Nao encontramos uma vitrine publicada para este endereco. Confira o link ou peca ao criador uma nova URL."
					action={
						<Button asChild variant="outline">
							<Link to="/">Voltar para Creator Store</Link>
						</Button>
					}
				/>
			</AppShell>
		);
	}

	if (!published) {
		return (
			<AppShell mainClassName="max-w-2xl">
				<InlineAlert tone="warning" title="Pagina despublicada">
					Esta vitrine esta temporariamente fora do ar. Quando o criador
					publicar novamente, as recomendacoes voltam a aparecer neste link.
				</InlineAlert>
			</AppShell>
		);
	}

	return (
		<AppShell mainClassName="!max-w-none !p-0 !px-0 !py-0 sm:!px-0 lg:!px-0">
			<div className="pb-10">
				<CreatorHeader />

				<div className="mx-auto mt-6 w-full max-w-3xl space-y-6">
					{featuredProduct ? (
						<section className="space-y-3">
							<StatusBadge tone="success" icon="featured">
								Produto em destaque
							</StatusBadge>
							<FeaturedProductCard product={featuredProduct} />
						</section>
					) : null}

					<section className="space-y-3">
						<div>
							<h2 className="text-lg font-extrabold">Recomendacoes</h2>
						</div>
						{activeProducts.length === 0 ? (
							<EmptyState
								icon={<Package className="size-5" aria-hidden="true" />}
								title="Esta vitrine ainda nao tem produtos ativos"
								description={`Quando ${creator.displayName} publicar recomendacoes, elas aparecem aqui.`}
							/>
						) : (
							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
								{regularProducts.map((product) => (
									<ProductCard key={product.name} product={product} />
								))}
							</div>
						)}
					</section>

					<footer className="pb-2 pt-1 text-center text-[0.65rem] font-extrabold uppercase tracking-widest text-muted-foreground">
						Creator Store
					</footer>
				</div>
			</div>
		</AppShell>
	);
}

function CreatorHeader() {
	const initials = creator.displayName
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<section className="w-full">
			<header className="relative h-40 w-full overflow-hidden sm:h-56">
				<img
					src={creator.bannerUrl}
					alt=""
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/55 to-blue-800/60" />
			</header>

			<div className="mx-auto w-full max-w-3xl">
				<div className="relative -mt-12 size-24">
					<div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-secondary text-xl font-extrabold text-secondary-foreground shadow-lg">
						{creator.avatarUrl ? (
							<img
								src={creator.avatarUrl}
								alt={creator.displayName}
								className="size-full object-cover"
							/>
						) : (
							initials
						)}
					</div>
					<Button
						type="button"
						size="icon-sm"
						variant="outline"
						className="absolute bottom-0 right-0 rounded-full bg-surface shadow-lg"
						aria-label={`Compartilhar vitrine de ${creator.displayName}`}
					>
						<Share2 aria-hidden="true" />
					</Button>
				</div>

				<div className="mt-4 flex flex-wrap items-center gap-1.5">
					<h1 className="break-words text-2xl font-extrabold sm:text-3xl">
						{creator.displayName}
					</h1>
					<BadgeCheck
						className="size-5 shrink-0 fill-blue-500 text-white"
						aria-label="Perfil verificado"
					/>
				</div>
				<p className="mt-1 break-words text-sm font-extrabold text-blue-600">
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
								size="sm"
								className="rounded-full"
							>
								<a
									href={socialLink.url}
									target="_blank"
									rel="noreferrer"
									aria-label={`Abrir ${socialLink.label} de ${creator.displayName}`}
								>
									<Icon aria-hidden="true" />
									{socialLink.label}
								</a>
							</Button>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function FeaturedProductCard({
	product,
}: {
	product: (typeof products)[number];
}) {
	return (
		<article className="group overflow-hidden rounded-lg border bg-surface shadow-sm transition-all duration-[180ms] ease-in-out hover:border-primary/30 hover:shadow-md">
			<ProductImage
				className="aspect-[16/10] w-full rounded-none border-0"
				hasImage={product.hasImage}
				imageUrl={product.imageUrl}
				name={product.name}
			/>
			<div className="p-4">
				<div className="flex items-start gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
						<ShoppingBag className="size-5" aria-hidden="true" />
					</div>
					<div className="min-w-0 flex-1">
						<h2 className="break-words text-xl font-extrabold">
							{product.name}
						</h2>
						<p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
							{product.description}
						</p>
					</div>
				</div>
				<ExternalProductButton
					className="mt-4"
					href={product.url}
					label={product.buttonLabel}
				/>
			</div>
		</article>
	);
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
	return (
		<article className="group flex min-h-full flex-col overflow-hidden rounded-lg border bg-surface shadow-sm transition-all duration-[180ms] ease-in-out hover:border-primary/30 hover:shadow-md">
			<ProductImage
				className="aspect-[4/3] w-full rounded-none border-0"
				hasImage={product.hasImage}
				imageUrl={product.imageUrl}
				name={product.name}
			/>
			<div className="flex flex-1 flex-col p-4">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="break-words font-extrabold">{product.name}</h3>
					{product.hasImage ? null : (
						<StatusBadge tone="warning" icon="image-missing">
							Sem imagem
						</StatusBadge>
					)}
				</div>
				<p className="mt-2 flex-1 break-words text-sm leading-5 text-muted-foreground">
					{product.description}
				</p>
				<ExternalProductButton
					className="mt-4"
					href={product.url}
					label={product.buttonLabel}
					variant="outline"
				/>
			</div>
		</article>
	);
}

function ProductImage({
	className,
	hasImage,
	imageUrl,
	name,
}: {
	className: string;
	hasImage: boolean;
	imageUrl: string;
	name: string;
}) {
	if (!hasImage) {
		return (
			<div
				className={`flex items-center justify-center overflow-hidden rounded-md border border-dashed bg-surface-muted text-muted-foreground ${className}`}
				role="img"
				aria-label={`Produto sem imagem: ${name}`}
			>
				<ImageOff
					className="size-6 transition-transform duration-300 ease-in-out group-hover:scale-105"
					aria-hidden="true"
				/>
			</div>
		);
	}

	return (
		<div
			className={cn("overflow-hidden rounded-md bg-surface-muted", className)}
		>
			<img
				src={imageUrl}
				alt={`Imagem do produto: ${name}`}
				className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
			/>
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
			<a
				href={href}
				target="_blank"
				rel="noreferrer"
				className="group/product"
				aria-label={`Abrir link externo: ${label}`}
			>
				<span className="min-w-0 break-words text-center">{label}</span>
				<ExternalLink
					className="transition-transform duration-[180ms] ease-in-out group-hover/product:translate-x-1"
					aria-hidden="true"
				/>
			</a>
		</Button>
	);
}
