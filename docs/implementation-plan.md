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

## Regra principal de produto

A Creator Store e uma pagina publica pessoal para recomendacoes, produtos, links importantes e destinos externos.

Produtos e links manuais comuns devem ser tratados como tipos de `PageItem`, nao como bases separadas da aplicacao.

O MVP deve suportar:

- pagina com apenas produtos;
- pagina com apenas links;
- pagina com produtos e links juntos.

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
- Estados visuais de pagina publicada, pagina despublicada, pagina inexistente e pagina sem itens ativos.
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
- Criacao real de produto como `PageItem.type = product`.
- Criacao real de link manual como `PageItem.type = link`.
- Publicacao e despublicacao reais.
- Pagina publica carregando dados reais.
- Registro real de visualizacoes e cliques por item.
- Dashboard com contagens reais de itens, produtos, links, visualizacoes e cliques.
- Analytics basico por item.
- Upload real de imagem de produto como issue separada da criacao e edicao textual de produto.
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
- Tratar produtos como um tipo de item da UX, sem criar um CRUD definitivo de `Product` isolado.
- Tratar links manuais como outro tipo de item, sem transformar a plataforma em rede social, e-commerce ou marketplace.
- Usar `PageItem` como base de ordenacao, ativacao, destaque, redirecionamento e metricas.

### Estrategia de migration nesta fase

Como o projeto ainda esta em fase de prototipo e nao possui dados reais de usuarios, a migration de `products`/`product_clicks` para `page_items`/`item_clicks` pode ser destrutiva neste momento.

Recomecar o banco do zero e aceitavel enquanto nao houver dados reais a preservar.

Essa permissao e temporaria. A partir do momento em que existirem dados reais, migrations que alterem tabelas existentes devem preservar dados, executar backfill ou seguir um plano explicito de migracao registrado antes da execucao.

Essa estrategia nao altera o escopo do MVP e nao autoriza funcionalidades fora da Creator Store como pagina publica de recomendacoes e destinos externos.

### Consequencias para milestones

- A proxima implementacao de schema deve partir de `PageItem` e `ItemClick`.
- As telas atuais de produtos podem ser reaproveitadas, mas conectadas a `PageItem` com `type = product`.
- Links manuais devem usar a mesma base de dados, ordenacao, ativacao e metricas dos produtos.
- A pagina publica deve renderizar uma lista unificada de itens ativos.
- O dashboard deve mostrar contagens de itens, produtos, links, visualizacoes e cliques.
- O analytics basico deve ser por item e funcionar para qualquer tipo de `PageItem`.
- Imagens para links, video e analytics avancado ficam para evolucoes futuras.

## Decisao de navegacao privada de PageItem

A area privada principal para gestao de `PageItem` deve se chamar **Itens**.

A rota final para essa gestao e:

```text
/dashboard/items
```

A navegacao privada principal deve usar o rotulo **Itens** e apontar para `/dashboard/items`.

Produtos e links manuais devem aparecer como tipos, filtros ou acoes dentro dessa area, nao como secoes centrais obrigatorias separadas.

A interface de `Itens` pode oferecer:

- botao `Adicionar produto`;
- botao `Adicionar link`;
- filtros `Todos`, `Produtos` e `Links`.

Rotas centradas em produtos, como `/dashboard/products`, podem existir temporariamente durante a transicao do prototipo, especialmente para reaproveitar telas ja criadas. Elas nao devem ser a nomenclatura final do MVP nem orientar a navegacao principal.

Produto nao e uma secao central obrigatoria da Creator Store.

`SocialLink` continua separado de `PageItem` e deve manter sua propria area de gerenciamento de redes sociais.

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

# Fase 0 - Documentacao e decisao PageItem

## Objetivo

Garantir que a documentacao, as decisoes e o plano de trabalho estejam alinhados com produtos e links como tipos de `PageItem`.

## Estado

Parcialmente concluida.

## Entregas

- Documentacao principal revisada para suportar produtos e links.
- Decisao `PageItem` registrada em `docs/decisions.md`.
- Escopo do MVP alinhado com itens clicaveis unificados.
- Roadmap e plano de implementacao organizados em torno de `PageItem`.
- Limites permanentes de nao e-commerce preservados.

