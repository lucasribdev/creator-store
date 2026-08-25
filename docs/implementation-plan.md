# Plano de Implementacao do MVP

## Objetivo do documento

Este documento deve servir como base para gerar milestones e issues da Creator Store.

Cada fase abaixo pode virar um milestone. Cada item em **Pendencias para issues** deve poder virar uma issue pequena, verificavel e com criterio de conclusao claro.

O plano acompanha o escopo definido em:

- `docs/vision.md`;
- `docs/mvp.md`;
- `docs/user-flows.md`;
- `docs/data-model.md`;
- `docs/tech-stack.md`;
- `docs/roadmap.md`;
- `docs/decisions.md`.

## Regras de escopo

A Creator Store e uma vitrine pessoal de recomendacoes, nao um e-commerce, marketplace ou rede social.

Nao implementar no MVP:

- carrinho;
- checkout;
- pagamentos;
- pedidos;
- estoque;
- frete;
- entrega;
- notas fiscais;
- devolucoes;
- avaliacoes;
- comentarios;
- feed social;
- analytics avancado;
- importacao automatica de produtos;
- integracoes com marketplaces.

## Estado atual do prototipo

O codigo atual esta em fase de prototipo navegavel.

As principais rotas e telas visuais ja existem para validar fluxo e interface, mas ainda usam principalmente dados ficticios. O prototipo ainda nao representa a implementacao real de autenticacao, persistencia, autorizacao, uploads ou metricas.

### Ja existe

- Documentacao inicial do produto em `docs/`.
- Stack do MVP definida com TanStack Start, TypeScript, TanStack Router, TanStack Query, TanStack Form, Tailwind CSS, Supabase, Drizzle, Zod e Cloudflare Workers.
- Projeto base com rotas publicas e privadas visuais.
- Pagina inicial.
- Telas simuladas de login, cadastro e recuperacao de senha.
- Dashboard simulado.
- Tela simulada de edicao de perfil.
- Lista simulada de produtos.
- Telas simuladas de cadastro e edicao de produto.
- Pagina publica simulada por username.
- Estados visuais de pagina publicada, pagina despublicada, pagina inexistente e pagina sem produtos ativos.
- Schema inicial Drizzle com `users`, `profiles`, `social_links`, `products`, `page_views` e `product_clicks`.
- Migration inicial em `drizzle/0000_lazy_prodigy.sql`.
- Rota tecnica `/api/health/db` para validar conexao com banco.
- Validacao tecnica de Cloudflare Workers com Supabase Postgres via `pg`/`node-postgres`, registrada em `docs/decisions.md`.

### Ainda nao existe

- Autenticacao real com Supabase Auth.
- Persistencia real do fluxo principal.
- Protecao real das rotas privadas.
- Isolamento de dados por usuario.
- Upload real de avatar, banner e imagens.
- CRUD real de redes sociais.
- CRUD real de itens da pagina.
- Publicacao e despublicacao reais.
- Pagina publica carregando dados reais.
- Registro real de visualizacoes e cliques.
- Dashboard com metricas reais.
- Deploy validado do MVP completo.

## Mudanca planejada de modelo

O schema inicial ainda usa `products` e `product_clicks`, mas a documentacao de produto ja definiu a evolucao para `PageItem` e `ItemClick`.

### Decisao

`Product` e `ProductClick` nao devem ser tratados como entidades finais do MVP.

Produtos recomendados devem ser implementados como:

```text
PageItem.type = product
```

Links manuais comuns devem ser implementados como:

```text
PageItem.type = link
```

Cliques em produtos e links manuais devem ser registrados em:

```text
ItemClick
```

### Mudanca tecnica esperada

- Substituir a tabela `products` por `page_items`.
- Substituir a tabela `product_clicks` por `item_clicks`.
- Manter `page_views` para visualizacoes da pagina publica.
- Manter `social_links` separado de `page_items`.
- Tratar produtos como o principal tipo de item da UX, sem criar um CRUD definitivo de `Product` isolado.
- Tratar links manuais como complemento da vitrine, sem transformar o produto em uma pagina generica de links.

### Consequencias para milestones

