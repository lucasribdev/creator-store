# Roadmap

## Objetivo

Este documento define a ordem recomendada para construcao e validacao da Creator Store.

Como o projeto sera desenvolvido por uma unica pessoa, o roadmap prioriza:

- escopo reduzido;
- entregas pequenas;
- validacao antecipada;
- baixo custo de manutencao;
- evolucao baseada em uso real;
- evitar funcionalidades prematuras.

O roadmap nao representa datas fixas. Cada fase deve ser concluida antes do inicio da proxima.

---

# Principios

## Construir sobre PageItem desde o inicio

`PageItem` deve ser a base dos conteudos clicaveis da pagina publica.

Produtos sao um tipo importante de `PageItem`, mas nao sao foco obrigatorio da Creator Store nem entidade publica isolada.

Links manuais sao outro tipo importante de `PageItem` e devem usar a mesma base de ordenacao, ativacao, destaque, redirecionamento e metricas.

A pagina publica deve funcionar com:

- apenas produtos;
- apenas links;
- produtos e links juntos.

## Sequencia incremental

A implementacao deve evoluir nesta ordem:

1. alinhar documentacao e registrar decisoes;
2. criar schema `PageItem` e `ItemClick`;
3. criar gestao unificada de itens;
4. implementar produtos como `PageItem.type = product`;
5. implementar links manuais como `PageItem.type = link`;
6. publicar pagina publica com itens ativos;
7. exibir dashboard com contagem de itens, produtos, links, visualizacoes e cliques;
8. adicionar analytics basico por item;
9. avaliar imagens para links no futuro;
10. avaliar video no futuro;
11. avaliar analytics avancado no futuro.

Essa ordem evita implementar um CRUD definitivo de `Product` isolado para depois migrar imediatamente para um modelo unificado.

## Fluxo principal

A prioridade e permitir que:

1. o criador crie sua conta;
2. configure sua pagina;
3. cadastre produtos e links manuais;
4. publique sua pagina;
5. compartilhe o link;
6. o visitante acesse a pagina;
7. o visitante clique em um item;
8. seja redirecionado para uma pagina externa.

Funcionalidades que nao contribuam diretamente para esse fluxo devem ser adiadas.

## Entregar versoes utilizaveis

Cada etapa deve terminar com uma versao funcional do produto.

Mesmo que ainda incompleta, a aplicacao deve continuar utilizavel e testavel.

## Validar antes de expandir

Novas funcionalidades devem ser adicionadas apenas quando:

- corrigirem um problema observado;
- forem solicitadas por usuarios;
- ajudarem a validar uma hipotese importante;
- aumentarem o uso ou a retencao;
- reduzirem uma dificuldade recorrente.

## Evitar complexidade antecipada

Nao devem ser construidos antecipadamente:

- categorias;
- temas avancados;
- integracoes externas;
- planos pagos;
- dominios proprios;
- imagens para links;
- video;
- analytics avancado;
- automacoes;
- recursos sociais.

---

# Fase 0 - Documentacao e decisao PageItem

## Objetivo

Preparar o projeto para iniciar a implementacao real com a decisao de que produtos e links sao tipos de `PageItem`.

## Entregas

- documentacao inicial;
- visao do produto;
- escopo do MVP;
- fluxos do usuario;
- modelo de dados;
- decisoes iniciais registradas;
- roadmap alinhado com `PageItem`;
- plano de implementacao alinhado com milestones e issues.

## Decisao esperada

Antes de implementar CRUD real de produto, a documentacao deve deixar claro que:

- produtos sao `PageItem.type = product`;
- links manuais sao `PageItem.type = link`;
- a pagina publica renderiza uma lista unificada de itens ativos;
- cliques de produtos e links usam `ItemClick`;
- a pagina publica funciona mesmo sem produtos, se houver links ativos;
- funcionalidades futuras, como imagens para links e video, devem evoluir a partir de `PageItem`.

