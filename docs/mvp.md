# MVP

## Objetivo

Validar se criadores de conteúdo e afiliados utilizariam uma página personalizada para organizar e compartilhar os produtos que recomendam e links externos importantes.

O sucesso do MVP não depende da quantidade de funcionalidades, mas da capacidade de responder às seguintes perguntas:

- Os criadores criam suas páginas?
- Eles cadastram produtos?
- Eles cadastram links manuais quando precisam complementar a vitrine?
- Eles compartilham a página nas redes sociais?
- Os visitantes clicam nos itens publicados?

---

# Fluxo principal

O MVP deve resolver apenas este fluxo:

1. O criador cria uma conta.
2. Configura sua página.
3. Adiciona suas redes sociais.
4. Cadastra produtos e, quando necessário, links manuais.
5. Publica sua página.
6. Compartilha o link.
7. O visitante acessa a página.
8. O visitante clica em um produto ou link manual.
9. O visitante é redirecionado para o destino externo.

Todo o restante pode esperar.

---

# Público inicial

O produto será desenvolvido inicialmente para:

- Afiliados do TikTok;
- Afiliados do Instagram;
- Criadores de conteúdo que recomendam produtos.

---

# Funcionalidades

## Autenticação

O usuário poderá:

- criar uma conta;
- fazer login;
- recuperar a senha.

---

## Página pública

Cada usuário possuirá uma página pública.

Exemplo:

```
plataforma.com/lucas
```

A página será composta por:

- foto de perfil;
- banner (opcional);
- nome;
- biografia;
- redes sociais;
- itens da página, com produtos recomendados e links manuais.

---

## Perfil

O criador poderá editar:

- nome;
- username;
- foto;
- banner;
- biografia.

---

## Redes sociais

Inicialmente serão suportadas:

- Instagram;
- TikTok;
- YouTube;
- WhatsApp;
- Site pessoal;
- Outro link.

O usuário poderá adicionar, editar e remover links.

---

## Produtos

Os produtos serão cadastrados manualmente.

Cada produto terá:

- imagem;
- nome;
- descrição curta;
- link afiliado;
- preço (opcional);
- preço antigo (opcional);
- botão de compra;
- destaque (sim ou não);
- ativo (sim ou não).

O usuário poderá:

- criar;
- editar;
- excluir;
- ativar/desativar;
- alterar a ordem de exibição.

---

## Links manuais

Links manuais comuns poderão ser cadastrados para destinos externos que não sejam produtos.

Exemplos:

- newsletter;
- grupo;
- comunidade;
- material gratuito;
- formulário;
- agenda;
- página de inscrição;
- site externo relevante.

Cada link manual terá:

- título;
- descrição curta (opcional);
- URL externa;
- texto do botão (opcional);
- ativo (sim ou não).

O usuário poderá:

- criar;
- editar;
- excluir;
- ativar/desativar;
- alterar a ordem de exibição junto aos produtos.

Links manuais devem complementar a vitrine e não substituir o foco principal em produtos recomendados.

---

## Página do criador

O visitante poderá visualizar:

- informações do criador;
- redes sociais;
- produto em destaque;
- lista de itens ativos, contendo produtos recomendados e links manuais.

Ao clicar em um item, será redirecionado para o destino externo cadastrado.

---

## Dashboard

O painel será simples.

Mostrará apenas:

- link da página;
- quantidade de produtos;
- quantidade de links manuais;
- quantidade de visualizações;
- quantidade de cliques;
- botão para editar perfil;
- botão para adicionar produto;
- botão para adicionar link manual.

---

# Regras de negócio

## Username

- único;
- utilizado na URL;
- sem espaços;
- não pode utilizar palavras reservadas.

## Página

- pertence a apenas um usuário;
- pode ser publicada ou despublicada;
- somente itens ativos serão exibidos.

## Item da página

- pertence a um único perfil;
- deve possuir tipo `product` ou `link`;
- deve possuir título e link externo;
- pode ser ocultado sem ser excluído;
- deve ser ordenado em uma lista única de itens clicáveis;
- links sociais continuam separados e não fazem parte dessa lista.

## Produto como item

- pertence a um único perfil;
- deve possuir nome e link;
- pode ser marcado como destaque;
- pode ser ocultado sem ser excluído.

## Link manual como item

- pertence a um único perfil;
- deve possuir título e URL externa;
- não deve possuir comportamento de rede social;
- não deve criar funcionalidades sociais, comentários, feed ou marketplace.

---

# Fora do MVP

As seguintes funcionalidades não serão desenvolvidas na primeira versão:

- categorias;
- busca;
- favoritos;
- comentários;
- avaliações;
- seguidores;
- feed social;
- chat;
- notificações;
- pedidos;
- cupons;
- importação automática de produtos;
- integração com marketplaces;
- atualização automática de preços;
- domínio personalizado;
- temas personalizados;
- múltiplos administradores;
- aplicativo mobile;
- inteligência artificial;
- planos pagos;
- analytics avançado.

---

# Critérios de sucesso

O MVP será considerado validado quando:

- usuários criarem páginas completas;
- produtos forem cadastrados;
- links manuais forem cadastrados quando fizerem sentido para o criador;
- as páginas forem compartilhadas nas redes sociais;
- visitantes clicarem nos itens publicados;
- os criadores retornarem para atualizar suas vitrines.

---

# Escopo da primeira versão

A primeira versão deverá permitir que um criador:

- crie sua conta;
- personalize sua página;
- adicione redes sociais;
- cadastre produtos;
- cadastre links manuais complementares;
- publique sua vitrine.

E que um visitante:

- acesse essa página;
- visualize produtos e links manuais ativos;
- clique em um item;
- seja direcionado para o destino externo responsável.

Nada além disso é necessário para validar a ideia inicial.
