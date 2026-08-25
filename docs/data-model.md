# Data Model

## Objetivo

Este documento descreve o modelo de dados necessário para o MVP.

O modelo deve suportar os seguintes fluxos:

- criação de conta;
- configuração da página pública;
- cadastro de redes sociais;
- cadastro de itens clicáveis da página pública;
- cadastro de produtos recomendados;
- cadastro de links manuais comuns;
- publicação da página;
- registro de visualizações;
- registro de cliques em itens.

O modelo inicial deve permanecer simples, evitando estruturas que ainda não são necessárias para validar o produto.

---

## Visão geral

As principais entidades do MVP são:

- `User`;
- `Profile`;
- `SocialLink`;
- `PageItem`;
- `PageView`;
- `ItemClick`.

Relacionamentos principais:

```text
User
 └── Profile
      ├── SocialLinks
      ├── PageItems
      ├── PageViews
      └── ItemClicks
```

Um usuário possui uma página pública representada pelo perfil.

O perfil pode possuir várias redes sociais e vários itens de página.

`PageItem` representa qualquer conteúdo clicável da área principal da página pública. No MVP, os tipos permitidos são:

- `product`;
- `link`.

Produtos continuam sendo o foco principal da UX, mas links manuais comuns podem aparecer na página para complementar a vitrine.

`SocialLink` continua separado porque redes sociais fazem parte da identidade do criador e devem aparecer no topo, com comportamento visual próprio.

Visualizações e cliques são registrados para permitir métricas básicas.

---

# Entidades

## User

Representa a conta utilizada para autenticação e acesso à área privada.

### Campos

| Campo        | Tipo     | Obrigatório | Descrição                          |
| ------------ | -------- | ----------: | ---------------------------------- |
| `id`         | UUID     |         Sim | Identificador único do usuário     |
| `email`      | String   |         Sim | E-mail utilizado para autenticação |
| `created_at` | DateTime |         Sim | Data de criação da conta           |
| `updated_at` | DateTime |         Sim | Data da última atualização         |

### Regras

- o e-mail deve ser único;
- o e-mail não deve ser exibido publicamente;
- os dados de autenticação devem ser administrados pelo serviço de autenticação;
- um usuário pode possuir apenas um perfil no MVP.

### Observação

Senha, recuperação de senha, sessões e provedores sociais não precisam fazer parte diretamente do banco principal caso sejam administrados por um serviço externo de autenticação.

---

## Profile

Representa a página pública do criador e suas informações principais.

### Campos

| Campo          | Tipo     | Obrigatório | Descrição                             |
| -------------- | -------- | ----------: | ------------------------------------- |
| `id`           | UUID     |         Sim | Identificador único do perfil         |
| `user_id`      | UUID     |         Sim | Referência ao usuário proprietário    |
| `username`     | String   |         Sim | Nome único utilizado na URL pública   |
| `display_name` | String   |         Sim | Nome exibido na página                |
| `bio`          | String   |         Não | Apresentação curta do criador         |
| `avatar_url`   | String   |         Não | Endereço da foto de perfil            |
| `banner_url`   | String   |         Não | Endereço da imagem de capa            |
| `is_published` | Boolean  |         Sim | Define se a página está pública       |
| `published_at` | DateTime |         Não | Data da primeira ou última publicação |
| `created_at`   | DateTime |         Sim | Data de criação                       |
| `updated_at`   | DateTime |         Sim | Data da última atualização            |

### Regras

- cada perfil pertence a um único usuário;
- cada usuário pode possuir apenas um perfil;
- o `username` deve ser único;
- o `username` deve ser tratado sem diferença entre letras maiúsculas e minúsculas;
- somente perfis publicados podem ser acessados por visitantes;
- o perfil pode ser publicado mesmo sem itens ativos;
- quando não houver itens ativos, a página pública deve exibir as informações do criador e suas redes sociais.

### Regras sugeridas para username

O `username` deve:

