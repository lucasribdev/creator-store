# Plano de Implementação do MVP

## Objetivo

Este plano transforma o roadmap da Creator Store em uma sequência prática de execução para uma pessoa desenvolvendo sozinha. O foco é levar o produto até o MVP sem ampliar o escopo: conta, perfil público, redes sociais, produtos manuais, publicação da vitrine, acesso público, redirecionamento externo e métricas básicas.

## Estado Atual

O codigo atual esta em fase de prototipo navegavel. As rotas e telas principais ja existem para validar fluxo e interface, mas ainda usam principalmente dados ficticios e nao representam a implementacao real de autenticacao, persistencia, autorizacao ou metricas.

### Concluído

- [x] Documentação inicial do produto criada em `docs/`.
- [x] Stack do MVP definida com TanStack Start, TypeScript, Tailwind CSS, Supabase, Drizzle, Zod, TanStack Form e Cloudflare Workers.
- [x] Projeto base criado com rotas públicas e privadas visuais.
- [x] Protótipo navegável iniciado com dados fictícios para página pública, dashboard, perfil, redes sociais, login, cadastro, recuperação de senha e produtos.
- [x] Schema inicial Drizzle modelado para `users`, `profiles`, `social_links`, `products`, `page_views` e `product_clicks`.
- [x] Migration inicial existente em `drizzle/0000_lazy_prodigy.sql`.
- [x] Rota técnica `/api/health/db` existente para validar conexão com banco.
- [x] Validação técnica de Cloudflare Workers com Supabase Postgres via `pg`/`node-postgres` concluída e registrada em `docs/decisions.md`.

### Parcial

- [ ] Página pública existe como protótipo, mas ainda não carrega dados reais.
- [ ] Dashboard existe como protótipo, mas ainda não usa autenticação, banco ou métricas reais.
- [ ] Formulários visuais existem, mas ainda não persistem dados.
- [ ] Produtos existem no protótipo, mas ainda não possuem CRUD real.
- [ ] Redes sociais aparecem na página pública fictícia, mas ainda não possuem gerenciamento real.

### Pendente

- [ ] Autenticação real com Supabase Auth.
- [ ] Integração real com Supabase Storage.
- [ ] Proteção das rotas privadas.
- [ ] Persistência real para perfil, redes sociais, produtos, publicação e métricas.
- [ ] Aplicação e validação das migrations no banco de desenvolvimento.
- [ ] Server functions, loaders e mutations reais.
- [ ] Upload real de avatar, banner e imagens de produto.
- [ ] Publicação e despublicação real da página.
- [ ] Registro real de visualizações e cliques.
- [ ] Testes internos do fluxo principal.
- [ ] Deploy validado do MVP.

## Fase 0 - Preparação

### Concluído

- [x] Criar documentação principal do produto.
- [x] Definir o que entra e o que fica fora do MVP.
- [x] Definir stack técnica.
- [x] Criar estrutura inicial do projeto.
- [x] Configurar scripts principais no `package.json`.
- [x] Criar schema inicial do banco com Drizzle.
- [x] Validar conexão mínima com Supabase Postgres no Cloudflare Workers.

### Parcial

- [ ] Garantir que o README reflita o fluxo atual de instalação, execução local, variáveis de ambiente e deploy.
- [ ] Confirmar que `.env.example` lista todas as variáveis necessárias para desenvolvimento local.

### Pendente

- [ ] Aplicar migrations no banco de desenvolvimento.
- [ ] Revisar se a configuração do Worker está alinhada com `nodejs_compat`, Drizzle e Supabase Postgres.

Critério de conclusão: a documentação, o ambiente local, o schema, as variáveis e a conexão com banco devem estar prontos para iniciar funcionalidades reais sem decisões técnicas bloqueadoras.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Fase 1 - Protótipo navegável

### Concluído

- [x] Criar página inicial.
- [x] Criar telas simuladas de login e cadastro.
- [x] Criar tela simulada de recuperação de senha.
- [x] Criar dashboard simulado.
- [x] Criar tela simulada de edição de perfil.
- [x] Criar lista simulada de produtos.
- [x] Criar telas simuladas de cadastro e edição de produto.
- [x] Criar página pública simulada por username.
- [x] Representar estados de página publicada, despublicada, inexistente e sem produtos ativos no protótipo.

### Parcial

- [ ] Revisar o protótipo em celular e desktop para confirmar clareza do fluxo principal.
- [ ] Validar se os campos de produto são suficientes e simples para cadastro manual.
- [ ] Confirmar se a página pública parece uma vitrine pessoal, não uma loja completa.

### Pendente

- [ ] Registrar ajustes visuais necessários antes da integração real.

