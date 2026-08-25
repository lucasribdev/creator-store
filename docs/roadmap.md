# Roadmap

## Objetivo

Este documento define a ordem recomendada para construção e validação do produto.

Como o projeto será desenvolvido por uma única pessoa, o roadmap prioriza:

- escopo reduzido;
- entregas pequenas;
- validação antecipada;
- baixo custo de manutenção;
- evolução baseada em uso real;
- evitar funcionalidades prematuras.

O roadmap não representa datas fixas. Cada fase deve ser concluída antes do início da próxima.

---

# Princípios

## Sequência incremental

A implementação deve evoluir nesta ordem:

1. atualizar documentação e registrar decisões;
2. criar schema `PageItem` e `ItemClick`;
3. implementar produtos como primeiro tipo de `PageItem`;
4. implementar links manuais como segundo tipo de `PageItem`;
5. unificar a página pública em torno da lista de itens;
6. adicionar analytics básico por item;
7. avaliar imagens para links no futuro;
8. avaliar vídeo no futuro;
9. avaliar analytics avançado no futuro.

Essa ordem evita implementar um CRUD real de `Product` isolado para depois migrar imediatamente para um modelo unificado.

## Construir sobre PageItem desde o início

`PageItem` deve ser a base dos conteúdos clicáveis da vitrine.

Produtos continuam sendo o foco principal da Creator Store, mas devem ser implementados como o primeiro tipo de `PageItem`, não como uma entidade pública isolada.

Links manuais entram depois como o segundo tipo de `PageItem`, complementando a vitrine sem transformar o produto em uma página genérica de links.

## Construir o fluxo principal primeiro

A prioridade é permitir que:

1. o criador crie sua conta;
2. configure sua página;
3. cadastre produtos e links manuais;
4. publique sua vitrine;
5. compartilhe o link;
6. o visitante acesse a página;
7. o visitante clique em um item;
8. seja redirecionado para uma página externa.

Funcionalidades que não contribuam diretamente para esse fluxo devem ser adiadas.

## Entregar versões utilizáveis

Cada etapa deve terminar com uma versão funcional do produto.

Mesmo que ainda incompleta, a aplicação deve continuar utilizável e testável.

## Validar antes de expandir

Novas funcionalidades devem ser adicionadas apenas quando:

- corrigirem um problema observado;
- forem solicitadas por usuários;
- ajudarem a validar uma hipótese importante;
- aumentarem o uso ou a retenção;
- reduzirem uma dificuldade recorrente.

## Evitar complexidade antecipada

Não devem ser construídos antecipadamente:

- categorias;
- temas avançados;
- integrações externas;
- planos pagos;
- domínios próprios;
- analytics avançado;
- automações;
- recursos sociais.

---

# Fase 0 — Preparação

## Objetivo

Preparar o projeto para o início da implementação.

## Entregas

- repositório criado;
- documentação inicial;
- visão do produto;
- escopo do MVP;
- fluxos do usuário;
- modelo de dados;
- decisões iniciais registradas;
- estrutura básica do projeto;
- ambiente local funcionando.

## Documentos esperados

```text
docs/
├── vision.md
├── mvp.md
├── user-flows.md
├── data-model.md
├── tech-stack.md
├── roadmap.md
└── decisions.md
```

## Critério de conclusão

A fase será concluída quando for possível responder claramente:

- qual problema o produto resolve;
- quem é o público inicial;
- o que entra no MVP;
- o que não será construído;
- quais são os fluxos principais;
- quais dados serão necessários;
- qual será a primeira entrega funcional.

---

# Fase 1 — Protótipo navegável

## Objetivo

Validar a estrutura das páginas e o fluxo do produto antes de implementar todas as regras reais.

## Escopo

Criar uma versão navegável utilizando dados fictícios.

## Páginas

### Públicas

- página inicial;
- login;
- cadastro;
- página pública do criador;
- página não encontrada.

### Área privada

- dashboard;
- edição de perfil;
- lista de produtos;
- cadastro de produto;
- edição de produto.

## Dados simulados

O protótipo deverá exibir:

- perfil de um criador fictício;
- redes sociais;
- produtos;
- links manuais;
- produto em destaque;
- página publicada;
- métricas básicas fictícias.

## O que validar

- clareza da proposta;
- organização da página pública;
- experiência em celular;
- facilidade para encontrar produtos;
- clareza dos botões;
- fluxo entre dashboard e página pública;
- quantidade de informações solicitadas no cadastro de produto.

