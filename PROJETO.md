# Guia Geral do Projeto

## Visão Geral

Este guia serve para algumas tarefas, como padrões de pastas, tipos de nomes entre outros.

## Global Usings

-   Todo projeto .NET que for criado, na raiz do projeto, deverá ser criado uma classe chamada GlobalUsing, onde conterá todas as referências de bibliotecas do projeto, precedido com a palavra global.
E consequentemente limpar todas as classes para não haver referências duplicadas.
-   Quando criar um projeto novo, remova o arquivo Class1.cs.

---

Exemplo:

global using System.Text;

---

## Projeto Infrastructure

Quando houver um projeto para execução de persistência, para organização dos arquivos deverá respeitar a seguinte estrutura:

---
<projeto>.Infrastructure
|_Data/ - Arquivo do DbContext (Quando for utilizado o EF Core)
|_Config/ - Referente ModelBuilder para cada Entidade
|_Migrations/ - Quando utilizar EF Core
|_Seeds/ - Quando utilizar EF Core e houver Seed
|_Repositories/ - Implementação da Interface de Persistência

---

Caso haja mais de um serviço para Camada de Infrastrusture, como por exemplo de um consumo de API Externa ou outro Banco de Dados, deverá seguir o seguinte esquema

<projeto>.Infrastrucuture.<ApiExterna>
|_Servicos/
<projeto>.Infrastructure
|_Data/ - Arquivo do DbContext (Quando for utilizado o EF Core)
|_Config/ - Referente ModelBuilder para cada Entidade
|_Migrations/ - Quando utilizar EF Core
|_Seeds/ - Quando utilizar EF Core e houver Seed
|_Repositories/ - Implementação da Interface de Persistência

---

## Projeto IoC

Seguindo o padrão do Clean Architecture, crie também o projeto IoC para poder implementar as Extensões de cada projeto através da inversão de dependência.