## Pendencias para issues

- Revisar `docs/mvp.md` para garantir que o MVP fale em itens, produtos e links.
- Revisar `docs/user-flows.md` para incluir paginas com apenas produtos, apenas links e ambos.
- Revisar `docs/data-model.md` antes de alterar migrations.
- Atualizar README com instalacao, execucao local, variaveis de ambiente, comandos de verificacao e fluxo de deploy.
- Revisar `.env.example` para garantir que todas as variaveis esperadas estejam documentadas.
- Confirmar que `wrangler.jsonc` esta alinhado com `nodejs_compat`, Drizzle e Supabase Postgres.
- Definir claramente como migrations serao aplicadas no banco de desenvolvimento.

## Criterios de conclusao

- A documentacao nao trata produto como entidade central obrigatoria.
- `PageItem` e `ItemClick` estao documentados como base do MVP.
- A rota privada final de gestao de `PageItem` esta registrada como `/dashboard/items`.
- A navegacao privada principal esta registrada como **Itens**.
- Uma pessoa nova no projeto consegue instalar dependencias e rodar o app localmente seguindo o README.
- Variaveis obrigatorias estao documentadas sem segredos reais.
- Nao ha decisao tecnica bloqueadora para iniciar autenticacao e persistencia.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 1 - Prototipo navegavel com itens

## Objetivo

Validar fluxo, navegacao e interface antes de conectar autenticacao, banco e metricas reais.

## Estado

Concluida como prototipo inicial, com revisoes visuais pendentes.

## Entregas

- Pagina inicial visual.
- Login, cadastro e recuperacao de senha simulados.
- Dashboard simulado.
- Edicao de perfil simulada.
- Lista simulada de itens.
- Cadastro e edicao simulados de produto.
- Cadastro e edicao simulados de link manual.
- Pagina publica por username com dados ficticios.
- Estados visuais de pagina publicada, despublicada, inexistente e sem itens ativos.

## Pendencias para issues

- Revisar o prototipo em celular e desktop.
- Confirmar que a pagina publica parece uma pagina pessoal de recomendacoes, nao uma loja.
- Atualizar textos visuais que ainda falem apenas em produtos.
- Representar produto e link manual como itens da mesma pagina.
- Ajustar a navegacao privada final para usar `Itens` apontando para `/dashboard/items`.
- Tratar rotas centradas em produtos, como `/dashboard/products`, apenas como transicao de prototipo quando existirem.
- Registrar ajustes visuais necessarios antes da integracao real.
- Incluir no prototipo o estado "sem itens ativos", considerando produtos e links manuais.

## Criterios de conclusao

- O fluxo principal pode ser simulado com dados ficticios.
- A navegacao entre dashboard, perfil, itens, redes sociais e pagina publica esta clara.
- A gestao privada principal de itens usa a nomenclatura `Itens` e a rota final `/dashboard/items`.
- Produtos e links aparecem como filtros, tipos ou acoes dentro de `Itens`.
- `/dashboard/products`, se existir, e apenas rota temporaria de prototipo ou transicao.
- O prototipo permite simular uma pagina com apenas produtos, apenas links ou ambos.
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
- Base para usar loaders em rotas publicas e privadas.
- Base para mutations tipadas com validacao Zod.

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
- Permitir migration destrutiva nesta substituicao apenas enquanto nao houver dados reais.
- Se ja houver dados reais antes da execucao, trocar o reset por preservacao de dados, backfill ou plano explicito de migracao.
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
- A migration destrutiva esta limitada ao periodo sem dados reais; migrations futuras com dados reais preservam dados, executam backfill ou seguem plano explicito.

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

# Fase 5 - Gestao unificada de PageItem

## Objetivo

Criar a base compartilhada para listar, ordenar, ativar, desativar, destacar e remover itens da pagina publica, independentemente do tipo.

No primeiro corte do MVP, remover um item da pagina publica significa desativar o registro com `PageItem.is_active = false`, nao excluir definitivamente.

## Estado

Pendente.

## Entregas

