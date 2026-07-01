# Bolão 2026

Um projeto fullstack para gerenciar palpites da Copa do Mundo de 2026.

## Tecnologias

- **Backend**: .NET 10, Entity Framework Core, PostgreSQL
- **Frontend**: React, TypeScript, Tailwind CSS
- **Infraestrutura**: Docker, Docker Compose
- **Testes**: xUnit

## Início Rápido

### Pré-requisitos

- .NET 10 SDK
- Docker e Docker Compose

### Setup

1. **Clone o repositório**

```bash
git clone <url>
cd bolao2026
```

2. **Configure variáveis de ambiente**

```bash
cp .env.example .env
# Editar .env com credenciais conforme necessário
```

3. **Inicie o banco de dados**

```bash
docker-compose up -d
```

4. **Execute a API**

```bash
cd src/backend
dotnet run --project Bolao.Api/Bolao.Api.csproj
```

A API estará disponível em `http://localhost:5000`

## Estrutura do Projeto

```
bolao2026/
├── src/
│   ├── backend/              # Backend em .NET
│   │   ├── Bolao.Api/        # Entry point (ASP.NET Core Web API)
│   │   ├── Bolao.Application/ # Lógica de negócio
│   │   ├── Bolao.Domain/     # Entidades de domínio
│   │   ├── Bolao.Infrastructure/ # Acesso a dados, EF Core
│   │   └── Bolao.slnx        # Solução .NET
│   └── frontend/             # Frontend em React (futuro)
├── tests/                    # Testes automatizados
├── database/
│   └── bolao/                # Volume persistente PostgreSQL
├── docker-compose.yml        # Orquestração de serviços
├── .env.example              # Template de variáveis de ambiente
└── PERSISTENCE.md            # Guia de persistência e banco de dados
```

## Banco de Dados

Para mais detalhes sobre configuração de persistência, volumes Docker e migrations, consulte [PERSISTENCE.md](./PERSISTENCE.md).

### Criar uma Migration

```bash
cd src/backend
dotnet ef migrations add NomeMigration --project Bolao.Infrastructure --startup-project Bolao.Api
```

### Aplicar Migrations

Migrations são aplicadas automaticamente no startup da API.

## Testes

```bash
cd src/backend
dotnet test
```

## Desenvolvimento

### Estrutura Clean Architecture

O projeto segue Clean Architecture com as seguintes camadas:

- **Domain**: Entidades e lógica de negócio pura (sem dependências externas)
- **Application**: Serviços de aplicação, DTOs, regras de negócio
- **Infrastructure**: Implementação de dados, EF Core, integrações externas
- **API**: Controladores REST, middleware, configuração

### Padrões

- Async/await em operações I/O
- Injeção de dependência nativa do ASP.NET
- Entity Framework Core com migrations versionadas
- SOLID principles

## Parar Serviços

```bash
docker-compose down
```

## Documentação Adicional

- [PERSISTENCE.md](./PERSISTENCE.md) - Guia de banco de dados e volumes
- [CLAUDE.md](./CLAUDE.md) - Especificações técnicas do projeto

## Licença

MIT
