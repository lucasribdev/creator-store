import { Link } from "@tanstack/react-router";
import { Image, Info, Package } from "lucide-react";

import { InlineAlert, SectionHeader } from "#/components/common/index.ts";
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
		<section className="mt-6 rounded-lg border bg-surface p-5 shadow-sm">
			<SectionHeader
				icon={<Package className="size-5" aria-hidden="true" />}
				title={mode === "new" ? "Adicionar produto" : "Editar produto"}
				description="Preencha os dados da recomendacao. O botao do produto sempre direciona o visitante para um link externo."
			/>

			{showError ? (
				<div className="mt-5">
					<InlineAlert tone="danger" title="Nao foi possivel salvar o produto.">
						Mensagem demonstrativa. A validacao real fica fora desta etapa.
					</InlineAlert>
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
						<p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
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
						<div className="flex items-center justify-between gap-4 rounded-md border bg-muted/50 px-4 py-3">
							<div>
								<p className="text-sm font-bold">Produto ativo</p>
								<p className="mt-1 text-xs text-muted-foreground">
									Ativos aparecem publicamente.
								</p>
							</div>
							<Switch
								defaultChecked={initialValues.isActive}
								aria-label="Produto ativo"
							/>
						</div>
						<div className="flex items-center justify-between gap-4 rounded-md border bg-muted/50 px-4 py-3">
							<div>
								<p className="text-sm font-bold">Produto em destaque</p>
								<p className="mt-1 text-xs text-muted-foreground">
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

				<aside className="rounded-lg border border-dashed bg-surface p-4">
					<div className="flex aspect-[4/3] items-center justify-center rounded-md bg-muted text-muted-foreground">
						<Image className="size-8" aria-hidden="true" />
					</div>
					<p className="mt-3 text-sm font-bold">Imagem do produto</p>
					<p className="mt-1 text-xs leading-5 text-muted-foreground">
						Area reservada para imagem. Upload real e validacao de arquivo ficam
						fora desta etapa.
					</p>
					<Button type="button" variant="outline" className="mt-4 w-full">
						Escolher imagem fake
					</Button>
				</aside>
			</form>
		</section>
	);
}
