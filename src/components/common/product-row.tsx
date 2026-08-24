import type { ReactNode } from "react";

import {
	PriceBlock,
	ProductImage,
	StatusPill,
} from "#/components/common/product-card.tsx";

type ProductRowProps = {
	name: string;
	description?: string;
	price?: string;
	previousPrice?: string;
	storeName?: string;
	isActive: boolean;
	isFeatured?: boolean;
	hasImage?: boolean;
	imageUrl?: string;
	actions?: ReactNode;
};

export function ProductRow({
	name,
	description,
	price,
	previousPrice,
	storeName,
	isActive,
	isFeatured = false,
	hasImage = true,
	imageUrl,
	actions,
}: ProductRowProps) {
	return (
		<article className="rounded-xl border bg-white p-3 shadow-xs transition-all duration-[180ms] ease-in-out hover:border-slate-300 hover:shadow-sm sm:p-4">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex min-w-0 gap-3 sm:gap-4">
					<ProductImage
						aspectRatio="square"
						className="size-24 shrink-0 rounded-lg"
						hasImage={hasImage}
						imageUrl={imageUrl}
						name={name}
						storeName={storeName}
					/>
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="min-w-0 break-words font-extrabold text-foreground">
								{name}
							</h3>
							{isFeatured ? <StatusPill status="featured" /> : null}
							<StatusPill status={isActive ? "active" : "inactive"} />
						</div>
						{description ? (
							<p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
								{description}
							</p>
						) : null}
						<div className="mt-2">
							<PriceBlock price={price} previousPrice={previousPrice} />
						</div>
					</div>
				</div>
				{actions ? (
					<div className="w-full shrink-0 lg:w-auto">{actions}</div>
				) : null}
			</div>
		</article>
	);
}
