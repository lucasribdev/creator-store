import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ProductFormPrototype } from "#/components/prototype/product-form.tsx";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/dashboard/products/new")({
	validateSearch: (search: Record<string, unknown>) => ({
		error: search.error === "1",
	}),
	component: NewProductPlaceholder,
});

function NewProductPlaceholder() {
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
				mode="new"
				showError={error}
				initialValues={{
					name: "",
					externalUrl: "",
					description: "",
					price: "",
					previousPrice: "",
					buttonLabel: "Ver produto",
					isActive: true,
					isFeatured: false,
				}}
			/>
		</div>
	);
}
