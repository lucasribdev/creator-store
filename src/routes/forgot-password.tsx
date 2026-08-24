import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import {
	AuthError,
	AuthInput,
	AuthScreen,
} from "#/components/auth/auth-screen.tsx";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/forgot-password")({
	validateSearch: (search: Record<string, unknown>) => ({
		error:
			search.error === true || search.error === 1 || search.error === "1"
				? 1
				: undefined,
	}),
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	const search = Route.useSearch();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState(
		search.error === 1
			? "Nao foi possivel enviar as instrucoes agora. Tente novamente."
			: "",
	);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setSent(false);
		setError("");

		window.setTimeout(() => {
			setLoading(false);

			if (email.toLowerCase().includes("erro")) {
				setError(
					"Nao foi possivel enviar as instrucoes agora. Tente novamente.",
				);
				return;
			}

			setSent(true);
		}, 800);
	}

	return (
		<AuthScreen
			backTo="/login"
			backLabel="Voltar para login"
			title="Recuperar senha"
			description="Informe o email usado na Creator Store para receber instrucoes de recuperacao."
			footer={
				<p>
					Lembrou a senha?{" "}
					<Link
						to="/login"
						className="font-bold text-blue-700 underline-offset-4 hover:underline"
					>
						Entrar
					</Link>
				</p>
			}
		>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<AuthInput
					id="email"
					icon={Mail}
					label="Email"
					type="email"
					placeholder="criador@email.com"
					autoComplete="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
				/>

				{error ? <AuthError>{error}</AuthError> : null}

				{sent ? (
					<div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950">
						<CheckCircle2
							className="mt-0.5 size-4 shrink-0 text-emerald-600"
							aria-hidden="true"
						/>
						<p>
							Se esse email estiver cadastrado, as instrucoes serao enviadas.
						</p>
					</div>
				) : null}

				<Button type="submit" className="h-11 w-full" disabled={loading}>
					{loading ? (
						<Loader2 className="animate-spin" aria-hidden="true" />
					) : null}
					{loading
						? "Enviando..."
						: sent
							? "Reenviar instrucoes"
							: "Enviar instrucoes"}
				</Button>
			</form>
		</AuthScreen>
	);
}
