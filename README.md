# Creator Store

Creator Store e uma plataforma para afiliados e criadores de conteudo transformarem o link da bio em uma vitrine pessoal de produtos recomendados.

O produto nao e um e-commerce, marketplace ou loja virtual. A compra sempre acontece fora da plataforma, por meio dos links externos cadastrados pelo criador.

## Status

MVP em preparacao tecnica.

## Publico inicial

- Afiliados do TikTok
- Afiliados do Instagram
- Criadores que recomendam produtos

## Objetivo do MVP

Permitir que um criador:

- crie uma conta;
- configure uma pagina publica;
- adicione redes sociais;
- cadastre produtos manualmente;
- publique sua vitrine;
- compartilhe o link publico.

Permitir que um visitante:

- acesse uma pagina publica sem login;
- visualize perfil, redes sociais e produtos ativos;
- clique em um produto;
- seja redirecionado para uma loja ou pagina externa.

## Stack

- TanStack Start
- TypeScript
- TanStack Router
- TanStack Query
- TanStack Form
- Tailwind CSS
- shadcn/ui de forma seletiva
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Drizzle ORM
- Zod
- Cloudflare Workers

## Requisitos

- Node.js compativel com as dependencias do projeto
- pnpm
- Conta Supabase para banco, auth e storage
- Conta Cloudflare para deploy em Workers

## Ambiente local

Crie um arquivo `.env.local` com base em `.env.example`.

```bash
pnpm install
pnpm dev
```

A aplicacao roda em:

```text
http://localhost:3000
```

## Scripts

```bash
pnpm dev
pnpm check
pnpm build
pnpm preview
```

Scripts de banco:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:push
pnpm db:pull
pnpm db:studio
```

Deploy:

```bash
pnpm deploy
```

## Variaveis de ambiente

As variaveis esperadas estao documentadas em `.env.example`.

Segredos reais devem ficar em `.env.local` no desenvolvimento e em secrets/bindings do Cloudflare Workers em producao.

## Documentacao

- [Visao do produto](./docs/vision.md)
- [Escopo do MVP](./docs/mvp.md)
- [Fluxos do usuario](./docs/user-flows.md)
- [Modelo de dados](./docs/data-model.md)
- [Stack tecnica](./docs/tech-stack.md)
- [Roadmap](./docs/roadmap.md)
- [Decisoes](./docs/decisions.md)

## Limites do produto

Nao implementar:

- carrinho;
- checkout;
- pagamentos;
- pedidos;
- estoque;
- frete;
- entrega;
- emissao de notas;
- devolucoes;
- avaliacoes;
- comentarios;
- feed social.

## Estado tecnico atual

A base usa TanStack Start com Cloudflare Workers, Tailwind CSS, Biome e Drizzle configurados.

A compatibilidade de `pg`/`node-postgres` com Supabase Postgres no runtime publicado do Cloudflare Workers ainda deve ser validada antes da implementacao pesada do banco. Hyperdrive e o caminho recomendado para producao se o deploy inicial permanecer em Workers.