- A proxima implementacao de schema deve partir de `PageItem` e `ItemClick`.
- As telas atuais de produtos devem ser reaproveitadas, mas conectadas a `PageItem` com `type = product`.
- Links manuais devem usar a mesma base de dados, ordenacao, ativacao e metricas dos produtos.
- A pagina publica deve renderizar uma lista unificada de itens ativos.

## Verificacao padrao

Quando houver alteracao de codigo no futuro, rodar quando aplicavel:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

Quando uma fase alterar banco, tambem verificar:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

Os comandos de Drizzle podem variar conforme os scripts reais do projeto. Se os scripts forem ajustados, atualizar este documento e o README.

---

# Fase 0 - Preparacao e alinhamento

## Objetivo

Garantir que documentacao, ambiente local e configuracao tecnica estejam prontos para iniciar funcionalidades reais.

## Estado

Parcialmente concluida.

## Entregas

- Documentacao principal do produto criada.
- Escopo do MVP definido.
- Stack tecnica definida.
- Estrutura inicial do projeto criada.
- Scripts principais no `package.json` configurados.
- Schema inicial Drizzle criado.
- Validacao minima de conexao com Supabase Postgres em Cloudflare Workers registrada.

## Pendencias para issues

- Atualizar README com instalacao, execucao local, variaveis de ambiente, comandos de verificacao e fluxo de deploy.
- Revisar `.env.example` para garantir que todas as variaveis esperadas estejam documentadas.
- Confirmar que `wrangler.jsonc` esta alinhado com `nodejs_compat`, Drizzle e Supabase Postgres.
- Definir claramente como migrations serao aplicadas no banco de desenvolvimento.

## Criterios de conclusao

- Uma pessoa nova no projeto consegue instalar dependencias e rodar o app localmente seguindo o README.
- Variaveis obrigatorias estao documentadas sem segredos reais.
- A decisao de runtime Cloudflare Workers + Supabase Postgres esta documentada.
- Nao ha decisao tecnica bloqueadora para iniciar autenticacao e persistencia.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 1 - Prototipo navegavel

## Objetivo

Validar fluxo, navegacao e interface antes de conectar autenticacao, banco e metricas reais.

## Estado

Concluida como prototipo inicial, com revisoes visuais pendentes.

## Entregas

- Pagina inicial visual.
- Login, cadastro e recuperacao de senha simulados.
- Dashboard simulado.
- Edicao de perfil simulada.
- Lista, cadastro e edicao de produtos simulados.
- Pagina publica por username com dados ficticios.
- Estados visuais de pagina publicada, despublicada, inexistente e sem produtos ativos.

## Pendencias para issues

- Revisar o prototipo em celular e desktop.
- Confirmar que a pagina publica parece uma vitrine pessoal de recomendacoes, nao uma loja.
- Atualizar textos visuais que ainda falem apenas em produtos quando o fluxo precisar incluir links manuais.
- Registrar ajustes visuais necessarios antes da integracao real.
- Incluir no prototipo o estado "sem itens ativos", considerando produtos e links manuais.

## Criterios de conclusao

- O fluxo principal pode ser simulado com dados ficticios.
- A navegacao entre dashboard, perfil, itens e pagina publica esta clara.
- Os estados vazios, de erro visual e de pagina indisponivel estao representados.

## Comandos de verificacao

```bash
pnpm check
pnpm build
```

---

# Fase 2 - Fundacao da aplicacao

## Objetivo

Implementar a base real de autenticacao, sessao, acesso a dados, validacao e protecao da area privada.

## Estado

Parcialmente iniciada.

## Entregas

- Estrutura de rotas com TanStack Router iniciada.
- Integracao base com TanStack Query criada.
- Configuracao inicial de Drizzle criada.
- Endpoint tecnico de saude do banco criado.

## Pendencias para issues

- Separar dados ficticios de dados reais para facilitar a transicao gradual.
- Criar helpers de ambiente com validacao explicita e sem non-null assertion.
- Definir camada inicial de acesso a dados para Supabase Postgres via Drizzle.
- Integrar Supabase Auth para cadastro.
- Integrar Supabase Auth para login.
- Integrar Supabase Auth para logout.
- Integrar fluxo de recuperacao de senha.
- Criar sincronizacao entre Supabase Auth e `public.users`.
- Proteger rotas privadas do dashboard.
- Garantir que usuario autenticado acesse apenas seus proprios dados.
- Implementar tratamento basico para sessao expirada.
- Implementar tratamento basico para falha de banco.
- Definir padrao de loaders para dados iniciais de rotas publicas e privadas.
- Definir padrao de mutations tipadas com validacao Zod.

