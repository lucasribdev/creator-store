import { Link } from "@tanstack/react-router";
import { AlertTriangle, Image, Info, Package } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";
import { Switch } from "#/components/ui/switch.tsx";
import { Textarea } from "#/components/ui/textarea.tsx";

type ProductFormValues = {
	name: string;
	externalUrl: string;
	description: string;
	price: string;
	previousPrice: string;
	buttonLabel: string;
	isActive: boolean;
	isFeatured: boolean;
};

type ProductFormProps = {
	mode: "new" | "edit";
	initialValues: ProductFormValues;
	showError?: boolean;
};

export function ProductFormPrototype({
	mode,
	initialValues,
	showError = false,
}: ProductFormProps) {
	return (
		<section className="mt-6 rounded-lg border border-[var(--line)] bg-white/80 p-5 shadow-sm">
			<div className="flex size-11 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
				<Package className="size-5" aria-hidden="true" />
			</div>

			<h2 className="mt-5 text-2xl font-extrabold">
				{mode === "new" ? "Adicionar produto" : "Editar produto"}
			</h2>
			<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
				Este formulario valida os campos necessarios para apresentar uma
				recomendacao. O botao do produto sempre direciona o visitante para um
				link externo.
			</p>

			{showError ? (
				<div className="mt-5 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
					<AlertTriangle
						className="mt-0.5 size-5 shrink-0"
						aria-hidden="true"
					/>
					<div>
						<p className="font-bold">Nao foi possivel salvar o produto.</p>
						<p className="mt-1 text-red-800">
							Erro visual generico do prototipo. Nenhuma validacao real foi
							executada.
						</p>
					</div>
				</div>
			) : null}

			<form className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
				<div className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="product-name">Nome do produto</Label>
						<Input
							id="product-name"
							defaultValue={initialValues.name}
							placeholder="Fone Bluetooth compacto"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="external-url">Link externo</Label>
						<Input
							id="external-url"
							defaultValue={initialValues.externalUrl}
							placeholder="https://loja.com/produto"
						/>
						<p className="flex items-start gap-2 text-xs leading-5 text-[var(--sea-ink-soft)]">
							<Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />A
							Creator Store nao vende o produto. O visitante sera enviado para
							este endereco externo.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Descricao curta</Label>
						<Textarea
							id="description"
							defaultValue={initialValues.description}
							placeholder="Resumo simples do motivo da recomendacao."
							className="min-h-24"
						/>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="price">Preco opcional</Label>
							<Input
								id="price"
								defaultValue={initialValues.price}
								placeholder="R$ 149,90"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="previous-price">Preco antigo opcional</Label>
							<Input
								id="previous-price"
								defaultValue={initialValues.previousPrice}
								placeholder="R$ 199,90"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="button-label">Texto do botao</Label>
						<Input
							id="button-label"
							defaultValue={initialValues.buttonLabel}
							placeholder="Ver produto"
						/>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<div className="flex items-center justify-between gap-4 rounded-md border border-[var(--line)] bg-white/70 px-4 py-3">
							<div>
								<p className="text-sm font-bold">Produto ativo</p>
								<p className="mt-1 text-xs text-[var(--sea-ink-soft)]">
									Ativos aparecem publicamente.
								</p>
							</div>
							<Switch
								defaultChecked={initialValues.isActive}
								aria-label="Produto ativo"
							/>
						</div>
						<div className="flex items-center justify-between gap-4 rounded-md border border-[var(--line)] bg-white/70 px-4 py-3">
							<div>
								<p className="text-sm font-bold">Produto em destaque</p>
								<p className="mt-1 text-xs text-[var(--sea-ink-soft)]">
									Apenas um destaque por perfil.
								</p>
							</div>
							<Switch
								defaultChecked={initialValues.isFeatured}
								aria-label="Produto em destaque"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row">
						<Button asChild>
							<a href="/dashboard/products?saved=product">Salvar produto</a>
						</Button>
						<Button asChild variant="outline">
							<Link
								to="/dashboard/products"
								search={{ empty: false, saved: undefined }}
							>
								Voltar para lista
							</Link>
						</Button>
						<Button asChild variant="ghost">
							<Link to="/dashboard">Voltar ao painel</Link>
						</Button>
					</div>
				</div>

				<aside className="rounded-lg border border-dashed border-[var(--line)] bg-white/65 p-4">
					<div className="flex aspect-[4/3] items-center justify-center rounded-md bg-[var(--sand)] text-[var(--sea-ink-soft)]">
						<Image className="size-8" aria-hidden="true" />
					</div>
					<p className="mt-3 text-sm font-bold">Imagem do produto</p>
					<p className="mt-1 text-xs leading-5 text-[var(--sea-ink-soft)]">
						Placeholder visual. Upload real e validacao de arquivo ficam fora
						desta etapa.
					</p>
					<Button type="button" variant="outline" className="mt-4 w-full">
						Escolher imagem fake
					</Button>
				</aside>
			</form>
		</section>
	);
}
