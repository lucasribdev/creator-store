import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
	ArrowLeft,
	BadgeAlert,
	CheckCircle2,
	Edit3,
	Eye,
	EyeOff,
	ImageOff,
	Package,
	Plus,
	Star,
	Trash2,
} from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import { Switch } from "#/components/ui/switch.tsx";

export const Route = createFileRoute("/dashboard/products")({
	validateSearch: (search: Record<string, unknown>) => ({
		empty: search.empty === "1",
		saved: search.saved === "product" ? "product" : undefined,
	}),
	component: ProductsListPage,
});

const products = [
	{
		id: "fone-bluetooth",
		name: "Fone Bluetooth compacto",
		description:
			"Modelo leve para editar videos, assistir aulas e gravar em movimento.",
		status: "active",
		featured: true,
		price: "R$ 149,90",
		hasImage: true,
	},
	{
		id: "mini-tripe",
		name: "Mini tripe para celular",
		description: "Ajuda a gravar reviews e stories com enquadramento estavel.",
		status: "active",
		featured: false,
		price: "R$ 59,90",
		hasImage: false,
	},
	{
		id: "ring-light",
		name: "Ring light de mesa",
		description:
			"Produto inativo: continua no painel, mas nao aparece publicamente.",
		status: "inactive",
		featured: false,
		price: "R$ 89,90",
		hasImage: true,
	},
] as const;

function ProductsListPage() {
	const { empty, saved } = Route.useSearch();
	const visibleProducts = empty ? [] : products;
	const activeProducts = visibleProducts.filter(
		(product) => product.status === "active",
	);

	return (
		<section className="mt-7 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
			<div className="max-w-5xl">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<Button asChild variant="ghost" size="sm" className="w-fit px-0">
						<Link to="/dashboard">
							<ArrowLeft aria-hidden="true" />
							Voltar ao painel
						</Link>
					</Button>

					<Button asChild>
						<Link to="/dashboard/products/new">
							<Plus aria-hidden="true" />
							Adicionar produto
						</Link>
					</Button>
				</div>

				<div className="mt-5 flex size-11 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
					<Package className="size-5" aria-hidden="true" />
				</div>
				<h2 className="mt-5 text-3xl font-extrabold">Produtos</h2>
				<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
					Produtos ativos aparecem na pagina publica. Produtos inativos ficam
					salvos apenas no painel.
				</p>

				<div className="mt-5 grid gap-3 sm:grid-cols-3">
					<SummaryItem
						label="Cadastrados"
						value={String(visibleProducts.length)}
					/>
					<SummaryItem
						label="Ativos na vitrine"
						value={String(activeProducts.length)}
					/>
					<SummaryItem
						label="Em destaque"
						value={String(
							visibleProducts.filter((product) => product.featured).length,
						)}
					/>
				</div>

				{saved === "product" ? (
					<div className="mt-5 flex items-start gap-3 rounded-md border border-[var(--chip-line)] bg-white/80 px-4 py-3 text-sm text-[var(--sea-ink)]">
						<CheckCircle2
							className="mt-0.5 size-5 shrink-0 text-[var(--palm)]"
							aria-hidden="true"
						/>
						<div>
							<p className="font-bold">
								Produto salvo com sucesso no prototipo.
							</p>
							<p className="mt-1 text-[var(--sea-ink-soft)]">
								Nenhuma informacao foi persistida em banco.
							</p>
						</div>
					</div>
				) : null}

				<Outlet />

				{visibleProducts.length > 0 ? (
					<div className="mt-6 space-y-3">
						{visibleProducts.map((product) => (
							<ProductRow key={product.id} product={product} />
						))}
					</div>
				) : (
					<section className="mt-6 rounded-lg border border-dashed border-[var(--line)] bg-white/65 p-5">
						<div className="flex size-11 items-center justify-center rounded-md bg-[var(--sand)] text-[var(--sea-ink-soft)]">
							<BadgeAlert className="size-5" aria-hidden="true" />
						</div>
						<h3 className="mt-4 text-lg font-extrabold">Lista vazia</h3>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Quando nao houver produtos cadastrados, esta area deve orientar o
							criador a adicionar o primeiro produto recomendado.
						</p>
						<Button asChild variant="outline" className="mt-4">
							<Link to="/dashboard/products/new">
								<Plus aria-hidden="true" />
								Adicionar primeiro produto
							</Link>
						</Button>
					</section>
				)}
			</div>
		</section>
	);
}

function SummaryItem({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-md border border-[var(--line)] bg-white/75 p-4">
			<p className="text-2xl font-extrabold">{value}</p>
			<p className="mt-1 text-sm font-bold text-[var(--sea-ink-soft)]">
				{label}
			</p>
		</div>
	);
}

function ProductRow({ product }: { product: (typeof products)[number] }) {
	const isActive = product.status === "active";

	return (
		<article className="rounded-lg border border-[var(--line)] bg-white/85 p-4 shadow-sm">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex gap-4">
					<div className="flex size-20 shrink-0 items-center justify-center rounded-md bg-[var(--sand)] text-[var(--sea-ink-soft)]">
						{product.hasImage ? (
							<Package className="size-6" aria-hidden="true" />
						) : (
							<ImageOff className="size-6" aria-hidden="true" />
						)}
					</div>
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="font-extrabold">{product.name}</h3>
							{product.featured ? (
								<span className="inline-flex items-center gap-1 rounded-md border border-[var(--chip-line)] bg-[var(--chip-bg)] px-2 py-1 text-xs font-bold text-[var(--palm)]">
									<Star className="size-3" aria-hidden="true" />
									Destaque
								</span>
							) : null}
							<span className="inline-flex items-center gap-1 rounded-md border border-[var(--line)] bg-white/70 px-2 py-1 text-xs font-bold">
								{isActive ? (
									<Eye className="size-3" aria-hidden="true" />
								) : (
									<EyeOff className="size-3" aria-hidden="true" />
								)}
								{isActive ? "Ativo" : "Inativo"}
							</span>
							{product.hasImage ? null : (
								<span className="inline-flex items-center gap-1 rounded-md border border-dashed border-[var(--line)] bg-white/70 px-2 py-1 text-xs font-bold">
									<ImageOff className="size-3" aria-hidden="true" />
									Sem imagem
								</span>
							)}
						</div>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							{product.description}
						</p>
						<p className="mt-2 text-sm font-extrabold">{product.price}</p>
					</div>
				</div>

				<div className="grid gap-2 sm:grid-cols-[auto_auto_auto] lg:min-w-80">
					<div className="flex items-center justify-between gap-3 rounded-md border border-[var(--line)] bg-white/60 px-3 py-2">
						<span className="text-sm font-bold">Ativo</span>
						<Switch
							checked={isActive}
							size="sm"
							aria-label={`Status de ${product.name}`}
						/>
					</div>
					<Button asChild variant="outline" size="sm">
						<Link
							to="/dashboard/products/$productId/edit"
							params={{ productId: product.id }}
						>
							<Edit3 aria-hidden="true" />
							Editar
						</Link>
					</Button>
					<Button type="button" variant="outline" size="sm">
						<Trash2 aria-hidden="true" />
						Excluir
					</Button>
				</div>
			</div>
		</article>
	);
}
