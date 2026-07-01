## ADDED Requirements

### Requirement: PostgreSQL em Docker
O banco de dados PostgreSQL SHALL ser executado em um container Docker com volume persistente para dados.

#### Scenario: Container PostgreSQL iniciado
- **WHEN** `docker-compose up` é executado
- **THEN** um container PostgreSQL 15.18-alpine3.23 está rodando e acessível em `localhost:5432`

#### Scenario: Volume persistente configurado
- **WHEN** dados são inseridos no banco de dados
- **THEN** os dados persistem após reiniciar o container

### Requirement: Configuração de Entity Framework Core
O EF Core SHALL ser configurado como ORM principal para acesso a dados com suporte a migrations automáticas.

#### Scenario: Migrations aplicadas automaticamente
- **WHEN** a API inicia
- **THEN** todas as migrations pendentes são aplicadas automaticamente ao banco de dados

#### Scenario: DbContext configurado
- **WHEN** um serviço requer acesso a dados
- **THEN** um `DbContext` é injetado via DI com string de conexão do PostgreSQL

### Requirement: Schema do banco de dados
O banco de dados SHALL conter tabela para armazenar transações de compra com campos: id, descrição, data, valor.

#### Scenario: Tabela PurchaseTransaction criada
- **WHEN** a primeira migration é aplicada
- **THEN** a tabela `purchase_transactions` existe com colunas: `id`, `description`, `transaction_date`, `amount_usd`