Critério de conclusão: deve ser possível simular o fluxo de criar conta, configurar perfil, adicionar produto, visualizar página pública e clicar em produto usando dados fictícios.

Comandos de verificação:

```bash
pnpm check
pnpm build
```

## Fase 2 - Fundação da aplicação

### Concluído

- [x] Estrutura de rotas com TanStack Router iniciada.
- [x] Integração base com TanStack Query criada.
- [x] Configuração inicial de Drizzle criada.
- [x] Endpoint técnico de saúde do banco criado.

### Parcial

- [ ] Separar claramente dados fictícios de dados reais para facilitar a transição.
- [ ] Definir helpers de ambiente com validação explícita, sem non-null assertion.
- [ ] Definir camada inicial de acesso a dados sem acoplamento excessivo a `process.env.DATABASE_URL`.

### Pendente

- [ ] Integrar Supabase Auth para cadastro, login, logout e recuperação de senha.
- [ ] Criar sincronização entre Supabase Auth e `public.users`.
- [ ] Proteger rotas privadas do dashboard.
- [ ] Garantir que usuário autenticado acesse apenas seus próprios dados.
- [ ] Implementar loaders para dados iniciais de rotas públicas e privadas quando aplicável.
- [ ] Implementar mutations tipadas com validação Zod.
- [ ] Tratar erros básicos de autenticação, sessão expirada e falha de banco.

Critério de conclusão: um usuário deve conseguir criar conta, fazer login, acessar o dashboard, sair e retornar depois acessando somente seus próprios dados.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Fase 3 - Perfil do criador

### Concluído

- [x] Tela visual de edição de perfil criada no protótipo.
- [x] Schema de `profiles` inclui username, nome de exibição, bio, avatar, banner e status de publicação.
- [x] Decisão de normalizar username em lowercase registrada.

### Parcial

- [ ] Reaproveitar o layout atual para o formulário real de perfil.
- [ ] Definir validações Zod para username, nome de exibição, bio e URLs de imagem.

### Pendente

- [ ] Persistir criação e edição de perfil no banco.
- [ ] Validar username único, lowercase, tamanho e palavras reservadas.
- [ ] Implementar upload de avatar no Supabase Storage.
- [ ] Implementar upload de banner se mantido na interface do MVP.
- [ ] Permitir visualizar prévia da página.
- [ ] Exibir estados de perfil incompleto, perfil salvo, erro ao salvar e página despublicada.

Critério de conclusão: o criador deve conseguir configurar username e nome de exibição, salvar o perfil real e visualizar uma prévia pública, mesmo sem produtos.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Fase 4 - Produtos

### Concluído

- [x] Lista, cadastro e edição de produtos existem no protótipo.
- [x] Schema de `products` inclui campos obrigatórios, opcionais, status ativo, destaque e posição.
- [x] Regra de um produto em destaque por perfil foi planejada no banco.

### Parcial

- [ ] Converter formulários visuais em TanStack Form com validação Zod.
- [ ] Reaproveitar estados visuais de produto ativo, inativo, destaque e sem imagem.

### Pendente

- [ ] Implementar listagem real de produtos do perfil autenticado.
- [ ] Implementar criação, edição e exclusão de produto.
- [ ] Implementar ativar e desativar produto.
- [ ] Implementar marcação de destaque removendo destaque anterior.
- [ ] Implementar ordenação simples com mover para cima e mover para baixo.
- [ ] Implementar upload de imagem do produto no Supabase Storage.
- [ ] Validar nome obrigatório, link externo válido, preço não negativo e posição não negativa.
- [ ] Garantir que produtos inativos não apareçam publicamente.
- [ ] Sugerir desativação antes de exclusão definitiva.

Critério de conclusão: o criador deve conseguir cadastrar, editar, ativar, desativar, destacar, ordenar e remover produtos reais, e produtos ativos devem aparecer na prévia pública.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Fase 5 - Redes sociais

### Concluído

- [x] Tipos iniciais de redes sociais definidos na documentação e no enum Drizzle.
- [x] Página pública fictícia já mostra links sociais.

### Parcial

- [ ] Definir componentes de formulário e lista para redes sociais usando padrões já criados no dashboard.

### Pendente

- [ ] Criar rota privada para gerenciar redes sociais.
- [ ] Implementar adicionar, editar e remover link social.
- [ ] Implementar ativar, desativar e ordenar links sociais.
- [ ] Validar tipo, URL, posição e label obrigatório para `other`.
- [ ] Exibir somente links ativos na página pública.
- [ ] Adicionar estado vazio e estado de erro para redes sociais.

