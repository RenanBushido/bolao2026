## ADDED Requirements

### Requirement: PostgreSQL em container Docker

O banco de dados PostgreSQL SHALL ser executado em um container Docker com versão específica e volume persistente.

#### Scenario: Container PostgreSQL com versão fixada

- **WHEN** `docker-compose up` é executado
- **THEN** um container PostgreSQL 15.18-alpine3.23 está rodando e acessível em `localhost:5432`

#### Scenario: Volume persistente para dados

- **WHEN** dados são inseridos no banco de dados
- **THEN** os dados são persistidos em `database/bolao/` e sobrevivem ao restart do container

#### Scenario: Credenciais configuráveis

- **WHEN** o container inicia
- **THEN** usa credenciais (usuário, senha, banco padrão) definidas em variáveis de ambiente via `.env`

### Requirement: Docker Compose configurado

O arquivo `docker-compose.yml` SHALL definir serviço de PostgreSQL com volume mapeado e variáveis de ambiente.

#### Scenario: Arquivo docker-compose.yml na raiz do projeto

- **WHEN** o projeto é inicializado
- **THEN** existe `docker-compose.yml` na raiz com serviço `db` (PostgreSQL) e `api` (aplicação)

#### Scenario: Volume mapeado para dados

- **WHEN** o serviço PostgreSQL está ativo
- **THEN** volume está mapeado de `database/bolao/` para `/var/lib/postgresql/data` no container

#### Scenario: Variáveis de ambiente aplicadas

- **WHEN** o container inicia
- **THEN** usa `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` do arquivo `.env`

### Requirement: Arquivo .env com credenciais

Um arquivo `.env` SHALL conter credenciais de desenvolvimento do banco de dados (git-ignored).

#### Scenario: Arquivo .env não versionado

- **WHEN** o desenvolvedor cria `.env` com credenciais
- **THEN** o arquivo não aparece no `git status` (ignorado pelo `.gitignore`)

#### Scenario: Variáveis padrão de desenvolvimento

- **WHEN** `.env` é criado
- **THEN** contém valores padrão como `POSTGRES_USER=bolao`, `POSTGRES_PASSWORD=dev123`, `POSTGRES_DB=bolao_db`

#### Scenario: Arquivo .env.example documentado

- **WHEN** um novo desenvolvedor clona o projeto
- **THEN** encontra `.env.example` no git como template para criar `.env` local
