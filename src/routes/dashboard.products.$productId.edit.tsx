import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ProductFormPrototype } from "#/components/prototype/product-form.tsx";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/dashboard/products/$productId/edit")({
	validateSearch: (search: Record<string, unknown>) => ({
		error: search.error === "1",
	}),
	component: EditProductPlaceholder,
});

function EditProductPlaceholder() {
	const { productId } = Route.useParams();
	const { error } = Route.useSearch();

	return (
		<div>
			<Button asChild variant="ghost" size="sm" className="w-fit px-0">
				<Link
					to="/dashboard/products"
					search={{ empty: false, saved: undefined }}
				>
					<ArrowLeft aria-hidden="true" />
					Voltar para produtos
				</Link>
			</Button>
			<ProductFormPrototype
				mode="edit"
				showError={error}
				initialValues={{
					name:
						productId === "mini-tripe"
							? "Mini tripe para celular"
							: "Fone Bluetooth compacto",
					externalUrl: `https://example.com/${productId}`,
					description:
						"Produto ficticio usado para validar a experiencia de edicao.",
					price: "R$ 149,90",
					previousPrice: "R$ 199,90",
					buttonLabel: "Ver produto",
					isActive: productId !== "ring-light",
					isFeatured: productId === "fone-bluetooth",
				}}
			/>
		</div>
	);
}
