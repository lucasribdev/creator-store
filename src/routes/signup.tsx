import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock, Mail, User } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import {
	AuthError,
	AuthInput,
	AuthScreen,
} from "#/components/auth/auth-screen.tsx";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
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
				setError("Não foi possível criar a conta. Tente outro email.");
				return;
			}

			void navigate({ to: "/dashboard" });
		}, 800);
	}

	return (
		<AuthScreen
			backTo="/"
			title="Criar conta"
			description="Monte sua área de criador e prepare a primeira versão da sua vitrine."
			footer={
				<p>
					Já tem conta?{" "}
					<Link
						to="/login"
						className="font-bold text-primary underline-offset-4 hover:underline"
					>
						Entrar
					</Link>
				</p>
			}
		>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<AuthInput
					id="name"
					icon={User}
					label="Nome"
					placeholder="Lucas Reviews"
					autoComplete="name"
					required
				/>
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
				<AuthInput
					id="password"
					icon={Lock}
					label="Senha"
					type="password"
					placeholder="********"
					autoComplete="new-password"
					required
				/>

				{error ? <AuthError>{error}</AuthError> : null}

				<Button type="submit" className="h-11 w-full" disabled={loading}>
					{loading ? (
						<Loader2 className="animate-spin" aria-hidden="true" />
					) : null}
					{loading ? "Criando conta..." : "Criar conta"}
				</Button>
			</form>
		</AuthScreen>
	);
}