## Criterios de conclusao

- O usuario consegue criar conta, fazer login, acessar o dashboard, sair e retornar depois.
- Rotas privadas bloqueiam visitantes sem sessao.
- Dados privados sao consultados considerando o usuario autenticado.
- Erros comuns de autenticacao e banco tem retorno compreensivel na interface.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 3 - Schema PageItem e ItemClick

## Objetivo

Atualizar o modelo de dados real para a decisao atual: itens clicaveis unificados por `PageItem` e cliques registrados por `ItemClick`.

## Estado

Pendente.

## Entregas

- Enum ou tipo equivalente para `PageItem.type` com `product` e `link`.
- Tabela `page_items`.
- Tabela `item_clicks`.
- Relacionamentos entre `profiles`, `page_items`, `page_views` e `item_clicks`.
- Indices necessarios para listagem publica, dashboard e metricas basicas.
- Migration de substituicao do modelo antigo.

## Pendencias para issues

- Substituir `products` por `page_items` no schema Drizzle.
- Substituir `product_clicks` por `item_clicks` no schema Drizzle.
- Modelar campos comuns de `PageItem`: `profile_id`, `type`, `title`, `description`, `external_url`, `button_label`, `position`, `is_active`, `is_featured`, timestamps.
- Modelar campos opcionais de produto em `PageItem`: `image_url`, `price`, `previous_price`, `currency`.
- Validar regra de que campos de preco so se aplicam a `type = product`.
- Validar regra de que `type = link` nao usa preco, preco anterior ou moeda.
- Definir estrategia para no maximo um item em destaque por perfil.
- Criar indices para `profile_id`, `profile_id + type`, `profile_id + is_active`, `profile_id + is_active + position` e metricas.
- Garantir integridade entre `item_clicks.item_id` e `page_items.id`.
- Atualizar referencias internas de nomenclatura que assumem `Product` como entidade final.

## Criterios de conclusao

- O banco permite salvar produtos e links manuais como `PageItem`.
- O banco permite registrar cliques em qualquer `PageItem`.
- O schema real nao exige implementar um CRUD definitivo de `Product` isolado antes de links manuais.
- A documentacao, o schema e as migrations usam a nomenclatura `PageItem` e `ItemClick` como base do MVP.

## Comandos de verificacao

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 4 - Perfil do criador

## Objetivo

Permitir que o criador configure a identidade da pagina publica.

## Estado

Prototipo visual existente, implementacao real pendente.

## Entregas

- Formulario real de perfil.
- Persistencia de username, nome de exibicao, bio, avatar e banner quando mantido no MVP.
- Validacao de username.
- Upload de avatar.
- Upload de banner se permanecer no MVP.
- Previa da pagina publica.
- Estados de perfil incompleto, salvo, erro ao salvar e pagina despublicada.

## Pendencias para issues

- Converter formulario visual de perfil para TanStack Form.
- Criar schema Zod para username, nome de exibicao, bio e URLs de imagem.
- Persistir criacao e edicao de perfil no banco.
- Normalizar username em lowercase.
- Validar username unico.
- Bloquear palavras reservadas para username.
- Implementar upload de avatar no Supabase Storage.
- Implementar upload de banner, caso a interface mantenha banner no MVP.
- Criar estado de sucesso ao salvar.
- Criar estado de erro ao salvar.
- Criar estado de perfil incompleto.
- Permitir visualizar previa da pagina publica.

## Criterios de conclusao

- O criador consegue configurar username e nome de exibicao reais.
- O perfil salvo persiste no banco.
- O criador consegue visualizar uma previa publica mesmo sem itens.
- O usuario nao consegue editar perfil de outra conta.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 5 - Produtos como PageItem

## Objetivo

Implementar produtos recomendados como o primeiro e principal tipo de `PageItem`.

## Estado

Prototipo visual existente, CRUD real pendente.

## Entregas

