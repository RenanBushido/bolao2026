## 1. Estrutura de Pastas e Configuração

- [x] 1.1 Criar pasta `database/bolao/` e adicionar `.gitkeep`
- [x] 1.2 Criar arquivo `.env.example` na raiz com template de variáveis (git-tracked)
- [x] 1.3 Criar arquivo `.env` na raiz com credenciais de desenvolvimento (git-ignored)
- [x] 1.4 Atualizar `.gitignore` para excluir `database/bolao/*` (exceto .gitkeep) e arquivo `.env`

## 2. Docker e Configuração de Banco de Dados

- [x] 2.1 Criar `docker-compose.yml` na raiz com serviços PostgreSQL e API
- [x] 2.2 Configurar serviço PostgreSQL com imagem `postgres:15.18-alpine3.23`
- [x] 2.3 Mapear volume `database/bolao/` para `/var/lib/postgresql/data` no container
- [x] 2.4 Configurar variáveis de ambiente `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- [x] 2.5 Validar que `docker-compose up` inicia PostgreSQL sem erros

## 3. Entity Framework Core no Infrastructure

- [x] 3.1 Instalar packages NuGet no projeto `Bolao.Infrastructure`:
  - [x] 3.1.1 Microsoft.EntityFrameworkCore
  - [x] 3.1.2 Npgsql.EntityFrameworkCore.PostgreSQL
- [x] 3.2 Criar classe `ApplicationDbContext` em `Infrastructure/Context/ApplicationDbContext.cs`
- [x] 3.3 Registrar `ApplicationDbContext` no `Program.cs` da API com string de conexão PostgreSQL
- [x] 3.4 Validar compilação: `dotnet build` sem erros

## 4. Migrations e Documentação

- [x] 4.1 Criar migration inicial: `dotnet ef migrations add InitialCreate`
- [x] 4.2 Verificar que migration está em `Infrastructure/Migrations/`
- [x] 4.3 Configurar aplicação para executar migrations no startup automaticamente
- [x] 4.4 Criar documentação em `PERSISTENCE.md` explicando padrão para novos bancos de dados
- [x] 4.5 Adicionar seção no `README.md` com instrução de `docker-compose up`