- possuir entre 3 e 30 caracteres;
- aceitar letras minúsculas;
- aceitar números;
- aceitar hífen ou underscore, caso necessário;
- não conter espaços;
- não utilizar palavras reservadas.

Exemplos de palavras reservadas:

```text
admin
api
app
dashboard
login
logout
signup
register
settings
support
help
about
privacy
terms
```

### Exemplo

```json
{
  "id": "profile-uuid",
  "user_id": "user-uuid",
  "username": "lucasreviews",
  "display_name": "Lucas Reviews",
  "bio": "Produtos, ferramentas e links que uso e recomendo.",
  "avatar_url": "https://example.com/avatar.jpg",
  "banner_url": null,
  "is_published": true
}
```

---

## SocialLink

Representa uma rede social ou link de presença digital exibido no topo do perfil.

### Campos

| Campo        | Tipo           | Obrigatório | Descrição                     |
| ------------ | -------------- | ----------: | ----------------------------- |
| `id`         | UUID           |         Sim | Identificador único           |
| `profile_id` | UUID           |         Sim | Perfil proprietário           |
| `type`       | Enum ou String |         Sim | Tipo do link social           |
| `label`      | String         |         Não | Nome personalizado            |
| `url`        | String         |         Sim | Endereço externo              |
| `position`   | Integer        |         Sim | Ordem de exibição             |
| `is_active`  | Boolean        |         Sim | Define se o link será exibido |
| `created_at` | DateTime       |         Sim | Data de criação               |
| `updated_at` | DateTime       |         Sim | Data da última atualização    |

### Tipos iniciais

```text
instagram
tiktok
youtube
whatsapp
website
other
```

### Regras

- cada link social pertence a um único perfil;
- somente links sociais ativos devem aparecer publicamente;
- a URL deve ser válida;
- a posição deve ser utilizada para ordenar os links;
- o campo `label` pode ser obrigatório quando o tipo for `other`;
- redes sociais não entram na lista principal de `PageItem`;
- cliques em redes sociais podem ser medidos futuramente, mas não fazem parte das métricas de item do MVP.

### Exemplo

```json
{
  "id": "social-link-uuid",
  "profile_id": "profile-uuid",
  "type": "instagram",
  "label": null,
  "url": "https://instagram.com/lucasreviews",
  "position": 1,
  "is_active": true
}
```

---

## PageItem

Representa um conteúdo clicável exibido na área principal da página pública.

No MVP, `PageItem` substitui a ideia de uma lista composta apenas por produtos. A mesma entidade será usada para:

- produtos recomendados (`type = product`);
- links manuais comuns (`type = link`).

Essa modelagem permite ordenar produtos e links em uma lista única, registrar cliques de forma uniforme e manter a página pública flexível sem criar um marketplace ou rede social.

### Campos

| Campo            | Tipo           | Obrigatório | Descrição                                      |
| ---------------- | -------------- | ----------: | ---------------------------------------------- |
| `id`             | UUID           |         Sim | Identificador único                            |
| `profile_id`     | UUID           |         Sim | Perfil proprietário                            |
| `type`           | Enum ou String |         Sim | Tipo do item: `product` ou `link`              |
| `title`          | String         |         Sim | Nome do produto ou título do link              |
| `description`    | String         |         Não | Descrição curta                                |
| `image_url`      | String         |         Não | Endereço da imagem, mais comum em produtos     |
| `external_url`   | String         |         Sim | Destino externo                                |
| `button_label`   | String         |         Não | Texto exibido no botão                         |
| `price`          | Decimal        |         Não | Preço informado manualmente para produtos      |
| `previous_price` | Decimal        |         Não | Preço anterior opcional para produtos          |
| `currency`       | String         |         Não | Moeda utilizada no preço                       |
| `is_active`      | Boolean        |         Sim | Define se o item aparece publicamente          |
| `is_featured`    | Boolean        |         Sim | Define se o item está em destaque              |
| `position`       | Integer        |         Sim | Ordem de exibição                              |
| `created_at`     | DateTime       |         Sim | Data de criação                                |
| `updated_at`     | DateTime       |         Sim | Data da última atualização                     |

