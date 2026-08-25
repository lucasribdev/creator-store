# User Flows

## Objetivo

Este documento descreve os principais fluxos de uso do MVP.

O foco está nas ações necessárias para que:

- um criador crie e publique sua página;
- um criador possa publicar apenas produtos, apenas links manuais ou uma combinação dos dois;
- um visitante encontre e acesse itens recomendados e destinos externos;
- a plataforma registre os principais eventos de uso.

Os fluxos devem permanecer simples, especialmente por se tratar de um projeto desenvolvido por uma única pessoa.

---

## Perfis de usuário

### Criador

Pessoa que cria uma página pública para divulgar:

- informações pessoais ou profissionais;
- redes sociais;
- links importantes;
- produtos recomendados;
- links afiliados ou externos.

### Visitante

Pessoa que acessa a página pública de um criador para:

- conhecer o perfil;
- acessar suas redes sociais;
- visualizar itens ativos;
- seguir links externos.

---

# Fluxos do criador

## 1. Criar conta

### Objetivo

Permitir que um novo criador tenha acesso à plataforma.

### Fluxo principal

1. O usuário acessa a página inicial.
2. Clica em `Criar conta`.
3. Informa os dados necessários.
4. Define uma senha.
5. Envia o formulário.
6. A plataforma cria a conta.
7. O usuário é autenticado.
8. O usuário é direcionado para a configuração inicial da página.

### Dados mínimos

- nome;
- e-mail;
- senha.

### Resultado esperado

O usuário possui uma conta e pode iniciar a criação de sua página.

### Possíveis erros

- e-mail já cadastrado;
- e-mail inválido;
- senha fora dos requisitos;
- erro ao criar a conta;
- falha de conexão.

---

## 2. Fazer login

### Objetivo

Permitir que um usuário existente acesse o painel.

### Fluxo principal

1. O usuário acessa a página de login.
2. Informa e-mail e senha.
3. Clica em `Entrar`.
4. A plataforma valida os dados.
5. O usuário é direcionado para o dashboard.

### Resultado esperado

O usuário autenticado acessa sua área privada.

### Possíveis erros

- e-mail ou senha inválidos;
- conta inexistente;
- erro de conexão;
- falha temporária no serviço de autenticação.

---

## 3. Recuperar senha

### Objetivo

Permitir que o usuário recupere o acesso à conta.

### Fluxo principal

1. O usuário acessa a página de login.
2. Clica em `Esqueci minha senha`.
3. Informa seu e-mail.
4. A plataforma envia as instruções de recuperação.
5. O usuário acessa o link recebido.
6. Define uma nova senha.
7. Retorna para a página de login.

### Resultado esperado

O usuário consegue criar uma nova senha e acessar sua conta.

---

## 4. Configurar página inicial

### Objetivo

Permitir que o criador crie a primeira versão de sua página pública.

### Fluxo principal

1. O usuário cria a conta ou acessa a configuração pelo dashboard.
2. Escolhe um nome de usuário.
3. Informa seu nome de exibição.
4. Adiciona uma biografia.
5. Adiciona uma foto de perfil, opcionalmente.
6. Salva as informações.
7. A plataforma cria a página.
8. O usuário visualiza uma prévia.

### Dados mínimos

- nome de usuário;
- nome de exibição.

### Dados opcionais

- foto de perfil;
- biografia;
- imagem de capa.

### Resultado esperado

O criador possui uma página pública configurada, ainda que sem itens.

### Possíveis erros

- nome de usuário indisponível;
- nome de usuário inválido;
- arquivo de imagem inválido;
- imagem muito grande;
- erro ao salvar.

---

## 5. Editar perfil

### Objetivo

Permitir que o criador altere as informações exibidas publicamente.

### Fluxo principal

1. O usuário acessa o dashboard.
2. Clica em `Editar perfil`.
3. Altera uma ou mais informações.
4. Clica em `Salvar`.
5. A plataforma atualiza os dados.
6. As alterações aparecem na página pública.

### Informações editáveis

- nome de exibição;
- nome de usuário;
- foto de perfil;
- imagem de capa;
- biografia.

### Resultado esperado

A página pública exibe os dados atualizados.

---

## 6. Adicionar rede social

### Objetivo

Permitir que o criador adicione links para suas redes sociais.

### Fluxo principal

1. O usuário acessa a seção de redes sociais.
2. Clica em `Adicionar link`.
3. Seleciona o tipo de rede.
4. Informa a URL.
5. Salva o link.
6. A plataforma adiciona o link à página pública.

### Tipos iniciais

