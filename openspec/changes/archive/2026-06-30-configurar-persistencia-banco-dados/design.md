## Context

O projeto Bolão 2026 iniciou com estrutura base de Clean Architecture. Agora necessita de configuração de persistência de dados. A decisão de organizar volumes Docker por projeto em subpastas de `database/` permite crescimento escalável: quando novos projetos/bancos forem adicionados (Redis cache, API de analytics), cada um terá sua pasta separada, facilitando backup, versionamento e manutenção independente.

## Goals / Non-Goals

**Goals:**
- Estabelecer padrão de organização de volumes Docker por projeto em `database/<project>/`
- Configurar PostgreSQL 15.18-alpine3.23 em container Docker com volume persistente
- Integrar Entity Framework Core na camada Infrastructure com DbContext base
- Documentar padrão para uso por futuras aplicações

**Non-Goals:**
- Implementação de migrations de entidades de negócio (será feito em fase posterior)
- Configuração de Redis (será feito quando necessário)
- Autenticação ou autorização no banco de dados
- Replicação ou failover em produção

## Decisions

### Organização de Volumes Docker por Projeto

**Decisão**: Criar estrutura `database/<project>/` onde cada projeto/aplicação tem sua própria pasta

**Rationale**: 
- Escalabilidade: novos bancos/caches podem ser adicionados sem conflitos
- Clareza: volumes separados indicam contextos de domínio diferentes
- Manutenção: backup e migrações são independentes por projeto

**Alternativas Consideradas**:
- Volume único `database/` para todos os dados (menos escalável, dificulta crescimento)
- Volume dentro de `src/<project>/database` (acopla código com dados, viola separação de concerns)

### PostgreSQL em Docker Compose

**Decisão**: Serviço PostgreSQL em container separado com volume persistente em `database/bolao/`

**Rationale**: 
- Desenvolvimento local idêntico a produção
- Portabilidade: projeto roda igual em qualquer máquina com Docker
- Versionamento: PostgreSQL 15.18-alpine3.23 fixado garante consistência

**Alternativas Consideradas**:
- Database local (inconsistência com produção)
- Banco em nuvem (custo, latência, dependência de internet)

### Entity Framework Core Configuration

**Decisão**: DbContext na camada Infrastructure com string de conexão via variáveis de ambiente

**Rationale**:
- Integração nativa com ASP.NET
- Migrations automáticas no startup
- Facilita testes com diferentes bancos

**Alternativas Consideradas**:
- Dapper (mais controle, menos abstração)
- Raw SQL (sem versionamento de schema)

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Volume Docker compartilhado entre máquinas poderia causar conflitos | Usar volumes com nomes únicos por projeto (`bolao-db-volume`); documentar |
| Performance de migrations automáticas em cada startup | Cache de migrations; considerar modo manual para produção |
| Crescimento descontrolado de dados no volume | Políticas de backup e limpeza documentadas no README |
| Novos devs confusos com padrão de múltiplos bancos | Documentação clara em CONTRIBUTING.md com exemplos |

## Migration Plan

1. Criar estrutura `database/bolao/` com `.gitkeep`
2. Configurar `docker-compose.yml` com serviço PostgreSQL
3. Criar arquivo `.env` com credenciais de banco (git-ignored)
4. Instalar packages EF Core (Microsoft.EntityFrameworkCore, Npgsql)
5. Criar classe `ApplicationDbContext` em Infrastructure
6. Registrar DbContext no Program.cs com string de conexão
7. Criar migration inicial (vazia, apenas estrutura)
8. Documentar padrão para próximos projetos

## Open Questions

- Será necessário Redis como cache em fase 1 ou apenas fase 2?
- Logging centralizado (Serilog) deve ser configurado agora ou depois?
- Backups automáticos de desenvolvimento serão necessários?
