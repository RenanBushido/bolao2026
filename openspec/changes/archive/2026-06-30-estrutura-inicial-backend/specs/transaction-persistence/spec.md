## ADDED Requirements

### Requirement: Persistência de transações de compra
A aplicação SHALL armazenar transações de compra no banco de dados com informações de descrição, data e valor em USD.

#### Scenario: Transação armazenada com sucesso
- **WHEN** uma transação de compra é criada via API
- **THEN** a transação é salva no banco de dados com um UUID único gerado

#### Scenario: Dados da transação persistidos corretamente
- **WHEN** uma transação é consultada do banco
- **THEN** todos os campos (descrição, data, valor) são retornados intactos

### Requirement: Entidade PurchaseTransaction
A entidade `PurchaseTransaction` SHALL conter propriedades para id, descrição, data e valor em dólar.

#### Scenario: Entidade mapeada corretamente
- **WHEN** a entidade é mapeada para a tabela do banco
- **THEN** as colunas correspondem aos campos da entidade com tipos corretos (UUID, string, DateTime, decimal)

### Requirement: Repositório de transações
Um repositório SHALL fornecer métodos assíncronos para criar e recuperar transações.

#### Scenario: Método assíncrono para criar transação
- **WHEN** o repositório cria uma transação
- **THEN** retorna `Task<PurchaseTransaction>` com a transação criada

#### Scenario: Método assíncrono para recuperar por ID
- **WHEN** o repositório busca uma transação por ID
- **THEN** retorna `Task<PurchaseTransaction?>` com a transação ou null se não encontrada
