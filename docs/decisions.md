# Decisions

## Objetivo

Este documento registra as principais decisões do projeto e o motivo pelo qual elas foram tomadas.

Seu objetivo é evitar que decisões importantes sejam revisitadas repetidamente e preservar o contexto do desenvolvimento.

Novas decisões devem ser adicionadas conforme o produto evoluir.

---

# Produto

## A plataforma apresenta destinos externos

**Status:** Decisão permanente

### Decisão

A plataforma será responsável apenas por apresentar recomendações e links, e direcionar o visitante para uma página externa.

### Motivo

O objetivo é ajudar criadores de conteúdo a organizar recomendações, não competir com marketplaces, lojas virtuais ou redes sociais.

### Consequências

A plataforma nunca será responsável por:

- carrinho;
- checkout;
- pagamentos;
- pedidos;
- estoque;
- frete;
- entrega;
- emissão de notas;
- devoluções;
- avaliações;
- comentários;
- feed social.

A ação final do visitante sempre acontecerá fora da plataforma, seja compra, inscrição, cadastro, contato, download, contratação ou qualquer outra interação com o destino externo.

---

## Produtos não são foco obrigatório

**Status:** Permanente

### Decisão

A Creator Store é uma plataforma para criadores organizarem e compartilharem recomendações, produtos, links importantes e destinos externos em uma página pública pessoal.

Produtos não são foco principal obrigatório da plataforma.

Produtos e links são tipos equivalentes de item publicável na área principal da página pública. Nenhum dos dois deve ser tratado como o tipo principal obrigatório.

Um criador pode usar:

- apenas produtos;
- apenas links;
- produtos e links juntos.

### Motivo

Criadores compartilham mais do que produtos: também divulgam newsletters, grupos, materiais gratuitos, páginas de inscrição, agendas, sites e outros destinos externos.

Forçar produtos como centro obrigatório reduziria a utilidade da página pública e deixaria de atender criadores que precisam organizar recomendações e links sem necessariamente publicar produtos.

### Consequências

`PageItem` deve ser a entidade base para conteúdos clicáveis da área principal da página pública.

`PageItem.type` deve suportar inicialmente:

- `product`;
- `link`.

`SocialLink` permanece separado de `PageItem` e deve continuar representando redes sociais e links de presença exibidos no topo da página.

A página pública deve funcionar quando houver links ativos, mesmo sem produtos.

Analytics e dashboard devem considerar itens, produtos e links, com cliques registrados por `ItemClick`.

Essa decisão não muda os limites permanentes: a plataforma não será e-commerce, marketplace ou rede social, não terá carrinho, checkout, pagamentos, pedidos, estoque, avaliações, comentários ou feed social, e a ação final continuará acontecendo fora da plataforma.

---

## Um criador possui apenas uma página

**Status:** MVP

### Decisão

Cada usuário poderá possuir apenas uma página pública.

### Motivo

Simplifica o modelo de dados, a navegação e a experiência.

Caso exista demanda no futuro, será possível adicionar múltiplas páginas sem quebrar a estrutura atual.

---

## Cadastro manual de produtos e links

**Status:** MVP

### Decisão

Todos os produtos e links manuais serão cadastrados manualmente pelo criador.

### Motivo

Evita integrações complexas e acelera o desenvolvimento.

Também permite validar se o problema realmente existe antes de investir em automações.

Links manuais comuns devem ser simples o suficiente para publicar destinos externos importantes sem exigir integrações externas.

---

## Sem categorias no MVP

**Status:** MVP

### Decisão

Os itens da página serão exibidos em uma única lista.

### Motivo

Categorias aumentam significativamente a complexidade do sistema.

Antes de implementá-las, será necessário validar se os usuários realmente possuem itens suficientes para justificar essa organização.

A ordenação manual será suficiente na primeira versão.

---

## Apenas um item em destaque

**Status:** MVP

### Decisão

Cada página poderá destacar apenas um item.

### Motivo

Ajuda o criador a direcionar a atenção do visitante para sua principal recomendação, seja produto ou link.

Também simplifica o layout da página pública.

### Consequências

A interface deve deixar claro qual tipo de item está em destaque.

---

## PageItem como entidade para conteúdos clicáveis

**Status:** MVP

### Decisão