Critério de conclusão: o criador deve conseguir gerenciar Instagram, TikTok, YouTube, WhatsApp, site e outro link, e o visitante deve conseguir abrir links ativos na página pública.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Fase 6 - Página pública real

### Concluído

- [x] Protótipo de página pública por username existe.
- [x] Estados visuais de página inexistente, despublicada e sem produtos ativos existem no protótipo.

### Parcial

- [ ] Adaptar a rota pública para usar loader com dados reais.
- [ ] Reaproveitar o layout mobile first validado no protótipo.

### Pendente

- [ ] Carregar perfil publicado por username.
- [ ] Bloquear acesso público a perfis despublicados.
- [ ] Exibir perfil, redes sociais ativas, produto em destaque e produtos ativos ordenados.
- [ ] Implementar publicação e despublicação a partir do dashboard.
- [ ] Exibir e copiar link público no dashboard.
- [ ] Abrir link externo do produto corretamente.
- [ ] Adicionar SEO básico e metadados de compartilhamento.
- [ ] Garantir que visitante não precise de conta.

Critério de conclusão: qualquer visitante com o link deve acessar uma página publicada, ver apenas conteúdo ativo e abrir o destino externo de um produto.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Fase 7 - Métricas básicas

### Concluído

- [x] Entidades `page_views` e `product_clicks` modeladas no schema.
- [x] Dashboard simulado já reserva espaço para visualizações e cliques.
- [x] Regra de clique não bloquear redirecionamento está documentada.

### Parcial

- [ ] Definir a forma mínima de identificar visitante anonimamente, sem coletar dados pessoais desnecessários.

### Pendente

- [ ] Registrar visualização por carregamento de página pública publicada.
- [ ] Registrar clique de produto antes do redirecionamento.
- [ ] Garantir que falha no registro de clique não impeça o redirecionamento.
- [ ] Validar no banco que o produto clicado pertence ao perfil registrado.
- [ ] Exibir totais reais de visualizações e cliques no dashboard.
- [ ] Exibir cliques por produto se for simples manter a consulta no MVP.
- [ ] Evitar analytics avançado, filtros por período e origem detalhada nesta fase.

Critério de conclusão: a plataforma deve informar total de visualizações e total de cliques reais, mantendo o redirecionamento externo funcional mesmo em caso de falha de métrica.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Fase 8 - Deploy e validação

### Concluído

- [x] Deploy alvo inicial definido como Cloudflare Workers.
- [x] Consulta mínima ao Supabase Postgres validada em Worker publicado.

### Parcial

- [ ] Manter `wrangler.jsonc` e variáveis de ambiente alinhados ao runtime real.
- [ ] Confirmar se o build local continua compatível com o Worker conforme funcionalidades reais forem adicionadas.

### Pendente

- [ ] Rodar teste interno completo do fluxo principal em celular e desktop.
- [ ] Testar criar conta, login, recuperação de senha, logout e proteção de rota privada.
- [ ] Testar perfil, produtos, redes sociais, publicação, página pública, clique e redirecionamento.
- [ ] Testar permissões entre dois usuários.
- [ ] Testar página inexistente, página despublicada, produto inativo e produto sem imagem.
- [ ] Validar deploy do MVP no Cloudflare Workers.
- [ ] Conferir variáveis de produção sem commitar segredos.
- [ ] Preparar política de privacidade, termos de uso, aviso sobre links externos e canal de contato antes de abrir para usuários.
- [ ] Validar com 5 a 10 criadores ou afiliados iniciais.
- [ ] Corrigir problemas críticos encontrados na validação.

Critério de conclusão: o MVP deve estar publicado, com fluxo principal funcionando sem erros bloqueadores, permissões revisadas e condições mínimas para uso por primeiros criadores.

Comandos de verificação:

```bash
pnpm check
pnpm build
pnpm exec tsc --noEmit
```

## Próxima Sequência Recomendada

1. Revisar README e `.env.example` para garantir instalação, execução local e variáveis mínimas.
2. Gerar e aplicar migrations do schema Drizzle em banco de desenvolvimento.
3. Integrar Supabase Auth com cadastro, login, logout e recuperação de senha.
4. Criar sincronização segura entre Supabase Auth e `public.users`.
5. Proteger rotas privadas e validar isolamento de dados por usuário.
6. Transformar o formulário de perfil em fluxo real com validação Zod e persistência.
7. Transformar produtos em CRUD real com TanStack Form, TanStack Query e mutations.
8. Implementar página pública real carregando perfil e produtos ativos por username.
9. Implementar publicação, despublicação e cópia do link público no dashboard.
10. Implementar registro básico de visualizações e cliques com redirecionamento resiliente.
