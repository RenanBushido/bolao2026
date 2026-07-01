# Guia de Persistência - Bolão 2026

## Visão Geral

O projeto Bolão 2026 utiliza um padrão de organização de volumes Docker por projeto/banco de dados, permitindo crescimento escalável e manutenção independente de diferentes contextos de domínio.

## Estrutura de Volumes Docker

```
database/
├── bolao/                    # Volume do banco principal
│   ├── .gitkeep             # Mantém pasta versionada no git
│   └── (dados PostgreSQL)   # Ignorado pelo .gitignore
└── (futuro: redis/, etc.)   # Padrão para novos bancos
```

## Configuração PostgreSQL

### Variáveis de Ambiente

O arquivo `.env` na raiz contém as credenciais do PostgreSQL (não versionado, use `.env.example`):

```env
POSTGRES_USER=bolao
POSTGRES_PASSWORD=dev123
POSTGRES_DB=bolao_db
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

### Iniciar o Banco de Dados

```bash
docker-compose up -d
```

O serviço PostgreSQL será iniciado e estará acessível em `localhost:5432`.

### Verificar Status

```bash
docker-compose ps
```

### Parar o Banco de Dados

```bash
docker-compose down
```

## Entity Framework Core

### Arquitetura

- **DbContext**: `Bolao.Infrastructure.Context.ApplicationDbContext`
- **Migrations**: `Bolao.Infrastructure.Migrations/`
- **DbContextFactory**: `Bolao.Infrastructure.Context.ApplicationDbContextFactory`

### Criar Nova Entidade

1. Criar classe de entidade em `Bolao.Domain/`
2. Adicionar DbSet na `ApplicationDbContext`
3. Criar migration: `dotnet ef migrations add NomeMigration`
4. Migrations são aplicadas automaticamente no startup

### Criar Nova Migration

```bash
dotnet ef migrations add NomeMigration --project Bolao.Infrastructure --startup-project Bolao.Api
```

### Reverter Migration

```bash
dotnet ef migrations remove
```

## Padrão para Novos Bancos de Dados

Quando adicionar um novo banco de dados (Redis cache, API de analytics, etc.):

1. **Criar pasta**: `database/<nome-projeto>/`
2. **Adicionar .gitkeep**: Para manter a pasta versionada
3. **Atualizar docker-compose.yml**: Novo serviço com volume mapeado
4. **Atualizar .gitignore**: Ignorar dados da nova pasta
5. **Criar DbContextFactory**: Se for SQL/EF Core

Exemplo para Redis:
```
database/
└── cache/
    └── .gitkeep
```

docker-compose.yml:
```yaml
services:
  cache:
    image: redis:latest
    volumes:
      - ./database/cache:/data
```

.gitignore:
```
database/cache/*
!database/cache/.gitkeep
```

## Troubleshooting

### Erro: "Connection refused"

Verificar se PostgreSQL está rodando:
```bash
docker-compose logs db
```

### Erro: "password authentication failed"

Verificar credenciais em `.env` correspondem às do banco.

### Erro: "Migration already exists"

Se houver conflito de migrações, remover a mais recente:
```bash
dotnet ef migrations remove --project Bolao.Infrastructure --startup-project Bolao.Api
```

## Limpeza de Dados

Para remover todos os dados do volume (cuidado!):

```bash
docker-compose down
rm -rf database/bolao/*
docker-compose up -d
```

## Backup de Dados

Para realizar backup do volume PostgreSQL:

```bash
docker exec bolao-postgres pg_dump -U bolao bolao_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

Restaurar:

```bash
docker exec -i bolao-postgres psql -U bolao bolao_db < backup_20260701_010044.sql
```