## Fora desta fase

- autenticação real;
- banco de dados;
- upload real de imagens;
- persistência;
- métricas reais;
- redirecionamento com registro de clique.

## Critério de conclusão

O protótipo deve permitir simular o fluxo:

```text
Criar conta
    ↓
Configurar perfil
    ↓
Adicionar produto ou link
    ↓
Visualizar página pública
    ↓
Clicar no item
```

---

# Fase 2 — Fundação da aplicação e decisão PageItem

## Objetivo

Criar a base funcional da aplicação e registrar a decisão de modelar conteúdos clicáveis como `PageItem` desde o início.

## Escopo

- configuração do projeto;
- estrutura de páginas;
- navegação;
- autenticação;
- banco de dados;
- controle de acesso;
- tratamento básico de erros;
- alinhamento da documentação com `PageItem` e `ItemClick`.

## Funcionalidades

### Autenticação

- criar conta;
- fazer login;
- sair;
- recuperar senha;
- proteger páginas privadas.

### Conta

- relacionar usuário autenticado ao perfil;
- impedir acesso aos dados de outros usuários;
- manter sessão ativa.

### Estrutura inicial de dados

Implementar:

- usuário;
- perfil;
- base para item da página.

Produtos, links manuais, redes sociais e métricas podem ser adicionados nas fases seguintes.

## Decisão de produto e arquitetura

Antes de implementar CRUD real de produto, a documentação deve deixar claro que:

- produtos são o primeiro tipo de `PageItem`;
- links manuais são o segundo tipo de `PageItem`;
- a página pública renderiza uma lista unificada de itens ativos;
- cliques de produtos e links manuais usam a mesma base de métricas por item;
- funcionalidades futuras, como imagens para links e vídeo, devem evoluir a partir de `PageItem`.

## Critério de conclusão

Um usuário deve conseguir:

1. criar uma conta;
2. fazer login;
3. acessar o dashboard;
4. sair;
5. retornar e acessar novamente seus próprios dados.

A documentação também deve estar consistente com a decisão de não criar um CRUD real de `Product` isolado antes de introduzir `PageItem`.

---

# Fase 3 — Perfil do criador

## Objetivo

Permitir que o usuário configure sua identidade pública.

## Funcionalidades

- escolher username;
- definir nome de exibição;
- escrever biografia;
- adicionar foto de perfil;
- adicionar banner, caso seja mantido no MVP;
- editar as informações;
- visualizar prévia da página.

## Regras

- username único;
- username válido;
- nomes reservados bloqueados;
- tamanho máximo para biografia;
- validação de imagens;
- cada usuário pode editar apenas o próprio perfil.

## Estados da página

- perfil incompleto;
- perfil configurado;
- página publicada;
- página despublicada.

## Critério de conclusão

O usuário deve conseguir configurar o perfil e visualizar uma página pública, mesmo que ainda não tenha produtos.

---

# Fase 4 — Schema PageItem e ItemClick

## Objetivo

Implementar a base de dados para os conteúdos clicáveis da página pública.

## Entidades

### PageItem

Representa um item clicável da vitrine pública.

Campos iniciais:

- perfil;
- tipo (`product` ou `link`);
- título;
- URL externa;
- descrição opcional;
- texto de botão opcional;
- posição;
- ativo;
- destaque;
- campos opcionais de produto, como preço e preço anterior;
- campos de imagem de produto, quando aplicável.

### ItemClick

Representa um clique em um `PageItem`.

Campos iniciais:

- perfil;
- item;
- tipo do item no momento do clique;
- data;
- origem opcional;
- identificador anônimo opcional.

## Regras

- `PageItem` pertence a um perfil;
- `PageItem.type` define o comportamento e os campos usados;
- apenas itens ativos aparecem publicamente;
- todos os itens clicáveis da lista principal devem ser ordenados juntos;
- `ItemClick` deve apontar para o item clicado;
- falhas futuras no registro de clique não devem impedir redirecionamento.

## Fora desta fase

- telas completas de CRUD;
- upload real de imagens;
- analytics visível no dashboard;
- página pública final.

## Critério de conclusão

O banco deve permitir salvar itens de página e cliques por item sem exigir uma migração imediata de `Product` isolado.

---

# Fase 5 — Produtos como primeiro tipo de PageItem

## Objetivo

Implementar produtos recomendados como a principal funcionalidade do produto, usando `PageItem` com `type = product`.

## Funcionalidades

