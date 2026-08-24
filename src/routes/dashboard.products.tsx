import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	BadgeAlert,
	Edit3,
	Package,
	Plus,
	Trash2,
} from "lucide-react";

import {
	EmptyState,
	InlineAlert,
	MetricCard,
	ProductRow,
	SectionHeader,
} from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";
import { Switch } from "#/components/ui/switch.tsx";

export const Route = createFileRoute("/dashboard/products")({
	validateSearch: (search: Record<string, unknown>) => ({
		empty:
			search.empty === true || search.empty === "1" || search.empty === "true",
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
		<section className="mt-7 rounded-lg border bg-surface p-5 shadow-sm">
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<Button asChild variant="ghost" size="sm" className="w-fit px-0">
						<Link to="/dashboard">
							<ArrowLeft aria-hidden="true" />
							Voltar ao painel
						</Link>
					</Button>

					<Button asChild>
						<Link to="/dashboard/products/new" search={{ error: false }}>
							<Plus aria-hidden="true" />
							Adicionar produto
						</Link>
					</Button>
				</div>

				<div className="mt-5">
					<SectionHeader
						icon={<Package className="size-5" aria-hidden="true" />}
						title="Produtos"
						description="Acompanhe o que esta publicado, o que esta oculto e qual produto esta em destaque."
					/>
				</div>

				<div className="mt-5 grid gap-3 sm:grid-cols-3">
					<MetricCard
						label="Cadastrados"
						value={String(visibleProducts.length)}
					/>
					<MetricCard
						label="Ativos na vitrine"
						value={String(activeProducts.length)}
					/>
					<MetricCard
						label="Em destaque"
						value={String(
							visibleProducts.filter((product) => product.featured).length,
						)}
					/>
				</div>

				{saved === "product" ? (
					<div className="mt-5">
						<InlineAlert tone="success">Produto salvo com sucesso.</InlineAlert>
					</div>
				) : null}

				{visibleProducts.length > 0 ? (
					<div className="mt-6 space-y-3">
						<InlineAlert tone="info" title="Dica para remover da vitrine">
							Desative um produto quando ele nao deve aparecer publicamente, mas
							voce ainda quer manter os dados no painel.
						</InlineAlert>
						{visibleProducts.map((product) => (
							<ProductRow
								key={product.id}
								name={product.name}
								description={product.description}
								price={product.price}
								isActive={product.status === "active"}
								isFeatured={product.featured}
								hasImage={product.hasImage}
								actions={<ProductActions product={product} />}
							/>
						))}
					</div>
				) : (
					<div className="mt-6">
						<EmptyState
							icon={<BadgeAlert className="size-5" aria-hidden="true" />}
							title="Nenhum produto cadastrado"
							description="Adicione o primeiro produto recomendado para montar a vitrine."
							action={
								<Button asChild variant="outline">
									<Link to="/dashboard/products/new" search={{ error: false }}>
										<Plus aria-hidden="true" />
										Adicionar primeiro produto
									</Link>
								</Button>
							}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

function ProductActions({ product }: { product: (typeof products)[number] }) {
	const isActive = product.status === "active";

	return (
		<div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] lg:min-w-80">
			<div className="flex min-h-10 items-center justify-between gap-3 rounded-md border bg-muted/50 px-3 py-2">
				<span className="min-w-0 text-sm font-bold">
					{isActive ? "Ativo na vitrine" : "Inativo na vitrine"}
				</span>
				<Switch checked={isActive} aria-label={`Status de ${product.name}`} />
			</div>
			<Button asChild variant="outline" className="w-full sm:w-auto">
				<Link
					to="/dashboard/products/$productId/edit"
					params={{ productId: product.id }}
					search={{ error: false }}
				>
					<Edit3 aria-hidden="true" />
					Editar
				</Link>
			</Button>
			<Button
				type="button"
				variant="ghost"
				className="w-full text-muted-foreground hover:text-danger sm:col-span-2"
			>
				<Trash2 aria-hidden="true" />
				Excluir
			</Button>
		</div>
	);
}