## Criterio de conclusao

A fase sera concluida quando for possivel responder claramente:

- qual problema o produto resolve;
- quem e o publico inicial;
- o que entra no MVP;
- o que nao sera construido;
- quais sao os fluxos principais;
- por que `PageItem` e a entidade base;
- qual sera a primeira entrega funcional.

---

# Fase 1 - Prototipo navegavel com itens

## Objetivo

Validar a estrutura das paginas e o fluxo do produto antes de implementar todas as regras reais.

## Escopo

Criar uma versao navegavel utilizando dados ficticios.

## Paginas

### Publicas

- pagina inicial;
- login;
- cadastro;
- pagina publica do criador;
- pagina nao encontrada.

### Area privada

- dashboard;
- edicao de perfil;
- lista de itens;
- cadastro de produto;
- cadastro de link manual;
- edicao de item.

## Dados simulados

O prototipo devera exibir:

- perfil de um criador ficticio;
- redes sociais;
- produtos;
- links manuais;
- item em destaque;
- pagina publicada;
- metricas basicas ficticias.

## O que validar

- clareza da proposta;
- organizacao da pagina publica;
- experiencia em celular;
- facilidade para encontrar itens;
- clareza dos botoes;
- fluxo entre dashboard e pagina publica;
- quantidade de informacoes solicitadas para produto e link;
- comportamento com apenas produtos, apenas links e ambos.

## Fora desta fase

- autenticacao real;
- banco de dados;
- upload real de imagens;
- persistencia;
- metricas reais;
- redirecionamento com registro de clique.

## Criterio de conclusao

O prototipo deve permitir simular o fluxo:

```text
Criar conta
    ->
Configurar perfil
    ->
Adicionar produto ou link
    ->
Visualizar pagina publica
    ->
Clicar no item
```

---

# Fase 2 - Fundacao da aplicacao

## Objetivo

Criar a base funcional da aplicacao.

## Escopo

- configuracao do projeto;
- estrutura de paginas;
- navegacao;
- autenticacao;
- banco de dados;
- controle de acesso;
- tratamento basico de erros.

## Funcionalidades

### Autenticacao

- criar conta;
- fazer login;
- sair;
- recuperar senha;
- proteger paginas privadas.

### Conta

- relacionar usuario autenticado ao perfil;
- impedir acesso aos dados de outros usuarios;
- manter sessao ativa.

### Estrutura inicial de dados

Implementar:

- usuario;
- perfil;
- base para loaders e mutations;
- validacao de ambiente.

Produtos, links manuais, redes sociais e metricas devem ser adicionados nas fases seguintes.

## Criterio de conclusao

Um usuario deve conseguir:

1. criar uma conta;
2. fazer login;
3. acessar o dashboard;
4. sair;
5. retornar e acessar novamente seus proprios dados.

---

# Fase 3 - Schema PageItem e ItemClick

## Objetivo

Implementar a base de dados para os conteudos clicaveis da pagina publica.

## Entidades

### PageItem

Representa um item clicavel da pagina publica.

Campos iniciais:

- perfil;
- tipo (`product` ou `link`);
- titulo;
- URL externa;
- descricao opcional;
- texto de botao opcional;
- posicao;
- ativo;
- destaque;
- campos opcionais de produto, como imagem, preco e preco anterior.

### ItemClick

Representa um clique em um `PageItem`.

Campos iniciais:

- perfil;
- item;
- tipo do item no momento do clique;
- data;
- origem opcional;
- identificador anonimo opcional.

## Regras

- `PageItem` pertence a um perfil;
- `PageItem.type` define o comportamento e os campos usados;
- apenas itens ativos aparecem publicamente;
- todos os itens clicaveis da lista principal devem ser ordenados juntos;
- no maximo um item pode estar em destaque por perfil;
- `ItemClick` deve apontar para o item clicado;
- falhas futuras no registro de clique nao devem impedir redirecionamento.

## Fora desta fase

