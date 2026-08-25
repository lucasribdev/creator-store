# MVP

## Objetivo

Validar se criadores de conteúdo e afiliados utilizariam uma página personalizada para organizar e compartilhar recomendações, produtos, links importantes e destinos externos.

O sucesso do MVP não depende da quantidade de funcionalidades, mas da capacidade de responder às seguintes perguntas:

- Os criadores criam suas páginas?
- Eles cadastram produtos recomendados, links manuais ou ambos?
- Eles conseguem publicar uma página útil com apenas produtos, apenas links ou ambos?
- A página publicada sem itens ativos exibe um estado vazio adequado?
- Eles compartilham a página nas redes sociais?
- Os visitantes clicam nos itens publicados?

---

# Fluxo principal

O MVP deve resolver apenas este fluxo:

1. O criador cria uma conta.
2. Configura sua página.
3. Adiciona redes sociais, se quiser.
4. Cadastra produtos e/ou links manuais.
5. Publica sua página.
6. Compartilha o link.
7. O visitante acessa a página.
8. O visitante clica em um item.
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
- redes sociais opcionais;
- itens da página, incluindo produtos recomendados, links manuais ou ambos;
- estado vazio adequado quando o perfil estiver publicado sem itens ativos.

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

Redes sociais são opcionais e não bloqueiam a publicação da página.

---

## Produtos

Os produtos serão cadastrados manualmente como itens da página do tipo `product`.

Produtos são um dos formatos principais de conteúdo clicável, mas não são obrigatórios para que a Creator Store seja útil. Um criador pode publicar uma página sem produtos, usando apenas links manuais ou mesmo sem itens ativos.

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

Links manuais comuns poderão ser cadastrados para destinos externos importantes que não sejam produtos.

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
- URL externa;
- descrição curta (opcional);
- texto do botão (opcional);
- ativo (sim ou não).
- posição.

O usuário poderá:

- criar;
- editar;
- excluir;
- ativar/desativar;
- alterar a ordem de exibição junto aos produtos.

Links manuais são um tipo válido de item clicável. Um criador pode publicar apenas links manuais, apenas produtos ou misturar os dois na mesma lista.

Eles devem continuar simples no MVP e não devem criar funcionalidades de rede social, marketplace ou CMS genérico.

---

## Página do criador

O visitante poderá visualizar:

- informações do criador;
- redes sociais, quando cadastradas;
- item em destaque, quando existir;
- lista de itens ativos, contendo produtos recomendados, links manuais ou ambos;
- estado vazio adequado quando a página estiver publicada sem itens ativos.

Ao clicar em um item, o visitante será redirecionado para o destino externo cadastrado.

---

## Dashboard

O painel será simples.

Mostrará apenas:

- link da página;
- quantidade de itens;
- quantidade de produtos;
- quantidade de links manuais;
- quantidade de visualizações;
- quantidade de cliques;
- botão para editar perfil;
- botão para gerenciar itens;
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
- somente itens ativos serão exibidos;
- pode funcionar com apenas produtos, apenas links ou produtos e links juntos;
- pode ser publicada sem produtos, desde que tenha dados mínimos de perfil;
- pode ser publicada sem itens ativos, exibindo estado vazio adequado para visitantes;
- redes sociais são opcionais e não impedem publicação.

## Item da página

- pertence a um único perfil;
- deve possuir tipo `product` ou `link`;
- deve possuir título e link externo;
- pode ser ocultado sem ser excluído;
- deve ser ordenado em uma lista única de itens clicáveis;
- links sociais continuam separados e não fazem parte dessa lista;
- cliques devem ser registrados por item, independentemente do tipo.

## Produto como item

- pertence a um único perfil;
- deve possuir nome e link;
- pode ser marcado como destaque;
- pode ser ocultado sem ser excluído;
- não é obrigatório para publicar uma página útil.

## Link manual como item

- pertence a um único perfil;
- deve possuir título e URL externa;
- pode possuir descrição opcional;
- pode possuir texto do botão opcional;
- deve possuir posição;
- pode ser ativado ou desativado;
- não deve possuir comportamento de rede social;
- não deve criar funcionalidades sociais, comentários, feed ou marketplace;
- pode ser o único tipo de item ativo em uma página publicada.

## Limites permanentes

A Creator Store não será um e-commerce, loja virtual, marketplace ou rede social.

Não serão implementados:

- carrinho;
- checkout;
- pagamentos;
- pedidos;
- estoque;
- avaliações;
- comentários;
- feed social.

A compra, inscrição, cadastro ou qualquer outra ação final sempre acontecerá fora da plataforma.

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
- carrinho;
- checkout;
- pagamentos;
- pedidos;
- estoque;
- cupons;
- importação automática de produtos;
- importação automática de links;
- integração com marketplaces;
- atualização automática de preços;
- encurtador de links;
- árvore de links avançada com blocos customizados;
- CMS genérico para páginas;
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
- produtos, links manuais ou ambos forem cadastrados;
- páginas apenas com produtos forem úteis para visitantes;
- páginas apenas com links manuais forem úteis para visitantes;
- páginas com produtos e links manuais juntos forem úteis para visitantes;
- páginas publicadas sem itens ativos exibirem um estado vazio claro e adequado;
- as páginas forem compartilhadas nas redes sociais;
- visitantes clicarem nos itens publicados;
- os criadores retornarem para atualizar suas páginas.

---

# Escopo da primeira versão

A primeira versão deverá permitir que um criador:

- crie sua conta;
- personalize sua página;
- adicione redes sociais, se quiser;
- cadastre produtos e/ou links manuais;
- publique sua página.

E que um visitante:

- acesse essa página;
- visualize produtos e links manuais ativos;
- visualize um estado vazio adequado quando o perfil estiver publicado sem itens ativos;
- clique em um item;
- seja direcionado para o destino externo responsável.

Nada além disso é necessário para validar a ideia inicial.