- Rota privada final `/dashboard/items`.
- Navegacao principal da area privada com o rotulo `Itens`.
- Listagem real de `PageItem` do criador.
- Estado vazio de itens.
- Criacao tecnica de item com tipo.
- Edicao tecnica de campos comuns.
- Ativacao e desativacao de item.
- Remocao da pagina publica por desativacao do item.
- Ordenacao unificada.
- Marcacao de destaque para no maximo um item por perfil.
- Invalidacao de queries apos mutations de item.

## Pendencias para issues

- Criar ou consolidar a rota privada `/dashboard/items` como tela principal de gestao de `PageItem`.
- Garantir que a navegacao principal aponte para `Itens`, nao para `Produtos`.
- Oferecer filtros `Todos`, `Produtos` e `Links` na gestao de itens quando isso ajudar a operacao.
- Oferecer acoes `Adicionar produto` e `Adicionar link` dentro da area de itens.
- Criar consulta privada para listar `PageItem` por `profile_id`.
- Criar componentes ou helpers compartilhados para cards de item no dashboard.
- Implementar mutation comum de ativar e desativar item.
- Implementar mutation comum de remover item da pagina publica definindo `PageItem.is_active = false`.
- Implementar mutation comum de ordenar itens.
- Implementar mutation comum de destacar item removendo destaque anterior.
- Ao desativar item destacado, limpar `PageItem.is_featured = false`.
- Ao reativar item, manter `PageItem.is_featured = false` ate o criador destacar novamente.
- Garantir que ordenacao misture produtos e links na mesma sequencia.
- Garantir que item inativo nao apareca publicamente.
- Garantir que item inativo nao permaneca destacado.
- Garantir que a pagina publica so exiba destaque ativo.
- Garantir que item inativo continue visivel, editavel e reativavel no painel.
- Garantir que `ItemClick` permaneca preservado ao remover item da pagina publica.
- Manter exclusao definitiva de `PageItem` fora do primeiro corte.
- Nao introduzir `deleted_at` sem nova decisao registrada em `docs/decisions.md`.
- Exibir estado vazio quando nao houver nenhum item.
- Exibir contagem de itens ativos e inativos quando simples.
- Invalidar TanStack Query apos criar, editar, ativar, desativar, destacar, ordenar ou remover.

## Criterios de conclusao

- O painel possui uma base real para gerenciar itens sem depender de produto como entidade central.
- `/dashboard/items` e a rota final para a gestao privada principal de itens.
- A navegacao principal da area privada usa `Itens`.
- Produtos e links sao tratados como filtros, tipos ou acoes dentro de `Itens`.
- Produtos e links podem compartilhar a mesma lista, ordenacao, ativacao, destaque e remocao.
- Remover item da pagina publica define `PageItem.is_active = false`.
- Desativar item destacado tambem define `PageItem.is_featured = false`.
- Reativar item nao restaura destaque automaticamente; o criador pode destacar novamente.
- Itens inativos nao aparecem publicamente, mas continuam visiveis, editaveis e reativaveis no painel.
- A pagina publica exibe apenas destaque com `is_active = true`.
- `ItemClick` permanece preservado quando um item e removido da pagina publica.
- Exclusao definitiva e `deleted_at` ficam fora do primeiro corte.
- A regra de no maximo um destaque por perfil esta aplicada.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 6 - Produtos como tipo product de PageItem

## Objetivo

Implementar produtos recomendados como `PageItem.type = product`, separando o primeiro corte textual e persistente do upload de imagem.

A criacao e edicao de produto nao devem ficar bloqueadas pelo upload de imagem no primeiro corte. Produto sem imagem e valido, e `PageItem.image_url` deve permanecer opcional.

## Estado

Prototipo visual existente, implementacao real pendente.

## Entregas

- Formulario real de produto conectado a `PageItem`.
- Criacao de produto como `PageItem.type = product`.
- Edicao de campos comuns e campos de produto.
- Persistencia dos dados textuais e informativos do produto.
- Produto podendo ser salvo sem imagem.
- Upload de imagem de produto tratado como issue separada dentro desta fase.
- Validacoes especificas de produto.
- Estados de produto sem imagem e produto inativo.

## Pendencias para issues

### Produto como `PageItem.type = product`