- telas completas de CRUD;
- upload real de imagens;
- analytics visivel no dashboard;
- pagina publica final.

## Criterio de conclusao

O banco deve permitir salvar produtos e links manuais como `PageItem` e registrar cliques por item sem exigir uma entidade `Product` isolada.

---

# Fase 4 - Perfil do criador

## Objetivo

Permitir que o usuario configure sua identidade publica.

## Funcionalidades

- escolher username;
- definir nome de exibicao;
- escrever biografia;
- adicionar foto de perfil;
- adicionar banner, caso seja mantido no MVP;
- editar as informacoes;
- visualizar previa da pagina.

## Regras

- username unico;
- username valido;
- nomes reservados bloqueados;
- tamanho maximo para biografia;
- validacao de imagens;
- cada usuario pode editar apenas o proprio perfil.

## Estados da pagina

- perfil incompleto;
- perfil configurado;
- pagina publicada;
- pagina despublicada.

## Criterio de conclusao

O usuario deve conseguir configurar o perfil e visualizar uma pagina publica, mesmo que ainda nao tenha itens.

---

# Fase 5 - Gestao unificada de PageItem

## Objetivo

Implementar a base comum para gerenciar itens da pagina sem tratar produtos como fundacao exclusiva.

## Funcionalidades

- listar itens;
- criar item com tipo;
- editar campos comuns;
- ativar item;
- desativar item;
- remover item;
- ordenar itens;
- marcar item como destaque.

## Regras

- produtos e links usam a mesma lista de `PageItem`;
- ordenacao e destaque sao unificados;
- apenas um item pode estar em destaque;
- itens inativos continuam editaveis no painel;
- validacoes especificas ficam nos tipos `product` e `link`.

## Criterio de conclusao

O painel deve permitir gerenciar a lista de itens como uma colecao unica, mesmo antes de completar todos os campos especificos de produto e link.

---

# Fase 6 - Produtos como tipo product de PageItem

## Objetivo

Implementar produtos recomendados usando `PageItem.type = product`.

## Funcionalidades

- cadastrar produto;
- editar produto;
- adicionar link externo;
- adicionar imagem;
- adicionar preco opcional;
- adicionar descricao opcional;
- adicionar texto de botao opcional;
- usar ativacao, ordenacao e destaque da gestao unificada.

## Dados minimos do produto

- titulo;
- link externo.

## Dados opcionais

- imagem;
- descricao;
- preco;
- preco anterior;
- moeda;
- texto do botao;
- destaque.

## Regras

- produto e um `PageItem` com `type = product`;
- produto pertence a um perfil;
- preco e apenas informativo;
- a plataforma nao garante precos ou disponibilidade;
- produto desativado permanece salvo no painel;
- produto ativo aparece publicamente quando o perfil esta publicado.

## Criterio de conclusao

O criador deve conseguir cadastrar um produto como `PageItem` e visualiza-lo em uma previa ou pagina publica inicial.

---

# Fase 7 - Links manuais como tipo link de PageItem

## Objetivo

Permitir que o criador adicione links comuns usando `PageItem.type = link`.

## Funcionalidades

- cadastrar link manual;
- editar link manual;
- adicionar URL externa;
- adicionar descricao opcional;
- adicionar texto de botao opcional;
- usar ativacao, ordenacao e destaque da gestao unificada.

## Dados minimos do link manual

- titulo;
- URL externa.

## Regras

- link manual e um `PageItem` com `type = link`;
- link manual pertence a um perfil;
- apenas links ativos aparecem publicamente;
- links manuais nao substituem redes sociais;
- links manuais nao devem usar campos de preco;
- links manuais nao precisam de imagem no MVP;
- o destino externo deve ser valido.

## Criterio de conclusao

O criador deve conseguir cadastrar um link manual como `PageItem` e ordena-lo junto aos demais itens.

---

# Fase 8 - Redes sociais

## Objetivo

