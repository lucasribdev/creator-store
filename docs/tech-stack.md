# Stack Tecnica

## Objetivo

Este documento define a stack recomendada para construir o MVP da Creator Store.

A escolha prioriza:

- desenvolvimento por uma unica pessoa;
- baixo custo inicial;
- rapidez para validar o produto;
- boa experiencia mobile;
- suporte a paginas publicas com SEO basico;
- autenticacao e autorizacao simples;
- banco relacional;
- armazenamento de imagens;
- possibilidade de evolucao sem reescrever a aplicacao.

---

# Stack recomendada para o MVP

## Aplicacao

### TanStack Start

Framework full-stack React escolhido para a aplicacao.

Sera utilizado para:

- rotas publicas;
- rotas privadas;
- renderizacao no servidor;
- pagina publica por username;
- server functions;
- endpoints simples;
- carregamento de dados;
- navegacao type-safe.

### Motivo

O produto precisa combinar:

- pagina publica acessivel sem login;
- dashboard privado;
- formularios;
- carregamento de dados no servidor;
- boa performance em celular;
- controle claro de rotas e parametros.

TanStack Start atende esses pontos mantendo uma experiencia forte com TypeScript e TanStack Router.

### Cuidados

TanStack Start ainda deve ser tratado como uma escolha mais recente do que alternativas mais consolidadas.

Para reduzir risco:

- fixar versoes das dependencias;
- evitar APIs experimentais;
- manter a arquitetura simples;
- revisar changelogs antes de atualizar versoes principais;
- documentar decisoes que dependam do framework.

---

## Linguagem

### TypeScript

Toda a aplicacao devera ser escrita em TypeScript.

### Motivo

O projeto tera formularios, validacoes, rotas, dados publicos e dados privados.

TypeScript ajuda a reduzir erros ao evoluir o MVP e melhora a seguranca das mudancas.

---

## Interface

### Tailwind CSS

Sera utilizado para construir a interface mobile first.

### Motivo

Permite criar telas rapidamente, manter consistencia visual e evitar uma camada pesada de CSS no inicio.

### shadcn/ui

Pode ser utilizado de forma seletiva para componentes de formulario, botoes, dialogs, dropdowns e feedbacks.

Nao deve guiar o produto inteiro se adicionar complexidade desnecessaria.

---

## Banco de dados

### Supabase Postgres

Banco relacional principal do MVP.

Sera utilizado para armazenar:

- perfis;
- links sociais;
- produtos;
- visualizacoes;
- cliques.

### Motivo

O modelo de dados do produto e relacional e simples.

Postgres oferece uma base solida para regras como:

- username unico;
- um perfil por usuario;
- produtos por perfil;
- cliques por produto;
- isolamento de dados.

---

## Autenticacao

### Supabase Auth

Servico de autenticacao recomendado para o MVP.

Sera utilizado para:

- criar conta;
- fazer login;
- recuperar senha;
- manter sessao;
- relacionar o usuario autenticado ao perfil.

### Motivo

Reduz o trabalho necessario para implementar autenticacao com seguranca.

Tambem se integra ao Postgres e permite usar Row Level Security quando necessario.

---

## Armazenamento de imagens

### Supabase Storage

Sera utilizado para armazenar:

- avatar do perfil;
- banner do perfil;
- imagem dos produtos.

### Motivo

Evita armazenar arquivos no banco de dados e mantem imagens no mesmo ecossistema do banco e autenticacao.

O banco deve guardar apenas a URL ou caminho da imagem.

---

## Acesso a dados

### Drizzle ORM

ORM recomendado para o MVP.

Sera utilizado para:

- definir schema;
- criar migrations;
- consultar Postgres;
- manter tipos proximos do banco.

### Motivo

Drizzle e leve, explicito e combina bem com TypeScript.

O modelo inicial da Creator Store nao exige uma camada pesada de abstracao.

---

## Validacao

### Zod

Biblioteca recomendada para validacao de dados.

Sera utilizada para validar:

- username;
- nome de exibicao;
- biografia;
- URLs;
- links sociais;
- produtos;
- precos;
- estados ativo e destaque.

### Motivo

Permite manter as regras de entrada consistentes entre formularios e server functions.

---

## Formularios

### TanStack Form

Biblioteca recomendada para formularios.

Sera utilizada em:

- editar perfil;
- cadastro de produto;
- edicao de produto;
- redes sociais;
- login;
- cadastro.

### Motivo

Mantem a stack alinhada ao ecossistema TanStack e oferece formularios tipados, validacao flexivel e bom controle de estado.

---

# Deploy

## Opcao recomendada inicial

### Cloudflare Workers

Recomendado para o deploy inicial do MVP.

### Motivo

O MVP precisa chegar rapidamente a uma URL publica para validacao com primeiros usuarios.

Cloudflare Workers combina com a portabilidade do TanStack Start, oferece boa performance global e mantem baixo custo operacional no inicio.

## Alternativa

### Vercel

Pode ser considerado caso a simplicidade operacional do ecossistema Vercel se torne mais importante do que a portabilidade inicial.

---

# Fora da stack inicial

Nao utilizar no MVP:

- backend separado em Express, NestJS ou Fastify;
- microsservicos;
- filas;
- CMS;
- analytics avancado;
- Stripe;
- integracoes com marketplaces;
- processamento de pagamentos;
- busca externa;
- painel administrativo complexo;
- aplicativo mobile nativo.

Essas escolhas podem ser revisitadas somente apos validacao do produto.

---

# Stack resumida

```text
Aplicacao: TanStack Start
Linguagem: TypeScript
UI: Tailwind CSS
Componentes: shadcn/ui opcional
Banco: Supabase Postgres
Autenticacao: Supabase Auth
Storage: Supabase Storage
ORM: Drizzle
Validacao: Zod
Formularios: TanStack Form
Deploy inicial: Cloudflare Workers
```

---

# Criterio de aceite tecnico da preparacao

A preparacao tecnica sera considerada concluida quando:

- a stack estiver documentada;
- o projeto estiver criado;
- o ambiente local rodar com um comando documentado;
- existir uma estrutura inicial de rotas;
- a pagina inicial abrir localmente;
- o README explicar como instalar e executar o projeto;
- as principais decisoes tecnicas estiverem registradas em `docs/decisions.md`.