- Listagem real de produtos do criador.
- Criacao de produto como `PageItem.type = product`.
- Edicao de produto.
- Ativacao e desativacao de produto.
- Exclusao ou remocao controlada de produto.
- Ordenacao de produtos.
- Marcacao de destaque.
- Upload de imagem de produto.
- Validacoes de campos de produto.

## Pendencias para issues

- Adaptar lista visual de produtos para carregar `PageItem` com `type = product`.
- Converter formulario de produto para TanStack Form.
- Criar schema Zod para produto.
- Implementar mutation de criacao de produto.
- Implementar mutation de edicao de produto.
- Implementar mutation de ativar e desativar produto.
- Implementar mutation de exclusao ou remocao controlada.
- Implementar mover produto para cima e para baixo.
- Implementar destaque removendo destaque anterior do perfil.
- Implementar upload de imagem de produto no Supabase Storage.
- Validar titulo obrigatorio.
- Validar URL externa obrigatoria.
- Validar preco nao negativo quando informado.
- Validar preco anterior maior que preco quando ambos existirem.
- Aplicar moeda padrao `BRL` quando houver preco sem moeda.
- Exibir estado de produto sem imagem.
- Exibir estado de produto inativo.
- Invalidar TanStack Query apos criar, editar, ativar, desativar, destacar, ordenar ou excluir.

## Criterios de conclusao

- O criador consegue cadastrar, editar, ativar, desativar, destacar, ordenar e remover produtos reais.
- Produtos sao persistidos como `PageItem.type = product`.
- Produtos ativos aparecem na previa ou pagina publica inicial.
- Produtos inativos nao aparecem publicamente.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 6 - Links manuais como PageItem

## Objetivo

Permitir que o criador adicione links manuais comuns que complementam a vitrine, usando `PageItem.type = link`.

## Estado

Pendente.

## Entregas

- Listagem real de links manuais.
- Criacao de link manual.
- Edicao de link manual.
- Ativacao e desativacao de link manual.
- Exclusao ou remocao controlada de link manual.
- Ordenacao unificada junto aos produtos.
- Validacoes de campos de link manual.

## Pendencias para issues

- Criar interface para listar links manuais.
- Criar formulario de link manual com TanStack Form.
- Criar schema Zod para link manual.
- Implementar mutation de criacao de link manual.
- Implementar mutation de edicao de link manual.
- Implementar mutation de ativar e desativar link manual.
- Implementar mutation de exclusao ou remocao controlada.
- Implementar ordenacao de links manuais na lista unica de `PageItem`.
- Validar titulo obrigatorio.
- Validar URL externa obrigatoria.
- Validar descricao opcional.
- Validar texto de botao opcional.
- Garantir que link manual nao usa preco, preco anterior ou moeda.
- Garantir que link manual nao substitui `SocialLink`.
- Exibir estado vazio de links manuais.
- Invalidar TanStack Query apos criar, editar, ativar, desativar, ordenar ou excluir.

## Criterios de conclusao

- O criador consegue cadastrar, editar, ativar, desativar, ordenar e remover links manuais.
- Links manuais sao persistidos como `PageItem.type = link`.
- Links manuais ativos aparecem junto aos produtos na lista publica unificada.
- Links manuais inativos nao aparecem publicamente.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 7 - Redes sociais

## Objetivo

Permitir que o criador gerencie os links sociais exibidos no topo da pagina publica.

## Estado

Pagina publica ficticia ja exibe redes sociais; gerenciamento real pendente.

## Entregas

- Rota privada de gerenciamento de redes sociais.
- Criacao de link social.
- Edicao de link social.
- Remocao de link social.
- Ativacao e desativacao de link social.
- Ordenacao de links sociais.
- Exibicao publica apenas de links sociais ativos.

## Pendencias para issues

- Criar tela privada de redes sociais.
- Criar formulario de rede social com TanStack Form.
- Criar schema Zod para rede social.
- Implementar criacao de link social.
- Implementar edicao de link social.
- Implementar remocao de link social.
- Implementar ativar e desativar link social.
- Implementar ordenacao de links sociais.
- Validar tipo permitido: Instagram, TikTok, YouTube, WhatsApp, site e outro.
- Validar URL obrigatoria.
- Validar posicao nao negativa.
- Validar label obrigatorio quando `type = other`.
- Exibir estado vazio de redes sociais.
- Exibir estado de erro para redes sociais.
- Garantir que redes sociais nao entram na lista principal de `PageItem`.

