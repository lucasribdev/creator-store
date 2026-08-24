import { Link } from "@tanstack/react-router";
import { Image, ImageOff, Info, Package, Save } from "lucide-react";

import {
	InlineAlert,
	SectionHeader,
	StatusBadge,
} from "#/components/common/index.ts";
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
		<section className="mt-6 rounded-lg border bg-surface p-4 shadow-sm sm:p-5">
			<SectionHeader
				icon={<Package className="size-5" aria-hidden="true" />}
				title={mode === "new" ? "Adicionar produto" : "Editar produto"}
				description="Cadastre a recomendacao e o destino externo que o visitante deve abrir."
			/>

			{showError ? (
				<div className="mt-5">
					<InlineAlert tone="danger" title="Nao foi possivel salvar o produto.">
						Confira os campos obrigatorios e tente novamente.
					</InlineAlert>
				</div>
			) : null}

			<form className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
				<div className="space-y-5">
					<fieldset className="space-y-4 rounded-lg border p-4">
						<legend className="px-1 text-sm font-extrabold">
							Dados obrigatorios
						</legend>
						<div className="space-y-2">
							<Label htmlFor="product-name">Nome do produto</Label>
							<Input
								id="product-name"
								defaultValue={initialValues.name}
								placeholder="Fone Bluetooth compacto"
								aria-invalid={showError && initialValues.name.trim() === ""}
								aria-describedby={
									showError && initialValues.name.trim() === ""
										? "product-name-error"
										: undefined
								}
							/>
							{showError && initialValues.name.trim() === "" ? (
								<p
									id="product-name-error"
									className="text-xs font-medium text-danger"
								>
									Informe o nome do produto.
								</p>
							) : null}
						</div>

						<div className="space-y-2">
							<Label htmlFor="external-url">Link externo</Label>
							<Input
								id="external-url"
								defaultValue={initialValues.externalUrl}
								placeholder="https://loja.com/produto"
								aria-invalid={
									showError && initialValues.externalUrl.trim() === ""
								}
								aria-describedby={
									showError && initialValues.externalUrl.trim() === ""
										? "external-url-error external-url-help"
										: "external-url-help"
								}
							/>
							{showError && initialValues.externalUrl.trim() === "" ? (
								<p
									id="external-url-error"
									className="text-xs font-medium text-danger"
								>
									Informe o link externo do produto.
								</p>
							) : null}
							<p
								id="external-url-help"
								className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
							>
								<Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
								A Creator Store apresenta a recomendacao e envia o visitante
								para este endereco.
							</p>
						</div>
					</fieldset>

					<fieldset className="space-y-4 rounded-lg border p-4">
						<legend className="px-1 text-sm font-extrabold">
							Detalhes opcionais
						</legend>
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
								<Label htmlFor="price">Preco</Label>
								<Input
									id="price"
									defaultValue={initialValues.price}
									placeholder="R$ 149,90"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="previous-price">Preco antigo</Label>
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
					</fieldset>

					<fieldset className="grid gap-3 sm:grid-cols-2">
						<legend className="sr-only">Publicacao</legend>
						<div className="flex items-center justify-between gap-4 rounded-md border bg-muted/50 px-4 py-3">
							<div>
								<p className="text-sm font-bold">Produto ativo</p>
								<p className="mt-1 text-xs text-muted-foreground">
									Aparece na pagina publica.
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
					</fieldset>

					<div className="flex flex-col gap-3 sm:flex-row">
						<Button asChild>
							<Link
								to="/dashboard/products"
								search={{ empty: false, saved: "product" }}
							>
								<Save aria-hidden="true" />
								Salvar produto
							</Link>
						</Button>
						<Button asChild variant="outline">
							<Link
								to="/dashboard/products"
								search={{ empty: false, saved: undefined }}
							>
								Voltar para lista
							</Link>
						</Button>
					</div>
				</div>

				<aside className="rounded-lg border border-dashed bg-surface p-4">
					<div className="flex aspect-[4/3] items-center justify-center rounded-md bg-muted text-muted-foreground">
						<ImageOff className="size-8" aria-hidden="true" />
					</div>
					<div className="mt-3 flex flex-wrap items-center gap-2">
						<p className="text-sm font-bold">Imagem do produto</p>
						<StatusBadge tone="warning" icon="image-missing">
							Sem imagem
						</StatusBadge>
					</div>
					<p className="mt-1 text-xs leading-5 text-muted-foreground">
						O produto continua publicavel sem imagem, com marcador visual na
						vitrine.
					</p>
					<Button
						type="button"
						variant="outline"
						className="mt-4 w-full"
						disabled
						aria-describedby="product-image-help"
					>
						<Image aria-hidden="true" />
						Escolher imagem
					</Button>
					<p
						id="product-image-help"
						className="mt-2 text-xs leading-5 text-muted-foreground"
					>
						Adicione uma imagem para facilitar o reconhecimento na pagina
						publica.
					</p>
				</aside>
			</form>
		</section>
	);
}
