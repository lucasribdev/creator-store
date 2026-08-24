import { ExternalLink, ImageOff, ShoppingBag, Star } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";

export type ProductVisual = {
	name: string;
	description?: string;
	buttonLabel?: string;
	url?: string;
	storeName?: string;
	price?: string;
	previousPrice?: string;
	featured?: boolean;
	active?: boolean;
	hasImage?: boolean;
	imageUrl?: string;
};

type ProductCardProps<TProduct extends ProductVisual> = {
	product: TProduct;
	onOpenRedirect: (product: TProduct) => void;
};

export function FeaturedProductCard<TProduct extends ProductVisual>({
	onOpenRedirect,
	product,
}: ProductCardProps<TProduct>) {
	return (
		<article className="group overflow-hidden rounded-3xl border border-blue-100/80 bg-blue-50/80 shadow-xs transition-all duration-[180ms] ease-in-out hover:border-blue-200">
			<ProductImage
				aspectRatio="wide"
				hasImage={product.hasImage}
				imageUrl={product.imageUrl}
				name={product.name}
				storeName={product.storeName}
			/>
			<div className="p-4 sm:p-5">
				<div className="flex items-start gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
						<ShoppingBag className="size-5" aria-hidden="true" />
					</div>
					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-center gap-2">
							<h2 className="break-words text-xl font-extrabold text-slate-950">
								{product.name}
							</h2>
							<StatusPill status="featured" />
						</div>
						{product.description ? (
							<p className="mt-2 break-words text-sm leading-6 text-slate-600">
								{product.description}
							</p>
						) : null}
					</div>
				</div>
				<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<PriceBlock
						price={product.price}
						previousPrice={product.previousPrice}
					/>
					<ExternalProductButton
						className="sm:w-auto"
						label={product.buttonLabel ?? "Ver produto"}
						onClick={() => onOpenRedirect(product)}
					/>
				</div>
			</div>
		</article>
	);
}

export function ProductCard<TProduct extends ProductVisual>({
	onOpenRedirect,
	product,
}: ProductCardProps<TProduct>) {
	return (
		<article className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-[180ms] ease-in-out hover:border-slate-300">
			<ProductImage
				aspectRatio="standard"
				hasImage={product.hasImage}
				imageUrl={product.imageUrl}
				name={product.name}
				storeName={product.storeName}
			/>
			<div className="flex flex-1 flex-col p-4">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="min-w-0 break-words font-extrabold text-slate-950">
						{product.name}
					</h3>
					{product.featured ? <StatusPill status="featured" /> : null}
				</div>
				{product.description ? (
					<p className="mt-2 flex-1 break-words text-sm leading-5 text-slate-600">
						{product.description}
					</p>
				) : null}
				<div className="mt-4 space-y-3">
					<PriceBlock
						price={product.price}
						previousPrice={product.previousPrice}
					/>
					<ExternalProductButton
						label={product.buttonLabel ?? "Ver produto"}
						onClick={() => onOpenRedirect(product)}
						variant="outline"
					/>
				</div>
			</div>
		</article>
	);
}

export function PriceBlock({
	price,
	previousPrice,
}: {
	price?: string;
	previousPrice?: string;
}) {
	if (!price && !previousPrice) {
		return null;
	}

	return (
		<div className="min-w-0">
			{previousPrice ? (
				<p className="text-xs font-bold text-slate-400 line-through">
					{previousPrice}
				</p>
			) : null}
			{price ? (
				<p className="break-words text-lg font-extrabold text-slate-950">
					{price}
				</p>
			) : null}
		</div>
	);
}

export function ProductImage({
	aspectRatio,
	className,
	hasImage = true,
	imageUrl,
	name,
	storeName,
}: {
	aspectRatio: "wide" | "standard" | "square";
	className?: string;
	hasImage?: boolean;
	imageUrl?: string;
	name: string;
	storeName?: string;
}) {
	const aspectClassName = {
		wide: "aspect-[16/10]",
		standard: "aspect-[4/3]",
		square: "aspect-square",
	}[aspectRatio];

	return (
		<div
			className={cn(
				"relative w-full overflow-hidden bg-slate-100",
				aspectClassName,
				className,
			)}
		>
			{hasImage && imageUrl ? (
				<img
					src={imageUrl}
					alt={`Imagem do produto: ${name}`}
					className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
				/>
			) : (
				<ProductImagePlaceholder name={name} />
			)}
			{storeName ? <StoreOverlay storeName={storeName} /> : null}
		</div>
	);
}

export function ProductImagePlaceholder({ name }: { name: string }) {
	return (
		<div
			className="flex size-full flex-col items-center justify-center gap-2 bg-slate-100 text-slate-500"
			role="img"
			aria-label={`Produto sem imagem: ${name}`}
		>
			<ImageOff
				className="size-7 transition-transform duration-300 ease-in-out group-hover:scale-105"
				aria-hidden="true"
			/>
			<span className="text-[0.625rem] font-extrabold uppercase tracking-widest">
				Sem imagem
			</span>
		</div>
	);
}

export function StatusPill({
	status,
}: {
	status: "active" | "inactive" | "featured";
}) {
	const statusClassName = {
		active: "border-emerald-200 bg-emerald-50 text-emerald-700",
		inactive: "border-slate-200 bg-slate-100 text-slate-600",
		featured: "border-amber-200 bg-amber-50 text-amber-700",
	}[status];
	const label = {
		active: "Ativo",
		inactive: "Inativo",
		featured: "Destaque",
	}[status];

	return (
		<span
			className={cn(
				"inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-full border px-2 text-[0.6875rem] font-extrabold",
				statusClassName,
			)}
		>
			{status === "featured" ? (
				<Star className="size-3" aria-hidden="true" />
			) : null}
			{label}
		</span>
	);
}

function StoreOverlay({ storeName }: { storeName: string }) {
	return (
		<span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.6875rem] font-extrabold text-white shadow-xs backdrop-blur-md">
			{storeName}
		</span>
	);
}

function ExternalProductButton({
	className,
	label,
	onClick,
	variant,
}: {
	className?: string;
	label: string;
	onClick: () => void;
	variant?: "outline";
}) {
	return (
		<Button
			className={cn("group/product min-h-10 w-full", className)}
			onClick={onClick}
			type="button"
			variant={variant}
			aria-label={`Abrir link externo: ${label}`}
		>
			<span className="min-w-0 break-words text-center">{label}</span>
			<ExternalLink
				className="transition-transform duration-[180ms] ease-in-out group-hover/product:translate-x-1"
				aria-hidden="true"
			/>
		</Button>
	);
}