## Criterios de conclusao

- O criador consegue gerenciar Instagram, TikTok, YouTube, WhatsApp, site e outro link.
- Apenas links sociais ativos aparecem no topo da pagina publica.
- Redes sociais continuam separadas dos itens clicaveis principais.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 8 - Pagina publica unificada

## Objetivo

Disponibilizar a vitrine publica real por username, renderizando perfil, redes sociais e lista unificada de `PageItem` ativos.

## Estado

Prototipo visual existente, dados reais pendentes.

## Entregas

- Loader publico por username.
- Bloqueio de perfis despublicados.
- Renderizacao de perfil real.
- Renderizacao de redes sociais ativas.
- Renderizacao de item em destaque.
- Renderizacao de lista unificada de produtos e links manuais ativos.
- Estados publicos de pagina inexistente, despublicada e sem itens ativos.
- Link externo funcionando para cada item.
- SEO basico e metadados de compartilhamento.

## Pendencias para issues

- Adaptar rota publica por username para carregar dados reais via loader.
- Carregar apenas perfil publicado para visitantes.
- Bloquear acesso publico a perfil despublicado.
- Exibir estado de pagina inexistente.
- Exibir estado de pagina despublicada.
- Exibir estado sem itens ativos considerando produtos e links manuais.
- Exibir redes sociais ativas.
- Exibir item em destaque quando existir.
- Exibir produtos e links manuais ativos ordenados por `position`.
- Garantir que visitante nao precise de conta.
- Abrir destino externo de produto.
- Abrir destino externo de link manual.
- Adicionar SEO basico.
- Adicionar metadados de compartilhamento.
- Revisar layout mobile first com dados reais.

## Criterios de conclusao

- Qualquer visitante com o link consegue acessar uma pagina publicada sem login.
- A pagina exibe somente conteudo ativo.
- Produtos continuam visualmente prioritarios em relacao a links manuais.
- Cliques em itens abrem corretamente o destino externo.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 9 - Publicacao e dashboard real

## Objetivo

Permitir que o criador controle a visibilidade da pagina e veja um resumo simples da propria vitrine.

## Estado

Dashboard simulado existente, implementacao real pendente.

## Entregas

- Publicacao da pagina.
- Despublicacao da pagina.
- Link publico exibido no dashboard.
- Acao para copiar link publico.
- Resumo real de produtos.
- Resumo real de links manuais.
- Atalhos para editar perfil, adicionar produto e adicionar link manual.

## Pendencias para issues

- Implementar mutation de publicar pagina.
- Implementar mutation de despublicar pagina.
- Registrar `published_at` quando aplicavel.
- Exibir status atual da pagina no dashboard.
- Exibir link publico baseado no username.
- Implementar copiar link publico.
- Exibir quantidade real de produtos.
- Exibir quantidade real de links manuais.
- Exibir quantidade real de visualizacoes quando metricas estiverem disponiveis.
- Exibir quantidade real de cliques quando metricas estiverem disponiveis.
- Criar estado de dashboard para perfil incompleto.
- Criar estado de dashboard para pagina despublicada.

## Criterios de conclusao

- O criador consegue publicar e despublicar a pagina.
- O dashboard mostra o link publico correto.
- O dashboard mostra resumo real dos itens cadastrados.
- Uma pagina despublicada nao fica acessivel para visitantes.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 10 - Metricas basicas

## Objetivo

Registrar visualizacoes da pagina publica e cliques em itens, mantendo o redirecionamento externo resiliente.

## Estado

Planejada. O schema inicial usa `product_clicks`, mas deve evoluir para `item_clicks`.

## Entregas

- Registro de `PageView`.
- Registro de `ItemClick`.
- Redirecionamento externo apos clique.
- Dashboard com total de visualizacoes.
- Dashboard com total de cliques.
- Consultas basicas por item ou tipo quando simples.

## Pendencias para issues