- Adaptar telas visuais de produtos para carregar `PageItem` com `type = product`, mantendo `/dashboard/products` apenas como rota temporaria de prototipo ou transicao quando existir.
- Converter formulario de produto para TanStack Form.
- Criar schema Zod para produto.
- Implementar mutation de criacao de produto como `PageItem.type = product`.
- Implementar mutation de edicao de produto.
- Reutilizar mutations comuns para ativar, desativar, destacar, ordenar e remover.
- Persistir dados textuais e informativos do produto: titulo, descricao, URL externa, texto de botao, preco, preco anterior, moeda, status ativo/inativo, destaque e posicao.
- Permitir criar e editar produto sem imagem.
- Manter `PageItem.image_url` opcional.
- Validar titulo obrigatorio.
- Validar URL externa obrigatoria.
- Validar preco nao negativo quando informado.
- Validar preco anterior maior que preco quando ambos existirem.
- Aplicar moeda padrao `BRL` quando houver preco sem moeda.
- Exibir estado de produto sem imagem.
- Exibir estado de produto inativo.
- Garantir que links manuais continuam sem upload de imagem no MVP.

### Upload de imagem de produto

- Criar issue separada para upload de imagem de produto dentro da fase/milestone de produtos como `PageItem.type = product`.
- Implementar upload de imagem de produto no Supabase Storage.
- Validar arquivo de imagem antes de salvar.
- Validar tamanho maximo permitido.
- Validar formatos permitidos.
- Salvar URL ou path do arquivo em `PageItem.image_url`.
- Permitir remover ou substituir a imagem sem bloquear a edicao dos demais campos do produto.
- Exibir estado de produto sem imagem quando `PageItem.image_url` estiver vazio.
- Garantir que falha de upload nao impeça salvar dados textuais quando o fluxo estiver no primeiro corte sem imagem.
- Manter upload de avatar e banner de perfil como fluxo separado da imagem de produto.
- Nao criar milestone propria de Supabase Storage apenas para imagem de produto, salvo se houver outras demandas de storage agrupadas.

## Criterios de conclusao

- O criador consegue cadastrar e editar produtos reais.
- Produtos sao persistidos como `PageItem.type = product`.
- Produtos podem ser criados e editados sem imagem.
- Produtos usam a gestao unificada de itens para ativacao, destaque, ordenacao e remocao.
- Produtos ativos aparecem na previa ou pagina publica inicial.
- Produtos inativos nao aparecem publicamente.
- Links manuais continuam sem upload de imagem no MVP.
- Upload de avatar e banner de perfil continua separado do upload de imagem de produto.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 7 - Links manuais como tipo link de PageItem

## Objetivo

Permitir que o criador adicione links manuais comuns usando `PageItem.type = link`.

## Estado

Pendente.

## Entregas

- Interface real para criar link manual.
- Edicao de link manual.
- Validacoes especificas de link manual.
- Estados de link manual vazio, inativo e sem descricao.
- Ordenacao unificada junto aos demais itens.

## Pendencias para issues

- Criar interface para listar ou filtrar links manuais.
- Criar formulario de link manual com TanStack Form.
- Criar schema Zod para link manual.
- Implementar mutation de criacao de link manual como `PageItem.type = link`.
- Implementar mutation de edicao de link manual.
- Reutilizar mutations comuns para ativar, desativar, destacar, ordenar e remover.
- Validar titulo obrigatorio.
- Validar URL externa obrigatoria.
- Validar descricao opcional.
- Validar texto de botao opcional.
- Garantir que link manual nao usa preco, preco anterior ou moeda.
- Garantir que link manual nao substitui `SocialLink`.
- Exibir estado vazio de links manuais quando houver filtro por tipo.

## Criterios de conclusao

- O criador consegue cadastrar e editar links manuais.
- Links manuais sao persistidos como `PageItem.type = link`.
- Links manuais usam a gestao unificada de itens para ativacao, destaque, ordenacao e remocao.
- Links manuais ativos aparecem na lista publica unificada, com ou sem produtos ativos.
- Links manuais inativos nao aparecem publicamente.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 8 - Redes sociais

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

# Fase 9 - Pagina publica com itens ativos

## Objetivo

