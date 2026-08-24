import { ImageOff, Package } from "lucide-react";
import type { ReactNode } from "react";

import { StatusBadge } from "#/components/common/status-badge.tsx";

type ProductRowProps = {
	name: string;
	description?: string;
	price?: string;
	isActive: boolean;
	isFeatured?: boolean;
	hasImage?: boolean;
	actions?: ReactNode;
};

export function ProductRow({
	name,
	description,
	price,
	isActive,
	isFeatured = false,
	hasImage = true,
	actions,
}: ProductRowProps) {
	return (
		<article className="rounded-lg border bg-surface p-4 shadow-sm">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex min-w-0 gap-4">
					<div className="flex size-20 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
						{hasImage ? (
							<Package className="size-6" aria-hidden="true" />
						) : (
							<ImageOff className="size-6" aria-hidden="true" />
						)}
					</div>
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="min-w-0 break-words font-extrabold text-foreground">
								{name}
							</h3>
							{isFeatured ? (
								<StatusBadge tone="success" icon="featured">
									Destaque
								</StatusBadge>
							) : null}
							<StatusBadge
								tone={isActive ? "success" : "neutral"}
								icon={isActive ? "active" : "inactive"}
							>
								{isActive ? "Ativo" : "Inativo"}
							</StatusBadge>
							{hasImage ? null : (
								<StatusBadge tone="warning" icon="image-missing">
									Sem imagem
								</StatusBadge>
							)}
						</div>
						{description ? (
							<p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
								{description}
							</p>
						) : null}
						{price ? (
							<p className="mt-2 text-sm font-extrabold text-foreground">
								{price}
							</p>
						) : null}
					</div>
				</div>
				{actions ? (
					<div className="w-full shrink-0 lg:w-auto">{actions}</div>
				) : null}
			</div>
		</article>
	);
}