- Instagram;
- TikTok;
- YouTube;
- WhatsApp;
- site;
- outro link.

### Resultado esperado

A rede social aparece na página pública do criador.

### Possíveis erros

- URL inválida;
- link duplicado;
- tipo não selecionado;
- erro ao salvar.

---

## 7. Editar rede social

### Objetivo

Permitir que o criador atualize um link já cadastrado.

### Fluxo principal

1. O usuário acessa a seção de redes sociais.
2. Seleciona um link.
3. Clica em `Editar`.
4. Altera o tipo ou a URL.
5. Salva as alterações.
6. A página pública é atualizada.

### Resultado esperado

O novo link substitui o anterior.

---

## 8. Remover rede social

### Objetivo

Permitir que o criador exclua um link que não deseja mais exibir.

### Fluxo principal

1. O usuário acessa a seção de redes sociais.
2. Seleciona um link.
3. Clica em `Remover`.
4. Confirma a ação.
5. A plataforma exclui o link.
6. O link deixa de aparecer na página pública.

### Resultado esperado

A rede social removida não é mais exibida.

---

## 9. Cadastrar produto como item publicável

### Objetivo

Permitir que o criador adicione um produto recomendado à página como um item publicável do tipo `product`.

### Fluxo principal

1. O usuário acessa a seção de produtos.
2. Clica em `Adicionar produto`.
3. Adiciona uma imagem.
4. Informa o nome do produto.
5. Adiciona uma descrição curta, opcionalmente.
6. Informa o preço, opcionalmente.
7. Informa o link afiliado ou externo.
8. Define o texto do botão, opcionalmente.
9. Escolhe se o produto ficará ativo.
10. Escolhe se o produto será destaque.
11. Salva o produto.
12. A plataforma adiciona o produto à lista principal da página como um item do tipo `product`.

### Dados obrigatórios

- nome;
- link externo.

### Dados opcionais

- imagem;
- descrição;
- preço;
- preço anterior;
- texto do botão;
- destaque.

### Resultado esperado

O produto aparece na página quando estiver ativo e a página estiver publicada.

### Possíveis erros

- link inválido;
- nome vazio;
- arquivo de imagem inválido;
- imagem muito grande;
- erro ao salvar.

---

## 10. Editar produto

### Objetivo

Permitir que o criador atualize um item publicável do tipo `product`.

### Fluxo principal

1. O usuário acessa a lista de produtos.
2. Seleciona um produto.
3. Clica em `Editar`.
4. Altera as informações desejadas.
5. Salva as alterações.
6. A plataforma atualiza o item do tipo `product`.
7. A página pública passa a exibir as novas informações quando o produto estiver ativo.

### Resultado esperado

O produto passa a exibir as novas informações.

---

## 11. Ativar ou desativar produto

### Objetivo

Permitir que o criador oculte temporariamente um item do tipo `product` sem excluí-lo.

### Fluxo principal

1. O usuário acessa a lista de produtos.
2. Localiza o produto.
3. Altera seu status.
4. A plataforma salva a alteração.

### Resultado esperado

- produto ativo: aparece na página pública;
- produto inativo: não aparece na página pública.

### Observação

Ativar ou desativar altera apenas a exibição pública do item. O produto continua salvo no painel.

---

## 12. Destacar produto

### Objetivo

Permitir que o criador dê mais visibilidade a um item do tipo `product`.

### Fluxo principal

1. O usuário acessa a lista de produtos.
2. Seleciona um produto.
3. Marca a opção `Produto em destaque`.
4. Salva a alteração.
5. O produto passa a aparecer em uma posição de maior destaque na página pública quando estiver ativo.

### Regra inicial

A primeira versão deve permitir apenas um item em destaque por página.

### Resultado esperado

O visitante visualiza o item destacado antes da lista principal.

---

## 13. Remover produto

### Objetivo

Permitir que o criador exclua um item publicável do tipo `product`.

### Fluxo principal

1. O usuário acessa a lista de produtos.
2. Seleciona o produto.
3. Clica em `Excluir`.
4. Confirma a ação.
5. A plataforma remove o item.
6. O produto deixa de aparecer na página pública.

### Resultado esperado

O produto é removido da página.

### Observação

Antes da exclusão definitiva, a interface deve sugerir a opção de desativar o produto.

---

## 14. Cadastrar link manual

### Objetivo

Permitir que o criador adicione à página um link comum que não seja produto nem rede social, como item publicável do tipo `link`.

### Fluxo principal

