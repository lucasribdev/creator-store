import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import {
	AuthError,
	AuthInput,
	AuthScreen,
} from "#/components/auth/auth-screen.tsx";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError("");

		window.setTimeout(() => {
			setLoading(false);

			if (email.toLowerCase().includes("erro")) {
				setError(
					"Email ou senha invalidos. Revise os dados e tente novamente.",
				);
				return;
			}

			void navigate({ to: "/dashboard" });
		}, 800);
	}

	return (
		<AuthScreen
			backTo="/"
			title="Entrar"
			description="Acesse seu painel para atualizar perfil, redes sociais e produtos recomendados."
			footer={
				<p>
					Ainda nao tem conta?{" "}
					<Link
						to="/signup"
						className="font-bold text-blue-700 underline-offset-4 hover:underline"
					>
						Criar conta
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

				<div className="space-y-2">
					<AuthInput
						id="password"
						icon={Lock}
						label="Senha"
						type="password"
						placeholder="********"
						autoComplete="current-password"
						required
					/>
					<div className="text-right">
						<Link
							to="/forgot-password"
							search={{ error: undefined }}
							className="text-xs font-bold text-blue-700 underline-offset-4 hover:underline"
						>
							Esqueci minha senha
						</Link>
					</div>
				</div>

				{error ? <AuthError>{error}</AuthError> : null}

				<Button type="submit" className="h-11 w-full" disabled={loading}>
					{loading ? (
						<Loader2 className="animate-spin" aria-hidden="true" />
					) : null}
					{loading ? "Entrando..." : "Entrar"}
				</Button>
			</form>
		</AuthScreen>
	);
}
