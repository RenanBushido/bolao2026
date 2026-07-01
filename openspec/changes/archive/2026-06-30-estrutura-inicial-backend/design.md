## Context

O projeto Bolão 2026 necessita de uma estrutura de backend escalável e mantível. Seguindo os princípios de Clean Architecture definidos no CLAUDE.md, a solução será organizada em camadas bem separadas, permitindo evolução independente de cada componente. A estrutura será implementada em .NET 10 com PostgreSQL como banco de dados principal.

## Goals / Non-Goals

**Goals:**
- Estabelecer estrutura de projetos seguindo Clean Architecture (Domain, Application, Infrastructure, Presentation)
- Configurar Docker com PostgreSQL e volume persistente
- Implementar injeção de dependência nativa do ASP.NET
- Criar framework base de testes unitários com xUnit
- Documentar estrutura para facilitar onboarding de novos desenvolvedores
- Usar async/await em todo o código assíncrono

**Non-Goals:**
- Implementação de endpoints da API (será feito em fase posterior)
- Autenticação e autorização (será implementado no próximo incremento)
- Frontend (fora do escopo desta fase)
- Cache com Redis (configuração básica apenas)

## Decisions

### Estrutura de Projetos em Camadas
- **Decisão**: Organizar em `Domain`, `Application`, `Infrastructure`, `API`
- **Rationale**: Separação clara de responsabilidades, facilita testes e manutenção
- **Alternativas Consideradas**: Camadas únicas (menos flexibilidade), Microserviços (complexidade prematura)

### Uso de Solution File .slnx
- **Decisão**: Usar extensão `.slnx` conforme especificado no CLAUDE.md
- **Rationale**: Novo formato do .NET, melhor para monorepo
- **Alternativas Consideradas**: `.sln` tradicional (compatibilidade com ferramentas antigas)

### Entity Framework Core com Migrations
- **Decisão**: Usar EF Core para acesso a dados com migration automática
- **Rationale**: Integração nativa com ASP.NET, versionamento de schema automático
- **Alternativas Consideradas**: Dapper (mais controle, menos abstração), Raw SQL (sem versionamento)

### Docker Compose para Orquestração
- **Decisão**: Um container para API e um para PostgreSQL
- **Rationale**: Desenvolvimento local consistente com produção, fácil setup
- **Alternativas Consideradas**: Local database (inconsistência com prod), Kubernetes (prematura)

### xUnit para Testes
- **Decisão**: Usar xUnit como framework de testes
- **Rationale**: Moderno, integrado com .NET, suporta fixtures e parametrização
- **Alternativas Consideradas**: NUnit (mais antigo), MSTest (amarrado à Microsoft)

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| Estrutura inicial pesada para funcionalidade simples | Começar com exemplo prático de transação; remover conforme necessário |
| Migração de dados em produção futura | Usar EF Migrations versionadas desde o início |
| Performance de async/await sem necessidade | Benchmarks ao adicionar features; otimizar se necessário |
| Complexidade da Clean Architecture pode desestimular novo dev | Documentação clara, exemplos de cada camada |

## Migration Plan

1. Criar estrutura de pastas: `src/backend/`, `tests/`, `database/`
2. Gerar projetos .NET 10 base
3. Configurar solução `.slnx` com referências de projetos
4. Setup PostgreSQL em Docker
5. Configurar EF Core e primeira migration
6. Implementar DI container base
7. Criar exemplo funcional de repositório e serviço
8. Implementar testes unitários para exemplo
9. Documentar estrutura e padrões

## Open Questions

- Quais serão os primeiros endpoints a implementar? (Para orientar exemplo inicial)
- Necessário cache Redis na fase 1 ou apenas na fase 2?
- Logging centralizado (Serilog) na estrutura base ou later?
- CI/CD será GitHub Actions ou outra ferramente?