1. O usuário acessa a seção de itens ou links da página.
2. Clica em `Adicionar link`.
3. Informa o título.
4. Adiciona uma descrição curta, opcionalmente.
5. Informa a URL externa.
6. Define o texto do botão, opcionalmente.
7. Escolhe se o link ficará ativo.
8. Salva o link.
9. A plataforma adiciona o link à lista principal da página como um item do tipo `link`.

### Dados obrigatórios

- título;
- URL externa.

### Dados opcionais

- descrição;
- texto do botão.

### Resultado esperado

O link manual aparece na página pública quando estiver ativo e a página estiver publicada.

### Possíveis erros

- URL inválida;
- título vazio;
- erro ao salvar.

---

## 15. Editar link manual

### Objetivo

Permitir que o criador atualize um link manual já cadastrado.

### Fluxo principal

1. O usuário acessa a lista de itens ou links da página.
2. Seleciona um link manual.
3. Clica em `Editar`.
4. Altera as informações desejadas.
5. Salva as alterações.
6. A página pública é atualizada.

### Resultado esperado

O link manual passa a exibir as novas informações.

---

## 16. Ativar ou desativar link manual

### Objetivo

Permitir que o criador oculte temporariamente um link manual sem excluí-lo.

### Fluxo principal

1. O usuário acessa a lista de itens ou links da página.
2. Localiza o link manual.
3. Altera seu status.
4. A plataforma salva a alteração.

### Resultado esperado

- link ativo: aparece na página pública;
- link inativo: não aparece na página pública.

### Observação

Ativar ou desativar altera apenas a exibição pública do item. O link manual continua salvo no painel.

---

## 17. Remover link manual

### Objetivo

Permitir que o criador exclua um link manual da plataforma.

### Fluxo principal

1. O usuário acessa a lista de itens ou links da página.
2. Seleciona o link manual.
3. Clica em `Excluir`.
4. Confirma a ação.
5. A plataforma remove o link.
6. O link deixa de aparecer na página pública.

### Resultado esperado

O link manual é removido da página.

### Observação

Antes da exclusão definitiva, a interface deve sugerir a opção de desativar o link.

---

## 18. Ordenar itens da página

### Objetivo

Permitir que o criador defina a ordem conjunta de produtos e links manuais na área principal da página.

### Fluxo principal

1. O usuário acessa a lista de itens da página.
2. Move um item para cima ou para baixo.
3. A plataforma salva a nova ordem.
4. A página pública passa a utilizar essa ordenação.

### Implementação inicial recomendada

Na primeira versão, utilizar botões de:

- mover para cima;
- mover para baixo.

Arrastar e soltar não é necessário no primeiro corte.

### Observação

Produtos são itens do tipo `product`. Links manuais são itens do tipo `link`. A ordenação usa uma lista única de itens publicáveis.

### Cenários suportados

- página com apenas produtos;
- página com apenas links manuais;
- página com produtos e links manuais;
- página publicada sem itens ativos.

---

## 19. Publicar página

### Objetivo

Permitir que o criador torne sua página acessível ao público.

### Pré-condições

O criador deve possuir:

- nome de usuário;
- nome de exibição.

### Fluxo principal

1. O usuário acessa o dashboard.
2. Visualiza o status da página.
3. Clica em `Publicar página`.
4. A plataforma valida os dados mínimos.
5. A página é publicada.
6. O link público passa a funcionar.

### Resultado esperado

Qualquer visitante com o endereço pode acessar a página.

Produtos e links manuais são opcionais para publicação. A página pode ser publicada com os dados mínimos de perfil, mesmo sem itens ativos.

### Possíveis impedimentos

- perfil incompleto;
- nome de usuário inválido;
- erro ao publicar.

---

## 20. Despublicar página

### Objetivo

Permitir que o criador retire temporariamente sua página do ar.

### Fluxo principal

1. O usuário acessa o dashboard.
2. Clica em `Despublicar`.
3. Confirma a ação.
4. A plataforma altera o status da página.
5. A página deixa de ficar publicamente acessível.

### Resultado esperado

A página não aparece para visitantes, mas os dados permanecem salvos.

---

## 21. Visualizar prévia

### Objetivo

Permitir que o criador veja como sua página aparecerá para o visitante.

### Fluxo principal

1. O usuário acessa o dashboard.
2. Clica em `Visualizar página`.
3. A plataforma abre a prévia.
4. O usuário verifica as informações, redes sociais e itens.
5. Retorna ao painel para fazer ajustes, caso necessário.

### Resultado esperado

O criador consegue revisar a página antes ou depois da publicação.

---

## 22. Compartilhar página

### Objetivo

Permitir que o criador copie e divulgue o endereço público da página.

