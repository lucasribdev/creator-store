# Decisions

## Objetivo

Este documento registra as principais decisões do projeto e o motivo pelo qual elas foram tomadas.

Seu objetivo é evitar que decisões importantes sejam revisitadas repetidamente e preservar o contexto do desenvolvimento.

Novas decisões devem ser adicionadas conforme o produto evoluir.

---

# Produto

## A plataforma é uma vitrine, não um e-commerce

**Status:** Decisão permanente

### Decisão

A plataforma será responsável apenas por apresentar produtos e direcionar o visitante para uma página externa.

### Motivo

O objetivo é ajudar criadores de conteúdo a organizar recomendações, não competir com marketplaces ou lojas virtuais.

### Consequências

A plataforma nunca será responsável por:

- carrinho;
- checkout;
- pagamentos;
- pedidos;
- estoque;
- frete;
- entrega;
- devoluções.

---

## Um criador possui apenas uma página

**Status:** MVP

### Decisão

Cada usuário poderá possuir apenas uma página pública.

### Motivo

Simplifica o modelo de dados, a navegação e a experiência.

Caso exista demanda no futuro, será possível adicionar múltiplas páginas sem quebrar a estrutura atual.

---

## Cadastro manual de produtos

**Status:** MVP

### Decisão

Todos os produtos serão cadastrados manualmente pelo criador.

### Motivo

Evita integrações complexas e acelera o desenvolvimento.

Também permite validar se o problema realmente existe antes de investir em automações.

---

## Sem categorias no MVP

**Status:** MVP

### Decisão

Os produtos serão exibidos em uma única lista.

### Motivo

Categorias aumentam significativamente a complexidade do sistema.

Antes de implementá-las, será necessário validar se os usuários realmente possuem produtos suficientes para justificar essa organização.

A ordenação manual será suficiente na primeira versão.

---

## Apenas um produto em destaque

**Status:** MVP

### Decisão

Cada página poderá destacar apenas um produto.

### Motivo

Ajuda o criador a direcionar a atenção do visitante para sua principal recomendação.

Também simplifica o layout da página pública.

---

## Uma URL por criador

**Status:** Permanente

### Decisão

Cada criador terá uma URL única.

Exemplo:

```text
plataforma.com/lucas
```

### Motivo

Facilita compartilhamento, branding e memorização.

---

# Usuários

## Não será necessário criar conta para visitar páginas

**Status:** Permanente

### Decisão

Visitantes poderão acessar qualquer página publicada sem autenticação.

### Motivo

O objetivo da plataforma é facilitar a descoberta de produtos.

Exigir login reduziria a conversão.

---

## O criador controla apenas seus próprios dados

**Status:** Permanente

### Decisão

Cada usuário poderá visualizar e editar apenas seus próprios dados.

### Motivo

Garantir isolamento entre contas e manter a segurança da plataforma.

---

# Produtos

## O preço é apenas informativo

**Status:** Permanente

### Decisão

Os preços exibidos serão cadastrados manualmente.

### Motivo

A plataforma não controla preços de lojas externas.

O criador é responsável por manter essas informações atualizadas.

---

## O link do produto pertence ao criador

**Status:** Permanente

### Decisão

Cada produto possuirá um link informado pelo próprio usuário.

### Motivo

A plataforma não irá gerar nem validar automaticamente links afiliados.

---

## Produtos podem ser ocultados

**Status:** MVP

### Decisão

Produtos poderão ser desativados sem serem excluídos.

### Motivo

Permite remover temporariamente um produto da página pública sem perder seus dados.

---

# Métricas

## Apenas métricas básicas no MVP

**Status:** MVP

### Decisão

Registrar apenas:

- visualizações;
- cliques.

### Motivo

São suficientes para validar o uso da plataforma.

Analytics avançado poderá ser desenvolvido posteriormente.

---

# Desenvolvimento

## Mobile First

**Status:** Permanente

### Decisão

Toda interface será desenvolvida priorizando celulares.

### Motivo

A maior parte dos acessos virá de links compartilhados em redes sociais.

---

## Evolução baseada em validação

**Status:** Permanente

### Decisão

Novas funcionalidades somente serão desenvolvidas após validação com usuários.

### Motivo

Evitar desenvolver recursos que ninguém utilizará.

---

## Documentação antes da implementação

**Status:** Permanente

### Decisão

Toda funcionalidade relevante deverá ser documentada antes de ser implementada.

### Motivo

Facilita a organização do projeto e reduz retrabalho.

---

## Stack tecnica do MVP

**Status:** MVP

### Decisão

O MVP sera desenvolvido com:

- TanStack Start;
- TypeScript;
- Tailwind CSS;
- Supabase Postgres;
- Supabase Auth;
- Supabase Storage;
- Drizzle ORM;
- Zod;
- TanStack Form;
- Cloudflare Workers para deploy inicial.

### Motivo

A stack permite construir a pagina publica, o dashboard privado, formularios, autenticacao, banco relacional, upload de imagens e metricas basicas com pouca infraestrutura inicial.

TanStack Start foi escolhido por oferecer uma experiencia full-stack React com rotas type-safe, renderizacao no servidor, server functions e boa integracao com TypeScript.

TanStack Form foi escolhido para manter os formularios dentro do ecossistema TanStack e preservar boa tipagem nas telas privadas.

Cloudflare Workers foi escolhido para o deploy inicial por combinar com a portabilidade do TanStack Start, oferecer boa performance global e manter baixo custo operacional.

Supabase reduz o custo de implementacao de autenticacao, banco de dados e storage, que sao necessidades centrais do MVP.

### Consequências

O projeto deve manter a arquitetura simples e evitar APIs experimentais sempre que possivel.

