## ADDED Requirements

### Requirement: Controllers base com roteamento versionado
A API SHALL expor endpoints RESTful com roteamento automático via atributos e versionamento por URL.

#### Scenario: Controller respondendo a requisições
- **WHEN** uma requisição GET é feita para `/api/v1/health`
- **THEN** o status 200 é retornado com payload indicando que API está saudável

#### Scenario: Roteamento de controladores funcionando
- **WHEN** um novo controller herda de `ControllerBase`
- **THEN** as rotas são automaticamente mapeadas baseadas nos atributos `[Route]` e `[HttpGet]`

### Requirement: Tratamento de erros consistente
A API SHALL retornar respostas de erro estruturadas com status code apropriado e mensagens úteis.

#### Scenario: Erro de validação retorna 400
- **WHEN** um POST recebe dados inválidos
- **THEN** a resposta é 400 Bad Request com detalhes do erro

#### Scenario: Recurso não encontrado retorna 404
- **WHEN** um GET tenta acessar um recurso inexistente
- **THEN** a resposta é 404 Not Found

### Requirement: Serialização JSON
A API SHALL serializar e desserializar objetos em JSON com convenções de nomenclatura consistentes.

#### Scenario: Serialização em snake_case no JSON
- **WHEN** uma entidade é retornada como JSON
- **THEN** os nomes das propriedades estão em `snake_case`

### Requirement: CORS configurado
A API SHALL permitir requisições CORS para suportar frontend em desenvolvimento.

#### Scenario: Requisição CORS é aceita
- **WHEN** uma requisição do navegador inclui headers CORS
- **THEN** a resposta inclui headers CORS apropriados permitindo a requisição