### Fluxo principal

1. O usuário acessa o dashboard.
2. Visualiza o endereço da página.
3. Clica em `Copiar link`.
4. A plataforma copia a URL.
5. O usuário compartilha o link em suas redes sociais.

### Resultado esperado

O criador consegue usar o endereço na bio, em stories, vídeos, mensagens ou publicações.

---

# Fluxos do visitante

## 23. Acessar página pública

### Objetivo

Permitir que qualquer pessoa visualize a página publicada de um criador.

### Fluxo principal

1. O visitante acessa a URL pública.
2. A plataforma localiza o nome de usuário.
3. Verifica se a página está publicada.
4. Registra uma visualização.
5. Exibe o perfil, redes sociais e itens ativos.

### Resultado esperado

O visitante consegue visualizar a página sem criar uma conta.

### Possíveis estados

- página publicada;
- página publicada sem itens ativos;
- página não encontrada;
- página despublicada;
- erro temporário.

### Estado sem itens ativos

Quando a página estiver publicada sem itens ativos, a plataforma deve exibir o perfil e as redes sociais disponíveis.

A área principal deve usar um estado vazio adequado, sem sugerir erro e sem impedir o acesso à página.

---

## 24. Acessar rede social

### Objetivo

Permitir que o visitante abra uma rede social ou link do criador.

### Fluxo principal

1. O visitante acessa a página pública.
2. Clica em um ícone ou link social.
3. A plataforma abre o endereço correspondente.

### Resultado esperado

O visitante é direcionado para o serviço externo.

---

## 25. Visualizar produto

### Objetivo

Permitir que o visitante conheça um item recomendado do tipo `product`.

### Fluxo principal

1. O visitante acessa a página pública.
2. Visualiza os itens ativos da página.
3. Localiza um produto de interesse.
4. Consulta nome, imagem, descrição e preço, quando disponíveis.

### Resultado esperado

O visitante entende o que está sendo recomendado antes de sair da plataforma.

---

## 26. Clicar em produto

### Objetivo

Direcionar o visitante para a loja ou página externa associada ao item do tipo `product`.

### Fluxo principal

1. O visitante acessa a página pública.
2. Seleciona um produto.
3. Clica no botão de acesso.
4. A plataforma registra o clique no item.
5. O visitante é redirecionado para o link cadastrado.

### Resultado esperado

O visitante chega ao destino externo correto.

### Possíveis erros

- link inválido;
- página externa indisponível;
- produto removido;
- falha no redirecionamento.

### Observação

A disponibilidade do produto e o funcionamento da loja externa não são responsabilidade da plataforma.

---

## 27. Visualizar link manual

### Objetivo

Permitir que o visitante entenda um link manual publicado pelo criador.

### Fluxo principal

1. O visitante acessa a página pública.
2. Visualiza os links manuais ativos na lista principal de itens.
3. Localiza um link de interesse.
4. Consulta título e descrição, quando disponível.

### Resultado esperado

O visitante entende o destino antes de sair da plataforma.

---

## 28. Clicar em link manual

### Objetivo

Direcionar o visitante para o destino externo associado ao item do tipo `link`.

### Fluxo principal

1. O visitante acessa a página pública.
2. Seleciona um link manual.
3. Clica no botão de acesso.
4. A plataforma registra o clique no item.
5. O visitante é redirecionado para o link cadastrado.

### Resultado esperado

O visitante chega ao destino externo correto.

### Possíveis erros

- link inválido;
- página externa indisponível;
- link removido;
- falha no redirecionamento.

### Observação

O funcionamento do destino externo não é responsabilidade da plataforma.

---

## 29. Registrar clique em item

### Objetivo

Registrar o interesse do visitante em um item publicável antes do redirecionamento externo.

### Fluxo principal

1. O visitante clica em um item ativo.
2. A plataforma identifica o perfil, o item e o tipo do item.
3. A plataforma cria um registro de clique.
4. A plataforma redireciona o visitante para a URL externa cadastrada.

### Dados mínimos

- perfil;
- item clicado;
- tipo do item no momento do clique;
- data e hora;
- identificador anônimo do visitante, quando disponível;
- origem informada pelo navegador, quando disponível.

### Resultado esperado

O clique é contabilizado para métricas básicas, sem exigir cadastro ou login do visitante.

### Regra importante

Se o registro do clique falhar, o visitante ainda deve ser redirecionado para o destino externo.

---

# Fluxos administrativos do MVP

## 30. Visualizar dashboard

### Objetivo

Apresentar ao criador um resumo simples da página.