As versoes das dependencias principais devem ser fixadas com cuidado.

Caso a escolha do framework gere atrito relevante durante o desenvolvimento, a decisao podera ser revisitada antes da implementacao completa do MVP.

---

## Validar conexao Postgres no Cloudflare Workers

**Status:** MVP

### Decisão

Antes de implementar funcionalidades que dependam fortemente do banco, a aplicacao devera validar uma consulta minima ao Supabase Postgres no runtime publicado do Cloudflare Workers.

O projeto pode manter `pg`/`node-postgres`, Drizzle e `nodejs_compat` durante a preparacao tecnica, mas a conexao em producao devera ser validada cedo. Caso a conexao direta gere instabilidade, limite de conexoes ou incompatibilidade operacional, Hyperdrive sera a alternativa preferida.

### Motivo

Cloudflare Workers suporta drivers Postgres com compatibilidade Node.js e conexoes TCP, mas Postgres em Workers tem consideracoes operacionais de pooling, latencia e runtime.

Hyperdrive e o caminho recomendado pela Cloudflare para conectar Workers a bancos Postgres em producao, mantendo compatibilidade com drivers e ORMs existentes.

### Consequências

A camada de acesso ao banco deve evitar ficar acoplada permanentemente a `process.env.DATABASE_URL`.

Uma milestone tecnica curta devera executar uma consulta simples, como `select 1`, no Worker publicado antes do desenvolvimento completo de autenticacao, perfil e produtos.

### Resultado da validacao

Em 2026-08-10, a rota publicada:

```text
/api/health/db
```

executou uma consulta `select 1` contra o Supabase Postgres a partir do Cloudflare Worker e retornou:

```json
{
  "ok": true
}
```

Com isso, a conexao direta usando `pg`/`node-postgres`, Drizzle e `nodejs_compat` esta validada para o proximo corte do MVP.

Esta validacao nao elimina riscos operacionais futuros de pooling, limites de conexao ou latencia. Caso esses problemas aparecam durante o desenvolvimento ou uso real, Hyperdrive continua sendo a alternativa preferida para producao.

---

# Banco de dados

## A tabela public.users espelha o Supabase Auth

**Status:** MVP

### Decisão

A tabela `public.users` devera espelhar o usuario autenticado pelo Supabase Auth.

O campo `public.users.id` devera usar o mesmo UUID de `auth.users.id`.

### Motivo

Supabase Auth sera responsavel por credenciais, sessoes e fluxo de autenticacao.

A aplicacao precisa de uma tabela propria no schema publico para relacionar perfis, produtos e metricas sem consultar diretamente os dados internos de autenticacao em todas as operacoes de produto.

### Consequências

O schema Drizzle deve modelar `users.id` como UUID primario fornecido pelo Supabase Auth.

A criacao do registro em `public.users` deve acontecer de forma coordenada com a criacao do usuario autenticado.

---

## Username normalizado em lowercase

**Status:** MVP

### Decisão

O campo `profiles.username` sera armazenado normalizado em lowercase.

### Motivo

O username e usado na URL publica e deve ser unico sem diferenciar letras maiusculas e minusculas.

Armazenar o valor ja normalizado simplifica consultas, validacoes e garantias de unicidade no banco.

### Consequências

Entradas de username devem ser convertidas para lowercase antes de persistir.

O banco deve possuir restricao de unicidade sobre `profiles.username`.

A exibicao publica deve usar esse valor normalizado como identificador da URL.

---

## Um produto em destaque por perfil no banco

**Status:** MVP

### Decisão

A regra de apenas um produto em destaque por perfil devera ser garantida no banco por um indice unico parcial.

O indice devera considerar `profile_id` apenas quando `is_featured = true`.

### Motivo

A aplicacao pode remover o destaque anterior ao marcar um novo produto, mas a regra e uma invariante do produto e nao deve depender apenas da camada de aplicacao.

### Consequências

O schema Drizzle deve declarar ou acompanhar uma migration com indice unico parcial para produtos em destaque.

Mutations que alteram destaque devem tratar conflito de unicidade e manter uma experiencia clara para o usuario.

---

## Cliques de produto validam o perfil do produto

**Status:** MVP

### Decisão

A tabela `product_clicks` devera garantir que `product_id` pertence ao mesmo `profile_id` registrado no clique.

Essa garantia devera ser feita por chave estrangeira composta referenciando a combinacao correspondente em `products`.

### Motivo

Cliques sao metricas basicas do MVP e precisam permanecer consistentes com o perfil visitado.

Sem essa garantia, seria possivel registrar um clique associando um produto de um perfil a outro perfil.

### Consequências

A tabela `products` deve expor uma chave unica ou primaria compativel com a referencia composta.

`product_clicks` deve armazenar `profile_id` e `product_id` e validar a combinacao no banco.

Falhas ao registrar clique nao devem impedir o redirecionamento do visitante para o link externo.

---

# Funcionalidades adiadas

Estas funcionalidades poderão ser avaliadas futuramente, mas não fazem parte do MVP:

- categorias;
- busca;
- filtros;
- temas;
- domínio personalizado;
- analytics avançado;
- integração com marketplaces;
- importação automática de produtos;
- atualização automática de preços;
- coleções de produtos.

A implementação dependerá da validação do produto e do feedback dos usuários.

---

# Como adicionar novas decisões

Sempre que uma decisão importante for tomada, registre utilizando este modelo:

```md
## Título da decisão

**Status:** MVP | Permanente | Futuro | Descartada

### Decisão

O que foi decidido.

### Motivo

Por que essa decisão foi tomada.

### Consequências

Quais impactos essa decisão gera para o produto ou para a implementação.
```