- listar itens do tipo produto;
- cadastrar produto;
- editar produto;
- excluir produto;
- ativar produto;
- desativar produto;
- marcar produto como destaque;
- ordenar produtos dentro da lista de itens;
- adicionar link externo;
- adicionar imagem;
- adicionar preço opcional;
- adicionar descrição opcional.

## Dados mínimos do produto

- nome;
- link externo.

## Dados opcionais

- imagem;
- descrição;
- preço;
- preço anterior;
- texto do botão;
- destaque.

## Regras

- produto é um `PageItem` com `type = product`;
- produto pertence a um perfil;
- apenas itens ativos do tipo `product` aparecem publicamente como produtos;
- no máximo um item em destaque por página, com prioridade para produtos;
- link externo deve ser válido;
- a plataforma não garante preços ou disponibilidade;
- produto desativado permanece salvo no painel.

## Critério de conclusão

O criador deve conseguir cadastrar um produto como `PageItem` e visualizá-lo em uma prévia ou página pública inicial.

---

# Fase 6 — Links manuais como segundo tipo de PageItem

## Objetivo

Permitir que o criador adicione links comuns que complementam a vitrine, usando `PageItem` com `type = link`.

## Funcionalidades

- listar links manuais;
- cadastrar link manual;
- editar link manual;
- excluir link manual;
- ativar link manual;
- desativar link manual;
- adicionar URL externa;
- adicionar descrição opcional;
- adicionar texto de botão opcional.

## Dados mínimos do link manual

- título;
- URL externa.

## Regras

- link manual é um `PageItem` com `type = link`;
- link manual pertence a um perfil;
- apenas links ativos aparecem publicamente;
- links manuais não substituem redes sociais;
- links manuais não devem usar campos de preço;
- links manuais não precisam de imagem no MVP;
- o destino externo deve ser válido.

## Critério de conclusão

O criador deve conseguir cadastrar um link manual como `PageItem` e ordená-lo junto aos produtos.

---

# Fase 7 — Página pública unificada

## Objetivo

Disponibilizar a vitrine para visitantes usando uma lista unificada de `PageItem`.

## Conteúdo da página

- foto de perfil;
- banner, caso utilizado;
- nome;
- biografia;
- redes sociais, caso já implementadas;
- produto em destaque;
- lista unificada de itens ativos, incluindo produtos e links manuais;
- botões de acesso externo.

## Requisitos

- acesso sem login;
- URL baseada no username;
- prioridade para dispositivos móveis;
- carregamento rápido;
- somente conteúdo ativo;
- ordenação única para produtos e links manuais;
- tratamento para página inexistente;
- tratamento para página despublicada;
- SEO básico;
- metadados de compartilhamento.

## Fluxo do visitante

```text
Acessa a URL
    ↓
Visualiza o criador
    ↓
Encontra um item
    ↓
Clica no botão
    ↓
É direcionado para o destino externo
```

## Critério de conclusão

Um visitante deve conseguir acessar uma página publicada e abrir corretamente o destino externo de um item.

---

# Fase 8 — Publicação e compartilhamento

## Objetivo

Dar controle ao criador sobre a disponibilidade da página.

## Funcionalidades

- publicar página;
- despublicar página;
- visualizar status;
- abrir página pública;
- copiar link;
- usar compartilhamento nativo quando disponível.

## Regras de publicação

A publicação poderá exigir:

- username válido;
- nome de exibição.

## Critério de conclusão

O criador deve conseguir publicar, compartilhar e despublicar sua página sem perder os dados cadastrados.

---

# Fase 9 — Redes sociais

## Objetivo

Permitir que o criador reúna sua presença digital no topo da página.

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
- abrir links na página pública.

## Critério de conclusão

O criador deve conseguir cadastrar suas redes e o visitante deve conseguir acessá-las pela página pública.

Links manuais comuns não devem ser cadastrados como `SocialLink`; eles pertencem à lista de `PageItem`.

---

# Fase 10 — Analytics básico por item

## Objetivo

Medir se as páginas são acessadas e quais itens geram interesse.

## Eventos iniciais

- visualização de página;
- clique em item.

## Dados necessários

### Visualização

- perfil;
- data;
- identificador anônimo opcional;
- origem opcional.

### Clique

- perfil;
- item;
- tipo do item;
- data;
- identificador anônimo opcional;
- origem opcional.

## Regras

- o clique deve ser registrado antes do redirecionamento;
- falhas no registro não devem impedir o visitante de abrir o link;
- não coletar informações pessoais desnecessárias;
- não implementar rastreamento avançado no MVP.

