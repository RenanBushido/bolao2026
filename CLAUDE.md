## Bolao-2026

## Project

É um projeto Fullstack que contém informações sobre a Copa do Mundo de 2026 e um espaço para que o usuário autentique e faça seus palpites e participe de bolão da Copa do Mundo

---

## Tecnologias

-   .NET 10
-   EF Core
-   Docker
-   Postgres 15.18-alpine3.23
-   React
-   TailwindCSS
-   Typescript
-   Mediatr

---

## Arquitetura

A aplicação consistirá em um Frontend e um Backend. Todos eles serão executados no docker.

---

## Persistencia

O Projeto terá alguns bancos de dados de acordo com os microserviços construídos. Inicialmente serão usando o Postgres e o também o Redis como banco de dados Cache

---

## Guia para desenvolvimento

-   Usar async/await sempre que possível
-   Usar a injeção de dependência nativa do ASP.NET
-   Evitar duplicidade de código
-   Utilizar Clean Architecture como arquitetura de solução
-   Utilizar os princípio do SOLID para o desenvolvimento.

---

## Estrutura Fisica

O projeto será um monorepositório, ou seja, tanto os projetos frontend e backend estarão no mesmo local.
-   Os projetos de testes serão alocados na pasta raiz do projeto testes/
-   Os bancos de dados que serão usados, seu volume para persistência será apontada na pasta database/
-   Os projetos frontend serão criados na pasta src/frontend
-   Os projetos backend serão criados na pasta src/backend
-   Para a solução em .NET criar uma solução com a extensão .slnx

testes/
database/__nome_do_projeto_que_vai_utilizar_o_banco_de_dados/
src/
    |__backend
    |__frontend

