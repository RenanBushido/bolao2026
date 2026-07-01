## ADDED Requirements

### Requirement: Organização de volumes Docker por projeto

A estrutura de dados SHALL ser organizada em subpastas dentro de `database/`, com cada projeto/aplicação tendo sua própria pasta nomeada em kebab-case.

#### Scenario: Pasta do Bolão 2026 criada

- **WHEN** a estrutura inicial é estabelecida
- **THEN** a pasta `database/bolao/` existe para persistência do banco de dados do Bolão 2026

#### Scenario: Padrão escalável para novos projetos

- **WHEN** uma nova aplicação precisar de banco de dados (ex: Redis cache)
- **THEN** será criada nova pasta `database/<project-name>/` mantendo estrutura consistente

### Requirement: Gitignore para volumes de dados

O arquivo `.gitignore` SHALL excluir volumes de dados locais para evitar checkin de arquivos privados.

#### Scenario: Dados locais ignorados no git

- **WHEN** arquivos de dados são criados em `database/bolao/`
- **THEN** esses arquivos não aparecem no `git status` e não são commitados

#### Scenario: Documentação preservada no git

- **WHEN** um arquivo `.gitkeep` é adicionado em `database/bolao/`
- **THEN** a pasta é versionada mas o volume de dados local é ignorado

### Requirement: Documentação de padrão de persistência

Documentação SHALL descrever como adicionar novos bancos de dados seguindo este padrão.

#### Scenario: README com exemplo

- **WHEN** um novo desenvolvedor lê a documentação
- **THEN** encontra instruções claras de como adicionar `database/<novo-projeto>/` para novas aplicações
