import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
	ArrowLeft,
	BadgeAlert,
	Edit3,
	ExternalLink,
	Globe,
	Instagram,
	Link2,
	MessageCircle,
	Music2,
	Plus,
	Trash2,
	Youtube,
} from "lucide-react";
import { useState } from "react";

import {
	EmptyState,
	InlineAlert,
	MetricCard,
	SectionHeader,
	StatusBadge,
} from "#/components/common/index.ts";
import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select.tsx";
import { Switch } from "#/components/ui/switch.tsx";

export const Route = createFileRoute("/dashboard/social-links")({
	validateSearch: (search: Record<string, unknown>) => ({
		empty:
			search.empty === true || search.empty === "1" || search.empty === "true",
		error:
			search.error === true || search.error === "1" || search.error === "true",
	}),
	component: SocialLinksPage,
});

type SocialLinkType =
	| "instagram"
	| "tiktok"
	| "youtube"
	| "whatsapp"
	| "website"
	| "other";

type SocialLinkItem = {
	id: string;
	type: SocialLinkType;
	label?: string;
	url: string;
	position: number;
	isActive: boolean;
};

const socialTypes: Record<
	SocialLinkType,
	{
		name: string;
		placeholder: string;
		icon: LucideIcon;
	}
> = {
	instagram: {
		name: "Instagram",
		placeholder: "https://instagram.com/seuusuario",
		icon: Instagram,
	},
	tiktok: {
		name: "TikTok",
		placeholder: "https://tiktok.com/@seuusuario",
		icon: Music2,
	},
	youtube: {
		name: "YouTube",
		placeholder: "https://youtube.com/@seucanal",
		icon: Youtube,
	},
	whatsapp: {
		name: "WhatsApp",
		placeholder: "https://wa.me/5511999999999",
		icon: MessageCircle,
	},
	website: {
		name: "Site pessoal",
		placeholder: "https://seudominio.com",
		icon: Globe,
	},
	other: {
		name: "Outro link",
		placeholder: "https://exemplo.com/link-importante",
		icon: Link2,
	},
};

const socialLinks: SocialLinkItem[] = [
	{
		id: "instagram",
		type: "instagram",
		url: "https://instagram.com/lucasreviews",
		position: 1,
		isActive: true,
	},
	{
		id: "tiktok",
		type: "tiktok",
		url: "https://tiktok.com/@lucasreviews",
		position: 2,
		isActive: true,
	},
	{
		id: "youtube",
		type: "youtube",
		url: "https://youtube.com/@lucasreviews",
		position: 3,
		isActive: true,
	},
	{
		id: "whatsapp",
		type: "whatsapp",
		url: "https://wa.me/5511999999999",
		position: 4,
		isActive: false,
	},
	{
		id: "website",
		type: "website",
		url: "https://lucasreviews.com",
		position: 5,
		isActive: true,
	},
	{
		id: "kit-links",
		type: "other",
		label: "Kit de gravacao",
		url: "https://example.com/kit-gravacao",
		position: 6,
		isActive: false,
	},
];

