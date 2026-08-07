import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Package } from "lucide-react";

import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/dashboard/products")({
	component: ProductsPlaceholderPage,
});

function ProductsPlaceholderPage() {
	return (
		<section className="mt-7 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-sm">
			<div className="max-w-3xl">
				<Button asChild variant="ghost" size="sm" className="w-fit px-0">
					<Link to="/dashboard">
						<ArrowLeft aria-hidden="true" />
						Voltar ao painel
					</Link>
				</Button>

				<div className="mt-5 flex size-11 items-center justify-center rounded-md bg-[var(--sea-ink)] text-white">
					<Package className="size-5" aria-hidden="true" />
				</div>
				<h2 className="mt-5 text-3xl font-extrabold">Produtos</h2>
				<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
					Destino navegavel do prototipo. A lista ficticia de produtos entra na
					proxima entrega.
				</p>
			</div>
		</section>
	);
}