Permitir que o criador reuna sua presenca digital no topo da pagina.

## Tipos iniciais

- Instagram;
- TikTok;
- YouTube;
- WhatsApp;
- site;
- link personalizado.

## Funcionalidades

- adicionar link;
- editar link;
- remover link;
- ativar ou desativar;
- ordenar links;
- abrir links na pagina publica.

## Criterio de conclusao

O criador deve conseguir cadastrar suas redes e o visitante deve conseguir acessa-las pela pagina publica.

Links manuais comuns nao devem ser cadastrados como `SocialLink`; eles pertencem a lista de `PageItem`.

---

# Fase 9 - Pagina publica com itens ativos

## Objetivo

Disponibilizar a pagina publica para visitantes usando uma lista unificada de `PageItem`.

## Conteudo da pagina

- foto de perfil;
- banner, caso utilizado;
- nome;
- biografia;
- redes sociais, caso ja implementadas;
- item em destaque;
- lista unificada de itens ativos, incluindo produtos e links manuais;
- botoes de acesso externo.

## Requisitos

- acesso sem login;
- URL baseada no username;
- prioridade para dispositivos moveis;
- carregamento rapido;
- somente conteudo ativo;
- ordenacao unica para produtos e links manuais;
- tratamento para pagina inexistente;
- tratamento para pagina despublicada;
- SEO basico;
- metadados de compartilhamento.

## Fluxo do visitante

```text
Acessa a URL
    ->
Visualiza o criador
    ->
Encontra um item
    ->
Clica no botao
    ->
E direcionado para o destino externo
```

## Criterio de conclusao

Um visitante deve conseguir acessar uma pagina publicada e abrir corretamente o destino externo de qualquer item ativo.

---

# Fase 10 - Publicacao e dashboard minimo

## Objetivo

Dar controle ao criador sobre a disponibilidade da pagina e oferecer acesso rapido as principais informacoes.

## Funcionalidades

- publicar pagina;
- despublicar pagina;
- visualizar status;
- abrir pagina publica;
- copiar link;
- usar compartilhamento nativo quando disponivel.

## Conteudo do dashboard

- status da pagina;
- link publico;
- quantidade de itens ativos;
- quantidade total de itens;
- quantidade de produtos ativos;
- quantidade de links manuais ativos;
- total de visualizacoes;
- total de cliques;
- botao para editar perfil;
- botao para adicionar produto;
- botao para adicionar link manual;
- botao para gerenciar itens;
- botao para visualizar pagina;
- botao para copiar link.

## Regras de publicacao

A publicacao podera exigir:

- username valido;
- nome de exibicao.

## Fora desta fase

- graficos;
- filtros por periodo;
- taxa de conversao;
- origem detalhada;
- localizacao;
- dispositivos;
- exportacao de dados.

## Criterio de conclusao

O criador deve conseguir publicar, compartilhar e despublicar sua pagina sem perder os dados cadastrados, e entender rapidamente quantos itens, produtos, links, visualizacoes e cliques possui.

---

# Fase 11 - Analytics basico por item

## Objetivo

Medir se as paginas sao acessadas e quais itens geram interesse.

## Eventos iniciais

- visualizacao de pagina;
- clique em item.

## Dados necessarios

### Visualizacao

- perfil;
- data;
- identificador anonimo opcional;
- origem opcional.

### Clique

- perfil;
- item;
- tipo do item;
- data;
- identificador anonimo opcional;
- origem opcional.

## Regras

- o clique deve ser registrado antes do redirecionamento;
- falhas no registro nao devem impedir o visitante de abrir o link;
- nao coletar informacoes pessoais desnecessarias;
- nao implementar rastreamento avancado no MVP.

## Criterio de conclusao

A plataforma deve conseguir informar:

- numero total de visualizacoes;
- numero total de cliques;
- cliques por item;
- cliques por tipo de item.

---

# Fase 12 - Testes internos

## Objetivo

