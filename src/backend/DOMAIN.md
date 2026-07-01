# Domain Layer - Bolão 2026

## Visão Geral

A Domain Layer implementa o modelo de negócio usando **Domain-Driven Design (DDD)**, com agregates, value objects, domain services e repositories.

## Estrutura

### Value Objects

Conceitos imutáveis sem identidade própria:

- **Score** (0-18): Pontuação de um palpite
- **Points** (0-18): Pontos acumulados por um usuário
- **GoalCount** (≥0): Número de gols
- **PredictionResult**: Enum (HomeWin, Draw, AwayWin)
- **TournamentPhase**: Enum (GroupStage, Round16, Quarterfinals, Semifinals, Final)
- **MatchStatus**: Enum (Scheduled, Live, Finished)

### Entidades Simples

Objetos com identidade mas sem comportamento complexo:

- **Country**: País participante
- **City**: Cidade-sede
- **Stadium**: Estádio com capacidade
- **Venue**: Agregação de Stadium
- **Group**: Grupo de times na fase de grupos
- **GroupStage**: Organização dos 8 grupos
- **KnockoutStage**: Estrutura da fase eliminatória
- **Player**: Jogador de um time
- **MatchResult**: Resultado final de uma partida

### Agregates (Roots)

Agregates principais com regras de negócio:

#### Championship
Representa a Copa do Mundo inteira.

```csharp
var championship = new Championship("Copa 2026", 2026);
championship.SetGroupStage(groupStage);
championship.SetKnockoutStage(knockoutStage);
```

#### Team
Seleção com seus jogadores (máximo 23).

```csharp
var team = new Team("Brasil", countryId, "Dorival Jr");
team.AddPlayer(new Player(team.Id, "Neymar", "FWD", 10));
```

#### Match
Partida com validação temporal (não pode haver resultado antes do horário).

```csharp
var match = new Match(homeTeamId, awayTeamId, stadiumId, futureDateTime, TournamentPhase.GroupStage);
if (match.CanCreatePrediction()) {
    // Usuário pode fazer palpite (até 2h antes)
}
match.SetResult(new GoalCount(2), new GoalCount(1));
```

#### Prediction
Palpite do usuário com bloqueio de 2h antes.

```csharp
var prediction = new Prediction(userId, matchId, 
    new GoalCount(2), new GoalCount(1), matchTime);
prediction.CalculateScore(new GoalCount(2), new GoalCount(1)); // 18 pontos
```

#### User
Usuário do bolão com pontuação total.

```csharp
var user = new User("user@example.com", "João Silva");
user.AddPrediction(predictionId);
user.UpdateTotalScore(new Points(45));
```

### Domain Services

Lógica de negócio que envolve múltiplos agregates:

#### ScoringService
Calcula pontos (18-12-9-3-0) baseado em acertos de gols e resultado.

```csharp
var service = new ScoringService();
var points = service.CalculatePoints(
    predictedHome: 2, predictedAway: 1,
    actualHome: 2, actualAway: 1); // 18 pontos (exato)
```

**Critério de Pontuação:**
- **18 pontos**: Placar exato (gols home e away corretos)
- **12 pontos**: Vencedor correto + gols do vencedor corretos
- **9 pontos**: Apenas vencedor correto
- **3 pontos**: Apenas gols de um time corretos
- **0 pontos**: Nenhum acerto

### Repositories

Abstrações para persistência (implementadas em Infrastructure):

- `IRepository<T>`: Base para CRUD
- `IChampionshipRepository`: Queries específicas de Championship
- `ITeamRepository`: Queries específicas de Team
- `IMatchRepository`: Queries específicas de Match
- `IPredictionRepository`: Queries específicas de Prediction
- `IUserRepository`: Queries e leaderboard

## Padrões Utilizados

### Validação no Constructor
Entidades validam dados obrigatórios e regras de negócio no constructor.

```csharp
if (string.IsNullOrWhiteSpace(name))
    throw new ArgumentException("Name é obrigatório");
```

### Value Objects Imutáveis
Conceitos sem identidade são value objects com validação integrada.

```csharp
var score = new Score(18); // OK
var score = new Score(19); // ArgumentException
```

### Bloqueio Temporal (2h antes)
Predictions bloqueiam criação com menos de 2h antes do match.

```csharp
// Throws InvalidOperationException se menos de 2h
var prediction = new Prediction(userId, matchId, goals1, goals2, matchTime);
```

### IDs como GUIDs
Todas as entidades usam UUID para identificação única global.

### Soft Delete (Futuro)
Repositórios podem implementar soft delete sem alterar Domain.

## Testing

### Unit Tests
- **ValueObjects**: ScoreTests, GoalCountTests, PointsTests
- **Entities**: LocationEntitiesTests, PlayerTests
- **Aggregates**: ChampionshipTests, TeamTests, MatchTests, PredictionTests, UserTests
- **Services**: ScoringServiceTests (7 cenários)

Executar:
```bash
dotnet test
```

### Coverage
Objetivo: >80% de cobertura na Domain Layer

## Próximos Passos

1. **Application Layer**: Services de aplicação para casos de uso
2. **API Endpoints**: Controllers para expor funcionalidades
3. **EF Core Migrations**: Sync entre Domain e Banco de Dados
4. **Autenticação**: JWT e autorização
5. **Events**: Domain events para notificações em tempo real
