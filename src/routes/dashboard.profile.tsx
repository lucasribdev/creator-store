import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Image, UserRound } from "lucide-react";
import { useState } from "react";

import { InlineAlert, SectionHeader } from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";
import { Textarea } from "#/components/ui/textarea.tsx";

export const Route = createFileRoute("/dashboard/profile")({
	component: ProfileFormPage,
});

function ProfileFormPage() {
	const [saved, setSaved] = useState(false);

	return (
		<section className="mt-6 rounded-3xl border border-border/80 bg-surface p-4 shadow-xs sm:p-5">
			<div className="mx-auto max-w-5xl">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<Button asChild variant="ghost" size="sm" className="w-fit px-0">
						<Link to="/dashboard">
							<ArrowLeft aria-hidden="true" />
							Voltar ao painel
						</Link>
					</Button>

					<Button asChild variant="outline" size="sm">
						<Link
							to="/$username"
							params={{ username: "lucasreviews" }}
							search={{ empty: false, published: true }}
						>
							Visualizar pagina
							<ExternalLink aria-hidden="true" />
						</Link>
					</Button>
				</div>

				<div className="mt-5">
					<SectionHeader
						icon={<UserRound className="size-5" aria-hidden="true" />}
						title="Editar perfil"
						description="Mantenha os dados publicos essenciais completos antes de compartilhar a vitrine."
					/>
				</div>

				{saved ? (
					<div className="mt-5">
						<InlineAlert tone="success">Perfil salvo com sucesso.</InlineAlert>
					</div>
				) : null}

				<form
					className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]"
					onSubmit={(event) => {
						event.preventDefault();
						setSaved(true);
					}}
				>
					<div className="space-y-5">
						<fieldset className="space-y-4 rounded-2xl border border-border/80 p-4 shadow-xs">
							<legend className="px-1 text-sm font-extrabold">
								Dados obrigatorios
							</legend>
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<div className="flex overflow-hidden rounded-2xl border border-input bg-surface shadow-xs focus-within:ring-[3px] focus-within:ring-ring/50">
									<span className="flex shrink-0 items-center border-r border-input px-3 text-sm text-muted-foreground">
										/
									</span>
									<Input
										id="username"
										defaultValue="lucasreviews"
										className="border-0 bg-transparent shadow-none focus-visible:ring-0"
									/>
								</div>
								<p className="text-xs leading-5 text-muted-foreground">
									Usado no link publico da vitrine: /lucasreviews.
								</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="display-name">Nome de exibicao</Label>
								<Input id="display-name" defaultValue="Lucas Reviews" />
								<p className="text-xs leading-5 text-muted-foreground">
									Esse nome aparece no topo da pagina publica.
								</p>
							</div>
						</fieldset>

						<fieldset className="space-y-4 rounded-2xl border border-border/80 p-4 shadow-xs">
							<legend className="px-1 text-sm font-extrabold">
								Dados opcionais
							</legend>
							<div className="space-y-2">
								<Label htmlFor="bio">Bio</Label>
								<Textarea
									id="bio"
									defaultValue="Produtos e acessorios que uso no dia a dia e recomendo para quem cria conteudo pelo celular."
									className="min-h-28"
								/>
								<p className="text-xs leading-5 text-muted-foreground">
									Texto curto para orientar quem chega pela bio das redes.
								</p>
							</div>
						</fieldset>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button type="submit">Salvar alteracoes</Button>
							<Button asChild type="button" variant="outline">
								<Link
									to="/$username"
									params={{ username: "lucasreviews" }}
									search={{ empty: false, published: true }}
								>
									Visualizar pagina
									<ExternalLink aria-hidden="true" />
								</Link>
							</Button>
						</div>
					</div>

					<aside className="space-y-4">
						<ImagePlaceholder
							label="Avatar"
							shape="avatar"
							description="Quando vazio, a pagina usa um marcador com a inicial do nome."
						/>
						<ImagePlaceholder
							label="Banner"
							shape="banner"
							description="Opcional. Use quando quiser reforcar a identidade visual da vitrine."
						/>
					</aside>
				</form>
			</div>
		</section>
	);
}

function ImagePlaceholder({
	label,
	shape,
	description,
}: {
	label: string;
	shape: "avatar" | "banner";
	description: string;
}) {
	return (
		<div className="rounded-2xl border border-dashed border-border/80 bg-surface p-4 shadow-xs">
			<div
				className={
					shape === "avatar"
						? "flex aspect-square max-w-28 items-center justify-center rounded-full bg-muted text-muted-foreground"
						: "flex aspect-[16/7] items-center justify-center rounded-2xl bg-muted text-muted-foreground"
				}
			>
				<Image className="size-6" aria-hidden="true" />
			</div>
			<p className="mt-3 text-sm font-bold">{label}</p>
			<p className="mt-1 text-xs leading-5 text-muted-foreground">
				{description}
			</p>
		</div>
	);
}
