import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold">Creator Store</h1>
			<p className="mt-4 max-w-2xl text-lg">
				Vitrine pessoal para criadores organizarem produtos recomendados e
				direcionarem visitantes para links externos.
			</p>
		</div>
	);
}
