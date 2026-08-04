# MVP

## Objetivo

Validar se criadores de conteúdo e afiliados utilizariam uma página personalizada para organizar e compartilhar os produtos que recomendam.

O sucesso do MVP não depende da quantidade de funcionalidades, mas da capacidade de responder às seguintes perguntas:

- Os criadores criam suas páginas?
- Eles cadastram produtos?
- Eles compartilham a página nas redes sociais?
- Os visitantes clicam nos produtos?

---

# Fluxo principal

O MVP deve resolver apenas este fluxo:

1. O criador cria uma conta.
2. Configura sua página.
3. Adiciona suas redes sociais.
4. Cadastra produtos.
5. Publica sua página.
6. Compartilha o link.
7. O visitante acessa a página.
8. O visitante clica em um produto.
9. O visitante é redirecionado para a loja.

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
- produtos.

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

## Página do criador

O visitante poderá visualizar:

- informações do criador;
- redes sociais;
- produto em destaque;
- lista de produtos.

Ao clicar em um produto, será redirecionado para o link afiliado.

---

## Dashboard

O painel será simples.

Mostrará apenas:

- link da página;
- quantidade de produtos;
- quantidade de visualizações;
- quantidade de cliques;
- botão para editar perfil;
- botão para adicionar produto.

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
- somente produtos ativos serão exibidos.

## Produto

- pertence a um único usuário;
- deve possuir nome e link;
- pode ser marcado como destaque;
- pode ser ocultado sem ser excluído.

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
- as páginas forem compartilhadas nas redes sociais;
- visitantes clicarem nos produtos;
- os criadores retornarem para atualizar suas vitrines.

---

# Escopo da primeira versão

A primeira versão deverá permitir que um criador:

- crie sua conta;
- personalize sua página;
- adicione redes sociais;
- cadastre produtos;
- publique sua vitrine.

E que um visitante:

- acesse essa página;
- visualize os produtos;
- clique em um produto;
- seja direcionado para a loja responsável pela venda.

Nada além disso é necessário para validar a ideia inicial.