### Fluxo principal

1. O usuário faz login.

2. Acessa o dashboard.

3. Visualiza:
   - status da página;
   - link público;
   - quantidade de itens;
   - quantidade de produtos, quando houver;
   - quantidade de links manuais, quando houver;
   - quantidade de visualizações;
   - quantidade de cliques.

4. Escolhe uma ação.

### Ações principais

- editar perfil;
- adicionar produto;
- adicionar link manual;
- gerenciar produtos;
- gerenciar links manuais;
- gerenciar redes sociais;
- visualizar página;
- copiar link.

---

## 31. Visualizar métricas básicas

### Objetivo

Permitir que o criador acompanhe o uso da página.

### Fluxo principal

1. O usuário acessa o dashboard.
2. A plataforma carrega as métricas.
3. Exibe números acumulados.

### Métricas iniciais

- visualizações da página;
- cliques totais nos itens;
- cliques por tipo de item, caso seja simples;
- quantidade de itens ativos;
- quantidade de produtos ativos;
- quantidade de links manuais ativos.

### Fora do fluxo inicial

Não serão exibidos:

- gráficos;
- períodos personalizados;
- origem de tráfego;
- localização;
- dispositivo;
- taxa de conversão;
- relatórios avançados.

---

# Fluxo principal resumido

```text
Criador cria conta
        ↓
Configura perfil
        ↓
Adiciona redes sociais
        ↓
Cadastra produtos, links manuais ou nenhum item
        ↓
Publica a página
        ↓
Compartilha o link
        ↓
Visitante acessa
        ↓
Visualiza itens ativos
        ↓
Clica em um item
        ↓
É redirecionado para um destino externo
```

---

# Fluxo mínimo para a primeira versão interna

Para a primeira versão funcional, os fluxos obrigatórios são:

1. Criar conta.
2. Fazer login.
3. Configurar perfil.
4. Publicar página.
5. Acessar página pública com ou sem itens ativos.
6. Cadastrar item, quando for testar fluxos com itens.
7. Editar item cadastrado.
8. Ativar ou desativar item.
9. Clicar em item.
10. Registrar clique.

Os fluxos de redes sociais, ordenação, destaque, banner e métricas visíveis podem ser adicionados depois que o fluxo principal estiver funcionando.

---

# Estados importantes da interface

## Estado vazio de produtos

Quando o criador ainda não possui produtos, o painel deve exibir:

- uma explicação curta;
- um botão para adicionar o primeiro produto.

A ausência de produtos não deve bloquear a publicação se houver links ativos ou se a página puder ser publicada apenas com os dados mínimos de perfil.

## Estado vazio de links manuais

Quando o criador ainda não possui links manuais, o painel deve permitir seguir sem adicionar nenhum link.

A ausência de links manuais não deve bloquear a publicação se houver produtos ativos ou se a página puder ser publicada apenas com os dados mínimos de perfil.

## Página sem item ativo

Quando a página estiver publicada sem itens ativos, visitantes devem visualizar as informações e redes sociais do criador.

A área principal deve aparecer vazia, oculta ou com uma mensagem simples, sem impedir o acesso à página.

## Produto sem imagem

A interface deve exibir uma imagem padrão ou uma apresentação sem imagem.

## Página despublicada

Visitantes não devem visualizar o conteúdo.

O criador autenticado ainda deve conseguir acessar a prévia.

## Erro de carregamento

A interface deve:

- informar que ocorreu um erro;
- permitir tentar novamente;
- preservar dados de formulários quando possível.

## Ação bem-sucedida

Após salvar uma alteração, a interface deve apresentar uma confirmação clara.

---

# Princípios de experiência

Os fluxos devem seguir estes princípios:

- priorizar o uso em celular;
- reduzir a quantidade de etapas;
- utilizar linguagem simples;
- informar claramente o resultado de cada ação;
- evitar formulários longos;
- deixar ações principais visíveis;
- não exigir configurações avançadas;
- permitir que o criador publique rapidamente;
- não interromper o visitante com cadastro ou login;
- deixar claro que itens levam para destinos externos.

---

# Critérios de aceite gerais

Os fluxos serão considerados funcionais quando:

- o usuário conseguir concluir a ação principal;
- os erros mais comuns forem tratados;
- ações privadas exigirem autenticação;
- um usuário não conseguir alterar dados de outro;
- a interface funcionar em celular e computador;
- dados salvos aparecerem corretamente na página pública;
- itens inativos não aparecerem para visitantes;
- cliques em itens levarem para o endereço correto;
- o fluxo principal puder ser testado do início ao fim.