## Critério de conclusão

A plataforma deve conseguir informar:

- número total de visualizações;
- número total de cliques;
- cliques por item;
- cliques por tipo de item.

---

# Fase 11 — Dashboard mínimo

## Objetivo

Oferecer ao criador acesso rápido às principais informações e ações.

## Conteúdo

- status da página;
- link público;
- quantidade de produtos ativos;
- quantidade de links manuais ativos;
- total de visualizações;
- total de cliques;
- botão para editar perfil;
- botão para adicionar produto;
- botão para adicionar link manual;
- botão para gerenciar produtos;
- botão para visualizar página;
- botão para copiar link.

## Fora desta fase

- gráficos;
- filtros por período;
- taxa de conversão;
- origem detalhada;
- localização;
- dispositivos;
- exportação de dados.

## Critério de conclusão

O criador deve conseguir entender rapidamente o estado da página e acessar as ações principais.

---

# Fase 12 — Testes internos

## Objetivo

Garantir que o fluxo principal funcione do início ao fim.

## Cenários obrigatórios

### Conta

- criar conta;
- fazer login;
- recuperar senha;
- sair;
- acessar rota privada sem autenticação.

### Perfil

- escolher username;
- tentar usar username já existente;
- editar perfil;
- publicar página incompleta;
- publicar página válida.

### Produtos

- adicionar produto;
- editar produto;
- desativar produto;
- excluir produto;
- cadastrar link inválido;
- trocar produto em destaque;
- reordenar produtos.

### Links manuais

- adicionar link manual;
- editar link manual;
- desativar link manual;
- excluir link manual;
- cadastrar URL inválida;
- reordenar links junto aos produtos.

### Página pública

- acessar página publicada;
- acessar página despublicada;
- acessar página inexistente;
- visualizar somente itens ativos;
- clicar em produto;
- clicar em link manual;
- abrir rede social.

### Permissões

- usuário não pode editar perfil de outro;
- usuário não pode editar produto de outro;
- usuário não pode editar link manual de outro;
- visitante não pode acessar dados privados.

## Dispositivos

Testar pelo menos em:

- celular;
- computador;
- tela pequena;
- conexão móvel simulada.

## Critério de conclusão

O fluxo principal deve funcionar sem erros bloqueadores.

---

# Fase 13 — Validação com primeiros usuários

## Objetivo

Descobrir se o produto resolve um problema real.

## Público inicial

Buscar entre 5 e 10 criadores ou afiliados.

Não é necessário abrir o produto para muitas pessoas no início.

## Atividades

- ajudar os primeiros usuários a criar suas páginas;
- observar onde eles têm dificuldade;
- analisar quais campos não entendem;
- verificar quantos produtos cadastram;
- verificar se links manuais complementam ou atrapalham a vitrine;
- verificar se compartilham a página;
- coletar feedback;
- corrigir problemas críticos.

## Perguntas para os usuários

- Como você organiza seus links atualmente?
- Foi fácil criar a página?
- Foi fácil cadastrar um produto?
- Foi fácil cadastrar um link manual?
- Você usaria essa página no link da bio?
- O que faltou para você publicar?
- O que pareceu desnecessário?
- Você conseguiu encontrar os produtos facilmente?
- Você voltaria para atualizar sua página?

## Métricas iniciais

- contas criadas;
- perfis concluídos;
- produtos cadastrados;
- links manuais cadastrados;
- páginas publicadas;
- páginas compartilhadas;
- visualizações;
- cliques;
- retorno dos criadores.

## Critério de conclusão

A fase será concluída quando houver feedback suficiente para decidir entre:

- continuar com o produto;
- ajustar o fluxo;
- alterar o posicionamento;
- reduzir ainda mais o escopo;
- adicionar uma funcionalidade necessária.

---

# Fase 14 — Lançamento inicial

## Objetivo

Disponibilizar a primeira versão pública para um grupo maior.

## Requisitos mínimos

- fluxo principal estável;
- páginas públicas funcionando;
- autenticação funcionando;
- permissões revisadas;
- erros principais tratados;
- experiência mobile adequada;
- política de privacidade;
- termos de uso;
- aviso sobre links externos;
- canal de suporte ou contato;
- monitoramento básico de erros.

## Critério de conclusão

Usuários devem conseguir utilizar o produto sem acompanhamento direto do desenvolvedor.

---

# Evoluções após validação