Garantir que o fluxo principal funcione do inicio ao fim.

## Cenarios obrigatorios

### Conta

- criar conta;
- fazer login;
- recuperar senha;
- sair;
- acessar rota privada sem autenticacao.

### Perfil

- escolher username;
- tentar usar username ja existente;
- editar perfil;
- publicar pagina incompleta;
- publicar pagina valida.

### Itens

- adicionar produto;
- adicionar link manual;
- editar produto;
- editar link manual;
- desativar item;
- excluir item;
- cadastrar URL invalida;
- trocar item em destaque;
- reordenar produtos e links juntos.

### Pagina publica

- acessar pagina publicada;
- acessar pagina despublicada;
- acessar pagina inexistente;
- visualizar somente itens ativos;
- clicar em produto;
- clicar em link manual;
- abrir rede social.

### Permissoes

- usuario nao pode editar perfil de outro;
- usuario nao pode editar item de outro;
- visitante nao pode acessar dados privados.

## Dispositivos

Testar pelo menos em:

- celular;
- computador;
- tela pequena;
- conexao movel simulada.

## Criterio de conclusao

O fluxo principal deve funcionar sem erros bloqueadores.

---

# Fase 13 - Validacao com primeiros usuarios

## Objetivo

Descobrir se o produto resolve um problema real.

## Publico inicial

Buscar entre 5 e 10 criadores ou afiliados.

Nao e necessario abrir o produto para muitas pessoas no inicio.

## Atividades

- ajudar os primeiros usuarios a criar suas paginas;
- observar onde eles tem dificuldade;
- analisar quais campos nao entendem;
- verificar quantos produtos cadastram;
- verificar quantos links manuais cadastram;
- verificar se usam apenas produtos, apenas links ou produtos e links juntos;
- verificar se compartilham a pagina;
- coletar feedback;
- corrigir problemas criticos.

## Perguntas para os usuarios

- Como voce organiza seus links atualmente?
- Foi facil criar a pagina?
- Foi facil cadastrar um produto?
- Foi facil cadastrar um link manual?
- Voce usaria essa pagina no link da bio?
- O que faltou para voce publicar?
- O que pareceu desnecessario?
- Voce conseguiu encontrar os itens facilmente?
- Voce voltaria para atualizar sua pagina?

## Metricas iniciais

- contas criadas;
- perfis concluidos;
- itens cadastrados;
- produtos cadastrados;
- links manuais cadastrados;
- paginas publicadas;
- paginas compartilhadas;
- visualizacoes;
- cliques;
- retorno dos criadores.

## Criterio de conclusao

A fase sera concluida quando houver feedback suficiente para decidir entre:

- continuar com o produto;
- ajustar o fluxo;
- alterar o posicionamento;
- reduzir ainda mais o escopo;
- adicionar uma funcionalidade necessaria.

---

# Fase 14 - Lancamento inicial

## Objetivo

Disponibilizar a primeira versao publica para um grupo maior.

## Requisitos minimos

- fluxo principal estavel;
- paginas publicas funcionando;
- autenticacao funcionando;
- permissoes revisadas;
- erros principais tratados;
- experiencia mobile adequada;
- politica de privacidade;
- termos de uso;
- aviso sobre links externos;
- canal de suporte ou contato;
- monitoramento basico de erros.

## Criterio de conclusao

Usuarios devem conseguir utilizar o produto sem acompanhamento direto do desenvolvedor.

---

# Evolucoes apos validacao

As proximas funcionalidades nao possuem ordem fixa.

Elas devem ser priorizadas de acordo com dados e feedback.

## Organizacao de itens

Possiveis funcionalidades:

- categorias;
- colecoes;
- busca;
- filtros;
- multiplos itens em destaque;
- itens relacionados;
- secoes personalizadas.

Adicionar somente quando os usuarios tiverem dificuldade para organizar muitos itens.

## Personalizacao

Possiveis funcionalidades:

- cores;
- fontes;
- temas;
- layouts;
- imagem de fundo;
- dominio proprio.

Adicionar caso a personalizacao seja importante para adocao ou monetizacao.

## Integracoes

Possiveis funcionalidades:

- importacao por URL;
- integracao com marketplaces;
- atualizacao automatica de informacoes;
- verificacao de links;
- atualizacao de disponibilidade;
- importacao em lote.

Adicionar apenas quando o cadastro manual se tornar uma barreira relevante.

## Imagens para links

Possiveis funcionalidades:

- imagem opcional para links manuais;
- thumbnails geradas a partir da URL;
- imagem importada de metadados externos;
- fallback visual por tipo de link.

Adicionar somente se links manuais se tornarem relevantes o suficiente para justificar tratamento visual proprio.

## Video

Possiveis funcionalidades:

- item de video incorporado;
- link para video externo;
- thumbnail de video;
- destaque para conteudo em video.

Adicionar somente apos validar que videos melhoram a conversao ou a clareza da pagina publica.

## Analytics avancado

Possiveis funcionalidades:

- cliques por periodo;
- visualizacoes por periodo;
- itens mais acessados;
- origem de trafego;
- taxa de cliques;
- funil por item;
- dispositivo;
- geografia aproximada;
- comparacao entre periodos;
- desempenho por posicao na pagina;
- exportacao;
- relatorios exportaveis.

Adicionar caso os criadores utilizem as metricas basicas para tomar decisoes.

## Monetizacao

Possiveis funcionalidades:

- plano gratuito;
- plano pago;
- limites de itens;
- temas premium;
- dominio proprio;
- analytics avancado;
- remocao de marca;
- recursos para equipes.

A monetizacao deve ser planejada somente apos observar uso recorrente.

---

# Funcionalidades que permanecem fora do produto

O produto continuara sendo uma pagina publica de links externos.

Nao serao adicionados:

- carrinho;
- checkout;
- pagamentos;
- pedidos;
- controle de estoque;
- calculo de frete;
- entrega;
- emissao de notas;
- devolucoes;
- marketplace proprio;
- rede social.

A compra, inscricao, cadastro, contato, download, contratacao ou qualquer outra acao final sempre acontecera fora da plataforma.

---

# Ordem resumida

```text
0. Documentacao e decisao PageItem
1. Prototipo navegavel com itens
2. Fundacao da aplicacao
3. Schema PageItem e ItemClick
4. Perfil do criador
5. Gestao unificada de PageItem
6. Produtos como tipo product de PageItem
7. Links manuais como tipo link de PageItem
8. Redes sociais
9. Pagina publica com itens ativos
10. Publicacao e dashboard minimo
11. Analytics basico por item
12. Testes internos
13. Validacao com usuarios
14. Lancamento inicial
```

---

# Primeira entrega funcional

A primeira entrega que realmente valida a base tecnica deve permitir:

1. criar uma conta;
2. fazer login;
3. configurar nome e username;
4. cadastrar um produto ou link manual como `PageItem`;
5. cadastrar outro item de qualquer tipo permitido;
6. acessar a pagina publica;
7. clicar em um item;
8. ser direcionado para o link externo.

Nesta primeira entrega ainda nao sao obrigatorios:

- banner;
- redes sociais;
- ordenacao avancada;
- metricas visiveis;
- recuperacao de senha;
- compartilhamento nativo;
- imagens para links;
- video.

---

# Proximo passo imediato

Com a documentacao alinhada, o proximo passo e implementar a migracao do modelo atual para `PageItem` e `ItemClick`.

A primeira frente tecnica deve ser:

1. atualizar schema Drizzle de `products` para `page_items`;
2. atualizar schema Drizzle de `product_clicks` para `item_clicks`;
3. preservar `PageView`;
4. manter `SocialLink` separado;
5. criar validacoes de tipo `product` e `link`;
6. preparar a lista unificada de itens para as proximas telas.