Disponibilizar a pagina publica real por username, renderizando perfil, redes sociais e lista unificada de `PageItem` ativos.

## Estado

Prototipo visual existente, dados reais pendentes.

## Entregas

- Loader publico por username.
- Bloqueio de perfis despublicados.
- Registro de `PageView` no server/loader quando uma pagina publicada real for carregada.
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
- Registrar `PageView` no server/loader da rota publica por username somente apos localizar uma pagina publicada real.
- Garantir que pagina inexistente nao registra `PageView`.
- Garantir que pagina despublicada nao registra `PageView`.
- Garantir que falha ao registrar `PageView` nao impede a renderizacao da pagina publicada.
- Tratar qualquer mudanca futura exigida por cache, SSR ou estrategia equivalente como nova decisao em `docs/decisions.md`.
- Exibir estado de pagina inexistente.
- Exibir estado de pagina despublicada.
- Exibir estado sem itens ativos considerando produtos e links manuais.
- Exibir redes sociais ativas.
- Exibir item em destaque quando existir.
- Exibir produtos e links manuais ativos ordenados por `position`.
- Evitar duplicar o item em destaque se ele tambem aparecer separado da lista.
- Garantir que visitante nao precise de conta.
- Abrir destino externo de qualquer `PageItem`.
- Adicionar SEO basico.
- Adicionar metadados de compartilhamento.
- Revisar layout mobile first com dados reais.

## Criterios de conclusao

- Qualquer visitante com o link consegue acessar uma pagina publicada sem login.
- A pagina exibe somente conteudo ativo.
- A pagina funciona com apenas produtos, apenas links ou produtos e links juntos.
- `PageView` e registrado quando uma pagina publicada real e carregada.
- Paginas inexistentes e despublicadas nao registram `PageView`.
- Falha ao registrar `PageView` nao impede a renderizacao da pagina publicada.
- Cliques em itens abrem corretamente o destino externo.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 10 - Publicacao e dashboard real

## Objetivo

Permitir que o criador controle a visibilidade da pagina e veja um resumo simples dos proprios itens e metricas.

## Estado

Dashboard simulado existente, implementacao real pendente.

## Entregas

- Publicacao da pagina.
- Despublicacao da pagina.
- Link publico exibido no dashboard.
- Acao para copiar link publico.
- Resumo real de itens.
- Resumo real de produtos.
- Resumo real de links manuais.
- Resumo real de visualizacoes.
- Resumo real de cliques.
- Atalho principal para `Itens`.
- Atalhos para editar perfil, adicionar produto e adicionar link manual.

## Pendencias para issues

- Implementar mutation de publicar pagina.
- Implementar mutation de despublicar pagina.
- Ao publicar pela primeira vez, preencher `published_at` com o momento atual.
- Ao despublicar, manter `published_at` com o valor existente.
- Ao republicar, atualizar `published_at` para o novo momento de publicacao.
- Usar `is_published` como fonte de verdade para visibilidade publica.
- Exibir status atual da pagina no dashboard.
- Exibir link publico baseado no username.
- Implementar copiar link publico.
- Exibir quantidade real de itens.
- Exibir quantidade real de produtos.
- Exibir quantidade real de links manuais.
- Exibir quantidade real de visualizacoes quando metricas estiverem disponiveis.
- Exibir quantidade real de cliques quando metricas estiverem disponiveis.
- Criar estado de dashboard para perfil incompleto.
- Criar estado de dashboard para pagina despublicada.
- Criar atalho principal para `/dashboard/items` com rotulo `Itens`.
- Criar atalhos para adicionar produto e adicionar link manual sem sugerir que produto e obrigatorio.

## Criterios de conclusao

- O criador consegue publicar e despublicar a pagina.
- O dashboard mostra o link publico correto.
- O dashboard mostra contagens reais de itens, produtos, links, visualizacoes e cliques.
- O dashboard direciona a gestao principal de `PageItem` para `Itens` em `/dashboard/items`.
- Uma pagina despublicada nao fica acessivel para visitantes.
- `published_at` representa a publicacao mais recente e nao e limpo ao despublicar.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 11 - Analytics basico por item

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
- Contagem de cliques por item.
- Contagem de cliques por tipo de item.