### Tipos iniciais

```text
product
link
```

### Regras gerais

- cada item pertence a um único perfil;
- o tipo é obrigatório;
- o título é obrigatório;
- o destino externo é obrigatório;
- somente itens ativos aparecem na página pública;
- itens inativos continuam disponíveis no painel;
- a posição será utilizada para definir a ordem dos itens;
- a compra, inscrição, leitura, download ou qualquer outra ação final sempre acontecerá fora da plataforma;
- a plataforma não deve criar carrinho, checkout, pagamentos, pedidos, estoque, entrega, comentários ou feed social.

### Regras para `type = product`

- representa um produto recomendado pelo criador;
- continua sendo o tipo principal da UX;
- pode possuir imagem, descrição, preço, preço anterior e moeda;
- o preço é apenas informativo;
- o preço não será atualizado automaticamente no MVP;
- pode ser marcado como destaque;
- cada perfil poderá possuir no máximo um item em destaque no MVP.

### Regras para `type = link`

- representa um link manual comum que não é produto;
- deve possuir título e URL externa;
- pode possuir descrição curta e texto de botão;
- não deve usar preço, preço anterior ou moeda;
- não deve ser usado para redes sociais que pertencem ao topo do perfil;
- pode aparecer junto aos produtos na lista principal;
- deve complementar a vitrine, sem transformar a página em uma rede social ou marketplace.

### Item em destaque

No MVP, cada perfil poderá possuir no máximo um item em destaque, com prioridade para produtos.

A interface deve orientar o criador a destacar produtos. Caso links manuais em destaque sejam permitidos no futuro, isso deve ser tratado como evolução explícita.

Ao marcar um novo item como destaque, a plataforma deve remover o destaque do item anterior.

Alternativamente, essa regra pode ser garantida pela aplicação no primeiro momento e reforçada no banco posteriormente.

### Texto padrão do botão

Caso `button_label` não seja informado:

- para `type = product`, utilizar `Ver produto`;
- para `type = link`, utilizar `Acessar link`.

### Moeda padrão

Caso um preço seja informado em um item de produto sem moeda, utilizar:

```text
BRL
```

### Exemplo de produto

```json
{
  "id": "item-product-uuid",
  "profile_id": "profile-uuid",
  "type": "product",
  "title": "Fone Bluetooth",
  "description": "Modelo que utilizo no dia a dia.",
  "image_url": "https://example.com/product.jpg",
  "external_url": "https://loja.com/produto?affiliate=123",
  "button_label": "Ver oferta",
  "price": 149.9,
  "previous_price": 199.9,
  "currency": "BRL",
  "is_active": true,
  "is_featured": false,
  "position": 2
}
```

### Exemplo de link manual

```json
{
  "id": "item-link-uuid",
  "profile_id": "profile-uuid",
  "type": "link",
  "title": "Lista completa de equipamentos",
  "description": "Planilha com meus acessórios favoritos.",
  "image_url": null,
  "external_url": "https://example.com/equipamentos",
  "button_label": "Abrir lista",
  "price": null,
  "previous_price": null,
  "currency": null,
  "is_active": true,
  "is_featured": false,
  "position": 3
}
```

---

## PageView

Representa uma visualização da página pública.

### Campos

| Campo        | Tipo     | Obrigatório | Descrição                          |
| ------------ | -------- | ----------: | ---------------------------------- |
| `id`         | UUID     |         Sim | Identificador único                |
| `profile_id` | UUID     |         Sim | Perfil visualizado                 |
| `visitor_id` | String   |         Não | Identificador anônimo do visitante |
| `referrer`   | String   |         Não | Origem informada pelo navegador    |
| `created_at` | DateTime |         Sim | Data e hora da visualização        |

### Regras

