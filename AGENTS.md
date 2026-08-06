# AGENTS.md

Instrucoes para agentes e assistentes que trabalharem neste repositorio.

## Produto

Este repositorio contem a Creator Store.

A Creator Store e uma plataforma para criadores de conteudo e afiliados transformarem o link da bio em uma vitrine pessoal de produtos recomendados.

O produto deve permitir que um criador:

- crie uma conta;
- configure uma pagina publica;
- adicione redes sociais;
- cadastre produtos manualmente;
- publique sua vitrine;
- compartilhe o link publico.

O visitante deve conseguir:

- acessar uma pagina publica sem login;
- visualizar perfil, redes sociais e produtos ativos;
- clicar em um produto;
- ser redirecionado para uma loja ou pagina externa.

## Limites permanentes do produto

A Creator Store nao e um e-commerce, loja virtual ou marketplace.

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

A compra sempre acontece fora da plataforma.

## Documentacao principal

Antes de alterar comportamento de produto, consulte:

- `docs/vision.md`
- `docs/mvp.md`
- `docs/user-flows.md`
- `docs/data-model.md`
- `docs/tech-stack.md`
- `docs/roadmap.md`
- `docs/decisions.md`

Se uma decisao importante for tomada, registre em `docs/decisions.md`.

Se o escopo do MVP mudar, atualize `docs/mvp.md` e, se necessario, `docs/roadmap.md`.

## Stack

Stack definida para o MVP:

- TanStack Start;
- TypeScript;
- TanStack Router;
- TanStack Query;
- TanStack Form;
- Tailwind CSS;
- shadcn/ui de forma seletiva;
- Supabase Postgres;
- Supabase Auth;
- Supabase Storage;
- Drizzle ORM;
- Zod;
- Cloudflare Workers.

## Regras de arquitetura

Use TanStack Start como framework full-stack principal.

Use loaders do TanStack Router para dados iniciais de rota, especialmente em paginas publicas e telas que precisam renderizar com dados antes da interacao.

Use TanStack Query para server state na area privada:

- dashboard;
- lista de produtos;
- redes sociais;
- mutations;
- invalidacao apos salvar, editar, ativar, desativar ou excluir.

Use TanStack Form para formularios.

Use Zod para validacao de entrada.

Use Drizzle para schema, migrations e consultas SQL.

Use Supabase para:

- autenticacao;
- Postgres;
- storage de avatar, banner e imagens de produto.

Nao introduza outro backend separado no MVP.

## Cloudflare Workers e banco

O deploy alvo inicial e Cloudflare Workers.

O banco sera Supabase Postgres.

O driver atual pode usar `node-postgres` via Drizzle, mas a compatibilidade com Workers deve ser validada cedo.

Para producao em Cloudflare, considere Hyperdrive quando a conexao direta com Postgres exigir pooling ou estabilidade adicional.

Nao assumir APIs completas de Node.js no runtime do Worker. Verifique compatibilidade antes de usar pacotes dependentes de APIs Node.

## Modelo de dados do MVP

As entidades principais sao:

- `User`;
- `Profile`;
- `SocialLink`;
- `Product`;
- `PageView`;
- `ProductClick`.

Regras importantes:

- um usuario possui apenas um perfil no MVP;
- `Profile.username` deve ser unico;
- visitantes acessam somente perfis publicados;
- produtos inativos nao aparecem publicamente;
- cada perfil pode ter no maximo um produto em destaque;
- clique deve ser registrado antes do redirecionamento;
- falha ao registrar clique nao deve impedir o redirecionamento;
- visitantes nao precisam de conta;
- dados privados so podem ser acessados pelo dono.

## Rotas esperadas do MVP

Rotas publicas:

- pagina inicial;
- login;
- cadastro;
- recuperar senha;
- pagina publica do criador por username;
- pagina nao encontrada ou indisponivel.

Area privada:

- dashboard;
- editar perfil;
- gerenciar redes sociais;
- lista de produtos;
- adicionar produto;
- editar produto.

## UI e experiencia

Priorize mobile first.

A pagina publica deve parecer uma vitrine pessoal de recomendacoes, nao uma loja completa.

O dashboard deve ser simples e objetivo.

Evite telas de marketing quando o objetivo for uma ferramenta utilizavel.

Use componentes shadcn/ui quando reduzirem trabalho e mantiverem consistencia, mas evite adicionar componentes sem necessidade.

Use icones lucide para acoes comuns e redes quando aplicavel.

Mantenha formularios curtos e com mensagens claras.

Estados obrigatorios:

- vazio;
- carregando;
- erro;
- salvo com sucesso;
- pagina despublicada;
- produto sem imagem;
- produto inativo.

## Qualidade

Antes de finalizar alteracoes de codigo, rode quando possivel:

```bash
pnpm check
pnpm build
```

Para checagem de tipos:

```bash
pnpm exec tsc --noEmit
```

Se algum comando falhar, corrija ou registre claramente o motivo.

## Convencoes

Use `pnpm` como gerenciador de pacotes.

Nao adicionar `package-lock.json`. O lockfile esperado e `pnpm-lock.yaml`.

Mantenha codigo em TypeScript estrito.

Evite `any` quando houver alternativa simples.

Evite non-null assertion (`!`) em variaveis de ambiente. Prefira validacao explicita.

Nao editar `src/routeTree.gen.ts` manualmente.

Use aliases existentes:

- `#/...`
- `@/...`

## Variaveis de ambiente

Nao commitar segredos reais.

Use `.env.local` para desenvolvimento local.

Documente variaveis esperadas em `.env.example` quando forem adicionadas.

Variaveis previstas:

- `DATABASE_URL`;
- `SUPABASE_URL`;
- `SUPABASE_ANON_KEY`;
- chaves de storage ou service role somente se realmente necessarias.

Segredos de producao devem ser configurados no Cloudflare Workers.

## Ao fazer alteracoes

Mantenha o escopo pequeno.

Nao implemente funcionalidades fora do MVP sem registrar decisao.

Nao refatore partes nao relacionadas.

Se encontrar uma decisao ambigua, consulte `docs/decisions.md` primeiro.

Se a documentacao e o codigo divergirem, a documentacao de produto deve ser atualizada ou a divergencia deve ser apontada.