Produtos recomendados e links manuais comuns serão representados por uma entidade base chamada `PageItem`.

`PageItem` será a base dos conteúdos clicáveis exibidos na área principal da página pública.

Produtos e links são tipos equivalentes de `PageItem`: o criador poderá publicar apenas produtos, apenas links ou combinar os dois tipos na mesma página.

`PageItem.type` definirá o comportamento inicial do item:

- `product`;
- `link`.

### Motivo

A página pública precisa permitir que o criador publique produtos e/ou links manuais em uma lista ordenável.

Usar uma entidade comum evita duplicar lógica de ordenação, ativação, redirecionamento e métricas.

### Consequências

A lista principal da página pública deve carregar `PageItem` ativos.

Produtos deixam de ser modelados como a única entidade clicável da página pública e passam a ser um tipo de `PageItem`.

Links manuais passam a ser outro tipo de `PageItem`, com a mesma base de ordenação, ativação, redirecionamento e métricas.

`ItemClick` deve registrar cliques em qualquer `PageItem`, independentemente de `PageItem.type`.

Produtos e links manuais não transformam a Creator Store em e-commerce, marketplace ou rede social. A compra, contratação ou interação principal continua acontecendo fora da plataforma.

Campos específicos de produto, como preço e preço anterior, devem ser usados apenas quando `type = product`.

---

## SocialLink continua separado de PageItem

**Status:** MVP

### Decisão

Redes sociais continuarão sendo modeladas por `SocialLink`, separadas de `PageItem`.

### Motivo

Redes sociais fazem parte da identidade do criador e aparecem no topo da página com tratamento visual próprio.

Links manuais comuns pertencem à área principal da página pública, junto dos produtos.

### Consequências

`SocialLink` deve continuar sendo usado para Instagram, TikTok, YouTube, WhatsApp, site e outros links de presença social.

`PageItem` deve ser usado para conteúdos clicáveis da página pública, como produtos e links manuais comuns.

`SocialLink` permanece separado para representar redes sociais e a presença do criador, sem entrar na lista principal de itens clicáveis da página pública.

Cliques em redes sociais podem ser medidos futuramente, mas não fazem parte das métricas de item do MVP.

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

O objetivo da plataforma é facilitar a descoberta de recomendações, produtos, links e destinos externos.

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

`ItemClick` será usado para registrar cliques em qualquer `PageItem`, independentemente do tipo do item.

### Motivo

São suficientes para validar o uso da plataforma.

Analytics avançado poderá ser desenvolvido posteriormente.

### Consequências

As métricas do MVP devem continuar simples e focadas em visualizações da página e cliques de itens.

Analytics avançado, segmentações, funis, relatórios detalhados e atribuição continuam fora do MVP.

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

A aplicacao precisa de uma tabela propria no schema publico para relacionar perfis, itens e metricas sem consultar diretamente os dados internos de autenticacao em todas as operacoes de produto.

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

## Um item em destaque por perfil no banco

**Status:** MVP

### Decisão

A regra de apenas um item em destaque por perfil devera ser garantida no banco por um indice unico parcial.

O indice devera considerar `profile_id` apenas quando `is_featured = true`.

### Motivo

A aplicacao pode remover o destaque anterior ao marcar um novo item, mas a regra e uma invariante da pagina publica e nao deve depender apenas da camada de aplicacao.

### Consequências

O schema Drizzle deve declarar ou acompanhar uma migration com indice unico parcial para itens em destaque.

Mutations que alteram destaque devem tratar conflito de unicidade e manter uma experiencia clara para o usuario.

---

## Cliques de item validam o perfil do item

**Status:** MVP

### Decisão

A tabela `item_clicks` devera garantir que `item_id` pertence ao mesmo `profile_id` registrado no clique.

Essa garantia devera ser feita por chave estrangeira composta referenciando a combinacao correspondente em `page_items`.

### Motivo

Cliques sao metricas basicas do MVP e precisam permanecer consistentes com o perfil visitado.

Sem essa garantia, seria possivel registrar um clique associando um item de um perfil a outro perfil.

### Consequências

A tabela `page_items` deve expor uma chave unica ou primaria compativel com a referencia composta.

`item_clicks` deve armazenar `profile_id`, `item_id` e o tipo do item no momento do clique.

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