- a visualização deve estar relacionada ao perfil acessado;
- visitantes não precisam possuir conta;
- não armazenar informações pessoais desnecessárias;
- o identificador do visitante deve ser anônimo;
- endereços IP não devem ser armazenados diretamente sem necessidade;
- métricas do MVP podem ser acumuladas sem análises avançadas.

### Contagem inicial

No primeiro corte, a aplicação pode registrar uma visualização por carregamento da página.

Posteriormente, pode ser criada uma regra para reduzir duplicações do mesmo visitante em um período curto.

### Exemplo

```json
{
  "id": "page-view-uuid",
  "profile_id": "profile-uuid",
  "visitor_id": "anonymous-session-id",
  "referrer": "https://www.instagram.com/",
  "created_at": "2026-08-04T18:00:00Z"
}
```

---

## ItemClick

Representa um clique realizado por um visitante em um item da página pública.

### Campos

| Campo        | Tipo     | Obrigatório | Descrição                          |
| ------------ | -------- | ----------: | ---------------------------------- |
| `id`         | UUID     |         Sim | Identificador único                |
| `profile_id` | UUID     |         Sim | Perfil proprietário do item        |
| `item_id`    | UUID     |         Sim | Item clicado                       |
| `item_type`  | String   |         Sim | Tipo do item no momento do clique  |
| `visitor_id` | String   |         Não | Identificador anônimo do visitante |
| `referrer`   | String   |         Não | Origem informada pelo navegador    |
| `created_at` | DateTime |         Sim | Data e hora do clique              |

### Regras

- o clique deve estar relacionado ao item;
- o item deve pertencer ao perfil informado;
- o tipo do item deve ser armazenado para facilitar métricas básicas por tipo;
- o clique deve ser registrado antes do redirecionamento;
- a falha no registro não deve impedir o redirecionamento;
- o visitante não precisa estar autenticado;
- não armazenar dados pessoais desnecessários.

### Exemplo

```json
{
  "id": "item-click-uuid",
  "profile_id": "profile-uuid",
  "item_id": "item-product-uuid",
  "item_type": "product",
  "visitor_id": "anonymous-session-id",
  "referrer": "https://www.tiktok.com/",
  "created_at": "2026-08-04T18:05:00Z"
}
```

---

# Relacionamentos

## User e Profile

```text
User 1 ─── 1 Profile
```

- um usuário possui um perfil;
- um perfil pertence a um usuário.

## Profile e SocialLink

```text
Profile 1 ─── N SocialLink
```

- um perfil pode possuir vários links sociais;
- um link social pertence a um perfil.

## Profile e PageItem

```text
Profile 1 ─── N PageItem
```

- um perfil pode possuir vários itens;
- um item pertence a um perfil.

## Profile e PageView

```text
Profile 1 ─── N PageView
```

- um perfil pode receber várias visualizações;
- uma visualização pertence a um perfil.

## Profile e ItemClick

```text
Profile 1 ─── N ItemClick
```

- um perfil pode receber vários cliques;
- um clique pertence a um perfil.

## PageItem e ItemClick

```text
PageItem 1 ─── N ItemClick
```

- um item pode receber vários cliques;
- um clique está relacionado a um item.

---

# Diagrama simplificado

```mermaid
erDiagram
    USER ||--|| PROFILE : owns
    PROFILE ||--o{ SOCIAL_LINK : has
    PROFILE ||--o{ PAGE_ITEM : has
    PROFILE ||--o{ PAGE_VIEW : receives
    PROFILE ||--o{ ITEM_CLICK : receives
    PAGE_ITEM ||--o{ ITEM_CLICK : receives

    USER {
        uuid id
        string email
        datetime created_at
        datetime updated_at
    }

    PROFILE {
        uuid id
        uuid user_id
        string username
        string display_name
        string bio
        string avatar_url
        string banner_url
        boolean is_published
        datetime published_at
        datetime created_at
        datetime updated_at
    }

    SOCIAL_LINK {
        uuid id
        uuid profile_id
        string type
        string label
        string url
        integer position
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    PAGE_ITEM {
        uuid id
        uuid profile_id
        string type
        string title
        string description
        string image_url
        string external_url
        string button_label
        decimal price
        decimal previous_price
        string currency
        boolean is_active
        boolean is_featured
        integer position
        datetime created_at
        datetime updated_at
    }

    PAGE_VIEW {
        uuid id
        uuid profile_id
        string visitor_id
        string referrer
        datetime created_at
    }

    ITEM_CLICK {
        uuid id
        uuid profile_id
        uuid item_id
        string item_type
        string visitor_id
        string referrer
        datetime created_at
    }
```

