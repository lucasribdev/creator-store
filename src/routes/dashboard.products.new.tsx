import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ProductFormPrototype } from "#/components/prototype/product-form.tsx";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/dashboard/products/new")({
	component: NewProductPlaceholder,
});

function NewProductPlaceholder() {
	return (
		<div>
			<Button asChild variant="ghost" size="sm" className="w-fit px-0">
				<Link to="/dashboard/products">
					<ArrowLeft aria-hidden="true" />
					Voltar para produtos
				</Link>
			</Button>
			<ProductFormPrototype
				mode="new"
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