As próximas funcionalidades não possuem ordem fixa.

Elas devem ser priorizadas de acordo com dados e feedback.

## Organização de produtos

Possíveis funcionalidades:

- categorias;
- coleções;
- busca;
- filtros;
- múltiplos produtos em destaque;
- produtos relacionados;
- seções personalizadas.

Adicionar somente quando os usuários tiverem dificuldade para organizar muitos produtos.

## Personalização

Possíveis funcionalidades:

- cores;
- fontes;
- temas;
- layouts;
- imagem de fundo;
- domínio próprio.

Adicionar caso a personalização seja importante para adoção ou monetização.

## Integrações

Possíveis funcionalidades:

- importação por URL;
- integração com marketplaces;
- atualização automática de informações;
- verificação de links;
- atualização de disponibilidade;
- importação em lote.

Adicionar apenas quando o cadastro manual se tornar uma barreira relevante.

## Analytics

Possíveis funcionalidades:

- cliques por período;
- visualizações por período;
- produtos mais acessados;
- origem de tráfego;
- taxa de cliques;
- exportação;
- comparação de desempenho.

Adicionar caso os criadores utilizem as métricas para tomar decisões.

## Imagens para links

Possíveis funcionalidades:

- imagem opcional para links manuais;
- thumbnails geradas a partir da URL;
- imagem importada de metadados externos;
- fallback visual por tipo de link.

Adicionar somente se links manuais se tornarem relevantes o suficiente para justificar tratamento visual próprio.

## Vídeo

Possíveis funcionalidades:

- item de vídeo incorporado;
- link para vídeo externo;
- thumbnail de vídeo;
- destaque para conteúdo em vídeo.

Adicionar somente após validar que vídeos melhoram a conversão ou a clareza da vitrine.

## Analytics avançado

Possíveis funcionalidades:

- funil por item;
- origem detalhada;
- dispositivo;
- geografia aproximada;
- comparação entre períodos;
- desempenho por posição na página;
- relatórios exportáveis.

Adicionar apenas quando os criadores já estiverem usando métricas básicas para tomar decisões.

## Monetização

Possíveis funcionalidades:

- plano gratuito;
- plano pago;
- limites de produtos;
- temas premium;
- domínio próprio;
- analytics avançado;
- remoção de marca;
- recursos para equipes.

A monetização deve ser planejada somente após observar uso recorrente.

---

# Funcionalidades que permanecem fora do produto

O produto continuará sendo uma vitrine de links externos.

Não serão adicionados:

- carrinho;
- checkout;
- pagamentos;
- pedidos;
- controle de estoque;
- cálculo de frete;
- entrega;
- emissão de notas;
- devoluções;
- marketplace próprio.

A compra sempre acontecerá fora da plataforma.

---

# Ordem resumida

```text
0. Preparação e documentação
1. Protótipo navegável
2. Autenticação, fundação e decisão PageItem
3. Perfil do criador
4. Schema PageItem e ItemClick
5. Produtos como primeiro tipo de PageItem
6. Links manuais como segundo tipo de PageItem
7. Página pública unificada
8. Publicação e compartilhamento
9. Redes sociais
10. Analytics básico por item
11. Dashboard mínimo
12. Testes internos
13. Validação com usuários
14. Lançamento inicial
```

---

# Primeira entrega funcional

A primeira entrega que realmente valida a base técnica deve permitir:

1. criar uma conta;
2. fazer login;
3. configurar nome e username;
4. cadastrar um produto;
5. cadastrar um link manual, caso necessário;
6. acessar a página pública;
7. clicar em um item;
8. ser direcionado para o link externo.

Nesta primeira entrega ainda não são obrigatórios:

- banner;
- redes sociais;
- ordenação;
- produto em destaque;
- métricas visíveis;
- recuperação de senha;
- compartilhamento nativo.

---

# Próximo passo imediato

Com a documentação inicial pronta, o próximo passo é construir o protótipo navegável com dados fictícios.

A primeira página a ser desenhada deve ser a página pública do criador, pois ela representa o principal valor entregue pelo produto.

Depois, devem ser desenhadas:

1. lista de itens com produtos;
2. cadastro de produto como `PageItem`;
3. cadastro de link manual como `PageItem`;
4. edição de perfil;
5. dashboard;
6. login e cadastro.

Somente depois da validação desses fluxos deve começar a integração com autenticação, banco de dados, `PageItem`, `ItemClick` e armazenamento de imagens de produto.