## Pendencias para issues

- Definir identificador anonimo minimo de visitante sem coletar dados pessoais desnecessarios.
- Registrar visualizacao no server/loader por carregamento de pagina publica publicada real.
- Evitar registrar visualizacao para pagina inexistente ou despublicada.
- Garantir que falha ao registrar visualizacao nao impede a renderizacao da pagina publicada.
- Registrar nova decisao se cache, SSR ou outra estrategia futura exigir mudar o ponto de registro de `PageView`.
- Criar endpoint ou server function para clique em item.
- Registrar `ItemClick` antes do redirecionamento.
- Garantir que falha ao registrar clique nao impede redirecionamento.
- Validar que o item clicado pertence ao perfil registrado.
- Armazenar `item_type` no momento do clique.
- Exibir total real de visualizacoes no dashboard.
- Exibir total real de cliques no dashboard.
- Exibir cliques por item.
- Exibir cliques por tipo de item quando simples.
- Evitar filtros por periodo, origem detalhada e analytics avancado nesta fase.

## Criterios de conclusao

- Visualizacoes de paginas publicadas sao registradas.
- Visualizacoes nao sao registradas para paginas inexistentes ou despublicadas.
- Falha no registro de visualizacao nao impede a renderizacao da pagina publicada.
- Cliques em produtos e links manuais sao registrados como `ItemClick`.
- O visitante sempre e redirecionado ao destino externo, mesmo se a metrica falhar.
- O dashboard exibe totais basicos reais.
- O criador consegue ver analytics basico por item.

## Comandos de verificacao

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

---

# Fase 12 - Deploy e validacao do MVP

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
- Rodar teste completo de dashboard com contagens de itens, produtos, links, visualizacoes e cliques.
- Rodar teste completo de analytics basico por item.
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
- A pagina funciona com apenas produtos, apenas links ou produtos e links juntos.
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

# Evolucoes futuras fora do MVP

## Imagens para links

Possiveis issues futuras:

- Adicionar `image_url` opcional para `PageItem.type = link`.
- Gerar thumbnails a partir da URL quando viavel.
- Importar imagem de metadados externos.
- Criar fallback visual por tipo de link.

## Video

Possiveis issues futuras:

- Adicionar tipo ou metadados de video em `PageItem`.
- Permitir thumbnail de video.
- Permitir link para video externo.
- Avaliar item de video incorporado somente se houver demanda real.

## Analytics avancado

Possiveis issues futuras:

- Filtros por periodo.
- Origem detalhada de trafego.
- Taxa de clique por item.
- Ranking de itens mais acessados.
- Comparacao entre periodos.
- Desempenho por posicao na pagina.
- Exportacao de relatorios.

---

# Sequencia recomendada de milestones

1. Documentacao e decisao `PageItem`.
2. Prototipo navegavel com itens.
3. Fundacao da aplicacao.
4. Schema `PageItem` e `ItemClick`.
5. Perfil do criador.
6. Gestao unificada de `PageItem`.
7. Produtos como `PageItem.type = product`.
8. Links manuais como `PageItem.type = link`.
9. Redes sociais.
10. Pagina publica com itens ativos.
11. Publicacao e dashboard real.
12. Analytics basico por item.
13. Deploy e validacao do MVP.

# Proximas issues recomendadas

1. Atualizar README e `.env.example`.
2. Revisar configuracao de Worker e compatibilidade com Supabase Postgres.
3. Alterar schema Drizzle de `products` para `page_items`.
4. Alterar schema Drizzle de `product_clicks` para `item_clicks`.
5. Integrar Supabase Auth para cadastro, login, logout e recuperacao de senha.
6. Proteger rotas privadas.
7. Implementar perfil real com validacao Zod.
8. Implementar gestao unificada de `PageItem`.
9. Implementar produto como `PageItem.type = product`.
10. Implementar upload de imagem de produto como issue separada dentro da fase de produtos.
11. Implementar link manual como `PageItem.type = link`.
12. Implementar pagina publica real por username com itens ativos.
13. Implementar publicacao, despublicacao e dashboard com contagens.
14. Implementar metricas basicas com `PageView` e `ItemClick`.
