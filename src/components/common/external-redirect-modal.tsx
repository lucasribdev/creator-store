import { ExternalLink, ImageOff, X } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";

export type ExternalRedirectProduct = {
	name: string;
	storeName: string;
	price: string;
	url: string;
	imageUrl?: string;
	hasImage?: boolean;
};

type ExternalRedirectModalProps = {
	open: boolean;
	product: ExternalRedirectProduct | null;
	onClose: () => void;
	onConfirm?: () => void;
};

export function ExternalRedirectModal({
	open,
	product,
	onClose,
	onConfirm,
}: ExternalRedirectModalProps) {
	if (!open || !product) {
		return null;
	}

	const hasImage = product.hasImage !== false && Boolean(product.imageUrl);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs"
			role="dialog"
			aria-modal="true"
			aria-labelledby="external-redirect-title"
		>
			<div className="relative w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white p-5 text-slate-950 shadow-xs dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-50">
				<Button
					type="button"
					variant="ghost"
					size="icon-sm"
					className="absolute right-3 top-3 rounded-full"
					onClick={onClose}
					aria-label="Fechar"
				>
					<X aria-hidden="true" />
				</Button>

				<div className="pr-9">
					<p className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
						Link externo
					</p>
					<h2
						id="external-redirect-title"
						className="mt-1 text-lg font-extrabold"
					>
						Abrir pagina externa
					</h2>
				</div>

				<div className="mt-5 flex gap-3">
					<div
						className={cn(
							"flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
							hasImage ? "" : "border border-dashed",
						)}
					>
						{hasImage ? (
							<img
								src={product.imageUrl}
								alt={`Imagem do produto: ${product.name}`}
								className="size-full object-cover"
							/>
						) : (
							<ImageOff className="size-5" aria-hidden="true" />
						)}
					</div>
					<div className="min-w-0">
						<p className="break-words text-sm font-extrabold">{product.name}</p>
						<p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
							{product.storeName}
						</p>
						<p className="mt-2 text-sm font-extrabold text-slate-950 dark:text-slate-50">
							{product.price}
						</p>
					</div>
				</div>

				<div className="mt-4 break-all rounded-2xl bg-slate-100 p-3 font-mono text-[11px] leading-4 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
					{product.url}
				</div>

				<div className="mt-5 grid grid-cols-2 gap-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Voltar
					</Button>
					<Button asChild onClick={onConfirm}>
						<a href={product.url} target="_blank" rel="noreferrer">
							Abrir link
							<ExternalLink aria-hidden="true" />
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
