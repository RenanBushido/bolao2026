## Why

O projeto Bolão 2026 necessita de uma configuração de persistência robusta e escalável para suportar múltiplos bancos de dados. Estabelecer um padrão de organização de volumes Docker, onde cada projeto/banco de dados tem sua própria pasta, permite crescimento futuro sem conflitos de volumes e facilita gerenciamento de dados separados por contexto de domínio.

## What Changes

- Estrutura de pastas dentro de `database/` organizada por projeto/banco de dados
- Configuração de Docker Compose com PostgreSQL para o banco do Bolão 2026
- Integração do Entity Framework Core com a string de conexão PostgreSQL
- Arquivo `.gitignore` configurado para volume de dados
- Padrão estabelecido para futuras aplicações (Redis, outros bancos)

## Capabilities

### New Capabilities
- `database-structure`: Organização de volumes Docker separados por projeto em `database/<project>/`
- `postgres-configuration`: Configuração de serviço PostgreSQL em Docker com volume persistente
- `efcore-migration`: Configuração do Entity Framework Core para migrations automáticas no startup

### Modified Capabilities
<!-- Nenhuma capacidade existente será modificada nesta fase -->

## Impact

- **Estrutura de Pastas**: Nova organização em `database/bolao/` para o banco principal
- **Docker Compose**: Atualização do `docker-compose.yml` com serviço PostgreSQL
- **Entity Framework Core**: Configuração de DbContext e migrations no projeto Infrastructure
- **Connection Strings**: Variáveis de ambiente configuradas para PostgreSQL em Docker
- **Dependências**: Microsoft.EntityFrameworkCore, Npgsql.EntityFrameworkCore.PostgreSQL
