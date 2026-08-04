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