function SocialLinksPage() {
	const { empty, error } = Route.useSearch();
	const visibleLinks = empty ? [] : socialLinks;
	const activeLinks = visibleLinks.filter((socialLink) => socialLink.isActive);
	const [selectedType, setSelectedType] = useState<SocialLinkType>("instagram");
	const [editingLink, setEditingLink] = useState<SocialLinkItem | null>(null);
	const [saved, setSaved] = useState(false);
	const selectedTypeMeta = socialTypes[selectedType];
	const SelectedIcon = selectedTypeMeta.icon;

	function editLink(socialLink: SocialLinkItem) {
		setEditingLink(socialLink);
		setSelectedType(socialLink.type);
		setSaved(false);
	}

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
						icon={<Link2 className="size-5" aria-hidden="true" />}
						title="Redes sociais"
						description="Escolha quais redes e links externos aparecem no topo da sua pagina publica."
					/>
				</div>

				<div className="mt-5 grid gap-3 sm:grid-cols-3">
					<MetricCard
						label="Links cadastrados"
						value={String(visibleLinks.length)}
					/>
					<MetricCard
						label="Ativos na pagina"
						value={String(activeLinks.length)}
					/>
					<MetricCard
						label="Inativos"
						value={String(visibleLinks.length - activeLinks.length)}
					/>
				</div>

				{error ? (
					<div className="mt-5">
						<InlineAlert tone="danger" title="Nao foi possivel salvar">
							Confira a URL informada e tente novamente.
						</InlineAlert>
					</div>
				) : null}

				{saved ? (
					<div className="mt-5">
						<InlineAlert tone="success">Link salvo com sucesso.</InlineAlert>
					</div>
				) : null}

				<div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
					<div className="min-w-0 space-y-3">
						{visibleLinks.length > 0 ? (
							visibleLinks.map((socialLink) => (
								<SocialLinkRow
									key={socialLink.id}
									socialLink={socialLink}
									onEdit={() => editLink(socialLink)}
								/>
							))
						) : (
							<EmptyState
								icon={<BadgeAlert className="size-5" aria-hidden="true" />}
								title="Nenhuma rede social cadastrada"
								description="Adicione um link para que visitantes encontrem seus canais fora da vitrine."
								action={
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											setEditingLink(null);
											setSelectedType("instagram");
										}}
									>
										<Plus aria-hidden="true" />
										Adicionar link
									</Button>
								}
							/>
						)}
					</div>

					<form
						key={editingLink?.id ?? `new-${selectedType}`}
						className="h-fit rounded-lg border p-4"
						onSubmit={(event) => {
							event.preventDefault();
							setSaved(true);
							setEditingLink(null);
						}}
					>
						<div className="flex items-center gap-3">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
								<SelectedIcon className="size-5" aria-hidden="true" />
							</div>
							<div className="min-w-0">
								<h3 className="font-extrabold">
									{editingLink ? "Editar link" : "Adicionar link"}
								</h3>
								<p className="text-xs leading-5 text-muted-foreground">
									{selectedTypeMeta.name} na pagina publica.
								</p>
							</div>
						</div>

						<div className="mt-5 space-y-4">
							<div className="space-y-2">
								<Label htmlFor="social-type">Tipo de rede</Label>
								<Select
									value={selectedType}
									onValueChange={(value) =>
										setSelectedType(value as SocialLinkType)
									}
								>
									<SelectTrigger id="social-type" className="w-full">
										<SelectValue placeholder="Selecione uma rede" />
									</SelectTrigger>
									<SelectContent>
										{Object.entries(socialTypes).map(([type, socialType]) => {
											const SocialTypeIcon = socialType.icon;

											return (
												<SelectItem key={type} value={type}>
													<SocialTypeIcon aria-hidden="true" />
													{socialType.name}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="social-label">
									Label{" "}
									<span className="font-normal text-muted-foreground">
										{selectedType === "other"
											? "para identificar o link"
											: "opcional"}
									</span>
								</Label>
								<Input
									id="social-label"
									defaultValue={editingLink?.label ?? ""}
									placeholder={
										selectedType === "other"
											? "Ex: Grupo VIP, newsletter, curso"
											: socialTypes[selectedType].name
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="social-url">URL</Label>
								<Input
									id="social-url"
									type="url"
									defaultValue={editingLink?.url ?? ""}
									placeholder={selectedTypeMeta.placeholder}
									required
								/>
							</div>

							<div className="flex min-h-11 items-center justify-between gap-3 rounded-md border bg-muted/50 px-3 py-2">
								<div className="min-w-0">
									<Label htmlFor="social-active">Ativo na pagina</Label>
									<p className="text-xs leading-5 text-muted-foreground">
										Links inativos ficam ocultos para visitantes.
									</p>
								</div>
								<Switch
									id="social-active"
									defaultChecked={editingLink?.isActive ?? true}
								/>
							</div>
						</div>

						<div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col">
							<Button type="submit">
								{editingLink ? "Salvar alteracoes" : "Salvar link"}
							</Button>
							{editingLink ? (
								<Button
									type="button"
									variant="outline"
									onClick={() => {
										setEditingLink(null);
										setSelectedType("instagram");
									}}
								>
									<Plus aria-hidden="true" />
									Novo link
								</Button>
							) : null}
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

function SocialLinkRow({
	socialLink,
	onEdit,
}: {
	socialLink: SocialLinkItem;
	onEdit: () => void;
}) {
	const socialType = socialTypes[socialLink.type];
	const Icon = socialType.icon;
	const title = socialLink.label ?? socialType.name;

	return (
		<article className="rounded-lg border bg-surface p-4 shadow-sm">
			<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
				<div className="min-w-0">
					<div className="flex flex-wrap items-center gap-2">
						<span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
							<Icon className="size-4" aria-hidden="true" />
						</span>
						<div className="min-w-0">
							<h3 className="break-words font-extrabold">{title}</h3>
							<p className="text-xs font-bold text-muted-foreground uppercase">
								{socialType.name} - posicao {socialLink.position}
							</p>
						</div>
						<StatusBadge
							tone={socialLink.isActive ? "success" : "warning"}
							icon={socialLink.isActive ? "active" : "inactive"}
						>
							{socialLink.isActive ? "Ativo" : "Inativo"}
						</StatusBadge>
					</div>
					<a
						href={socialLink.url}
						target="_blank"
						rel="noreferrer"
						className="mt-3 block break-all text-sm font-semibold text-primary no-underline hover:underline"
					>
						{socialLink.url}
					</a>
				</div>

				<div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
					<div className="flex min-h-10 items-center justify-between gap-3 rounded-md border bg-muted/50 px-3 py-2">
						<span className="min-w-0 text-sm font-bold">
							{socialLink.isActive ? "Visivel na pagina" : "Oculto da pagina"}
						</span>
						<Switch
							checked={socialLink.isActive}
							aria-label={`Status de ${title}`}
						/>
					</div>
					<Button
						type="button"
						variant="outline"
						className="w-full sm:w-auto"
						onClick={onEdit}
					>
						<Edit3 aria-hidden="true" />
						Editar
					</Button>
					<Button
						type="button"
						variant="ghost"
						className="w-full text-muted-foreground hover:text-danger sm:col-span-2"
					>
						<Trash2 aria-hidden="true" />
						Remover
					</Button>
				</div>
			</div>
		</article>
	);
}