- Definir identificador anonimo minimo de visitante sem coletar dados pessoais desnecessarios.
- Registrar visualizacao por carregamento de pagina publica publicada.
- Evitar registrar visualizacao para pagina inexistente ou despublicada.
- Criar endpoint ou server function para clique em item.
- Registrar `ItemClick` antes do redirecionamento.
- Garantir que falha ao registrar clique nao impede redirecionamento.
- Validar que o item clicado pertence ao perfil registrado.
- Armazenar `item_type` no momento do clique.
- Exibir total real de visualizacoes no dashboard.
- Exibir total real de cliques no dashboard.
- Exibir cliques por item se a consulta continuar simples.
- Exibir cliques por tipo de item se a consulta continuar simples.
- Evitar filtros por periodo, origem detalhada e analytics avancado nesta fase.

## Criterios de conclusao

- Visualizacoes de paginas publicadas sao registradas.
- Cliques em produtos e links manuais sao registrados como `ItemClick`.
- O visitante sempre e redirecionado ao destino externo, mesmo se a metrica falhar.
- O dashboard exibe totais basicos reais.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 11 - Deploy e validacao do MVP

## Objetivo

Publicar o MVP em Cloudflare Workers e validar o fluxo principal com usuarios iniciais.

## Estado

Deploy alvo definido e conexao minima validada; MVP completo ainda pendente.

## Entregas

- Build local validado.
- Deploy em Cloudflare Workers validado.
- Variaveis de producao configuradas sem segredos no repositorio.
- Fluxo principal testado em celular e desktop.
- Permissoes entre usuarios testadas.
- Estados obrigatorios testados.
- Documentos minimos legais e de contato preparados antes de abrir para usuarios.
- Validacao com 5 a 10 criadores ou afiliados iniciais.

## Pendencias para issues

- Validar build local antes do deploy.
- Validar compatibilidade do runtime com as dependencias reais adicionadas.
- Configurar variaveis de producao no Cloudflare Workers.
- Rodar teste completo de cadastro, login, recuperacao de senha, logout e protecao de rota privada.
- Rodar teste completo de perfil.
- Rodar teste completo de redes sociais.
- Rodar teste completo de produto como `PageItem`.
- Rodar teste completo de link manual como `PageItem`.
- Rodar teste completo de publicacao e despublicacao.
- Rodar teste completo da pagina publica por username.
- Rodar teste completo de clique e redirecionamento.
- Testar isolamento de dados entre dois usuarios.
- Testar pagina inexistente.
- Testar pagina despublicada.
- Testar item inativo.
- Testar produto sem imagem.
- Testar link manual sem descricao.
- Preparar politica de privacidade.
- Preparar termos de uso.
- Preparar aviso sobre links externos.
- Preparar canal de contato.
- Validar o MVP com 5 a 10 criadores ou afiliados.
- Registrar problemas criticos encontrados na validacao.
- Corrigir problemas criticos antes de ampliar o uso.

## Criterios de conclusao

- O MVP esta publicado.
- O fluxo principal funciona sem erro bloqueador.
- Dados privados estao isolados por usuario.
- Paginas publicas funcionam sem login.
- Cliques redirecionam corretamente para destinos externos.
- Estados obrigatorios foram verificados.
- Primeiros criadores conseguem usar o produto com suporte manual aceitavel.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Sequencia recomendada de milestones

1. Preparacao e alinhamento.
2. Prototipo navegavel.
3. Fundacao da aplicacao.
4. Schema `PageItem` e `ItemClick`.
5. Perfil do criador.
6. Produtos como `PageItem`.
7. Links manuais como `PageItem`.
8. Redes sociais.
9. Pagina publica unificada.
10. Publicacao e dashboard real.
11. Metricas basicas.
12. Deploy e validacao do MVP.

# Proximas issues recomendadas

1. Atualizar README e `.env.example`.
2. Revisar configuracao de Worker e compatibilidade com Supabase Postgres.
3. Alterar schema Drizzle de `products` para `page_items`.
4. Alterar schema Drizzle de `product_clicks` para `item_clicks`.
5. Integrar Supabase Auth para cadastro, login, logout e recuperacao de senha.
6. Proteger rotas privadas.
7. Implementar perfil real com validacao Zod.
8. Implementar produto como `PageItem.type = product`.
9. Implementar link manual como `PageItem.type = link`.
10. Implementar pagina publica real por username.
11. Implementar publicacao e despublicacao.
12. Implementar metricas basicas com `PageView` e `ItemClick`.