---

# Restrições e índices

## Restrições únicas

Devem ser únicos:

- `User.email`;
- `Profile.user_id`;
- `Profile.username`.

## Chaves estrangeiras

Devem existir referências entre:

- `Profile.user_id` e `User.id`;
- `SocialLink.profile_id` e `Profile.id`;
- `PageItem.profile_id` e `Profile.id`;
- `PageView.profile_id` e `Profile.id`;
- `ItemClick.profile_id` e `Profile.id`;
- `ItemClick.item_id` e `PageItem.id`.

`ItemClick` deve garantir que `item_id` pertence ao mesmo `profile_id` registrado no clique. Essa garantia pode ser feita por chave estrangeira composta referenciando uma combinação única equivalente em `PageItem`.

## Índices recomendados

Criar índices para:

- `Profile.username`;
- `SocialLink.profile_id`;
- `SocialLink.profile_id + position`;
- `PageItem.profile_id`;
- `PageItem.profile_id + type`;
- `PageItem.profile_id + is_active`;
- `PageItem.profile_id + is_active + position`;
- `PageItem.profile_id + is_featured`;
- `PageView.profile_id`;
- `PageView.profile_id + created_at`;
- `ItemClick.profile_id`;
- `ItemClick.item_id`;
- `ItemClick.item_id + created_at`;
- `ItemClick.profile_id + item_type`.

Esses índices ajudam a carregar páginas públicas e calcular métricas básicas.

---

# Exclusão de dados

## Exclusão do perfil

Ao excluir um perfil, os seguintes dados relacionados devem ser removidos ou anonimizados:

- redes sociais;
- itens da página;
- visualizações;
- cliques.

A exclusão da conta deve ser tratada com cuidado para evitar registros órfãos.

## Exclusão de item

Ao excluir um item, existem duas opções:

1. remover também seus registros de clique;
2. preservar os cliques para histórico, removendo apenas a referência pública.

Para o MVP, a opção mais simples é impedir a exclusão imediata e recomendar que o usuário desative o item.

Caso a exclusão definitiva seja permitida, os cliques podem ser removidos junto com o item.

## Exclusão lógica

No MVP, itens podem utilizar `is_active` para ocultação.

Não é necessário adicionar `deleted_at` inicialmente.

A exclusão lógica pode ser implementada futuramente caso exista necessidade de recuperação ou auditoria.

---

# Armazenamento de imagens

As imagens não devem ser armazenadas diretamente no banco de dados.

O banco deverá guardar apenas a URL ou o caminho do arquivo.

Tipos de imagem:

- avatar do perfil;
- banner do perfil;
- imagem de item, principalmente produto.

A aplicação deve validar:

- formato;
- tamanho;
- proporção quando necessário;
- propriedade do arquivo;
- acesso permitido.

---

# Segurança e autorização

## Dados privados

Somente o proprietário do perfil pode:

- editar suas informações;
- adicionar ou remover redes sociais;
- cadastrar itens;
- editar itens;
- ativar ou desativar itens;
- publicar ou despublicar a página;
- consultar métricas privadas.

## Dados públicos

Visitantes podem consultar apenas:

- perfis publicados;
- informações públicas do criador;
- redes sociais ativas;
- itens ativos.

## Isolamento de dados

Toda operação privada deve validar que:

