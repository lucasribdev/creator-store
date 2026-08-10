import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	CheckCircle2,
	ExternalLink,
	Image,
	UserRound,
} from "lucide-react";
import { useState } from "react";

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
		<section className="mt-7 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
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

				<div className="mt-5 flex size-11 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
					<UserRound className="size-5" aria-hidden="true" />
				</div>
				<h2 className="mt-5 text-3xl font-extrabold">Editar perfil</h2>
				<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
					Username e nome de exibicao sao os dados minimos para preparar a
					pagina publica do criador.
				</p>

				{saved ? (
					<div className="mt-5 flex items-start gap-3 rounded-md border border-[var(--chip-line)] bg-white/80 px-4 py-3 text-sm text-[var(--sea-ink)]">
						<CheckCircle2
							className="mt-0.5 size-5 shrink-0 text-[var(--palm)]"
							aria-hidden="true"
						/>
						<p>
							Perfil salvo com sucesso no prototipo. Nenhuma alteracao foi
							persistida.
						</p>
					</div>
				) : null}

				<form className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
					<div className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="username">Username obrigatorio</Label>
							<div className="flex overflow-hidden rounded-md border border-input bg-white/60 shadow-xs focus-within:ring-[3px] focus-within:ring-ring/50">
								<span className="flex shrink-0 items-center border-r border-input px-3 text-sm text-[var(--sea-ink-soft)]">
									/
								</span>
								<Input
									id="username"
									defaultValue="lucasreviews"
									className="border-0 bg-transparent shadow-none focus-visible:ring-0"
								/>
							</div>
							<p className="text-xs leading-5 text-[var(--sea-ink-soft)]">
								Usado no link publico da vitrine: /lucasreviews.
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="display-name">Nome de exibicao obrigatorio</Label>
							<Input id="display-name" defaultValue="Lucas Reviews" />
							<p className="text-xs leading-5 text-[var(--sea-ink-soft)]">
								Esse nome aparece no topo da pagina publica.
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bio">Bio</Label>
							<Textarea
								id="bio"
								defaultValue="Produtos e acessorios que uso no dia a dia e recomendo para quem cria conteudo pelo celular."
								className="min-h-28"
							/>
							<p className="text-xs leading-5 text-[var(--sea-ink-soft)]">
								Texto curto para explicar o que o visitante encontra na vitrine.
							</p>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button type="button" onClick={() => setSaved(true)}>
								Salvar alteracoes
							</Button>
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
						<ImagePlaceholder label="Avatar" shape="avatar" />
						<ImagePlaceholder label="Banner" shape="banner" />
					</aside>
				</form>
			</div>
		</section>
	);
}

function ImagePlaceholder({
	label,
	shape,
}: {
	label: string;
	shape: "avatar" | "banner";
}) {
	return (
		<div className="rounded-lg border border-dashed border-[var(--line)] bg-white/65 p-4">
			<div
				className={
					shape === "avatar"
						? "flex aspect-square max-w-28 items-center justify-center rounded-full bg-[var(--sand)] text-[var(--sea-ink-soft)]"
						: "flex aspect-[16/7] items-center justify-center rounded-md bg-[var(--sand)] text-[var(--sea-ink-soft)]"
				}
			>
				<Image className="size-6" aria-hidden="true" />
			</div>
			<p className="mt-3 text-sm font-bold">{label}</p>
			<p className="mt-1 text-xs leading-5 text-[var(--sea-ink-soft)]">
				Placeholder visual. Upload real fica fora desta etapa.
			</p>
		</div>
	);
}