```text
recurso.profile_id pertence ao usuário autenticado
```

Não é suficiente confiar em um identificador enviado pelo frontend.

A autorização deve ser garantida no servidor ou no banco de dados.

---

# Validações principais

## Profile

- `username` válido e disponível;
- `display_name` não vazio;
- biografia limitada a um tamanho razoável;
- URLs de imagens válidas;
- publicação permitida somente com dados mínimos.

## SocialLink

- tipo válido;
- URL válida;
- posição maior ou igual a zero;
- label obrigatória para links personalizados.

## PageItem

- tipo válido: `product` ou `link`;
- título não vazio;
- link externo válido;
- posição maior ou igual a zero;
- no máximo um item em destaque por perfil, com prioridade para produtos;
- itens do tipo `link` não devem usar preço, preço anterior ou moeda;
- itens do tipo `product` podem usar preço, preço anterior, moeda, imagem e descrição.

---

# Dados derivados

Algumas informações não precisam ser armazenadas diretamente.

## Quantidade de itens

Pode ser calculada a partir dos itens pertencentes ao perfil.

## Quantidade de produtos

Pode ser calculada filtrando:

```text
profile_id = perfil atual
type = product
```

## Quantidade de links manuais

Pode ser calculada filtrando:

```text
profile_id = perfil atual
type = link
```

## Quantidade de itens ativos

Pode ser calculada filtrando:

```text
profile_id = perfil atual
is_active = true
```

## Total de visualizações

Pode ser calculado pela quantidade de registros em `PageView`.

## Total de cliques

Pode ser calculado pela quantidade de registros em `ItemClick`.

## Total de cliques por item

Pode ser calculado agrupando os cliques por `item_id`.

## Total de cliques por tipo

Pode ser calculado agrupando os cliques por `item_type`.

No MVP, essas consultas são suficientes.

Caso o volume cresça, poderão ser criados contadores agregados ou tabelas de métricas.

---

# Decisões do MVP

## Uma página por usuário

Cada usuário terá apenas uma página pública.

Múltiplas páginas por conta ficam fora do MVP.

## Itens de página com tipos

Produtos recomendados e links manuais comuns serão representados por `PageItem`.

A lista principal da página pública será ordenada por `position` e exibirá apenas itens ativos.

## Produtos continuam prioritários

Produtos são o principal caso de uso da Creator Store.

Links manuais comuns existem para complementar a página, não para reposicionar o produto como uma ferramenta genérica de link na bio.

## Redes sociais separadas

`SocialLink` continua separado de `PageItem`.

Redes sociais pertencem ao topo do perfil e ajudam a apresentar a identidade do criador.

## Produtos sem categorias

Os itens serão exibidos em uma lista única.

A organização será feita por:

- item em destaque;
- posição de exibição;
- status ativo ou inativo.

Categorias poderão ser adicionadas depois, caso os usuários cadastrem muitos itens.

## Cadastro manual

Todos os produtos e links serão cadastrados manualmente.

Não haverá importação ou sincronização automática no MVP.

## Preço informativo

O preço exibido será informado pelo criador e deve ser usado apenas em itens do tipo `product`.

A plataforma não garante que ele seja igual ao preço encontrado na loja externa.

## Redirecionamento externo

A plataforma registra o clique e redireciona o visitante.

Ela não participa da compra, do pagamento, do pedido, da entrega, do estoque ou da execução do serviço externo.

## Métricas simples

Serão registrados apenas:

- visualizações de página;
- cliques em itens.

Não haverá analytics avançado na primeira versão.

---

# Itens não modelados

Não fazem parte do modelo inicial:

- carrinho;
- checkout;
- pedidos;
- pagamentos;
- estoque;
- frete;
- entrega;
- avaliações;
- comentários;
- seguidores;
- feed social;
- categorias;
- coleções;
- múltiplas páginas por usuário;
- permissões por equipe;
- importação automática;
- sincronização com marketplaces;
- analytics avançado.
