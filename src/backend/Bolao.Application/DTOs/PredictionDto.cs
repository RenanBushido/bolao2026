namespace Bolao.Application.DTOs;

public class PredictionResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid MatchId { get; set; }
    public int PredictedHomeGoals { get; set; }
    public int PredictedAwayGoals { get; set; }
    public PredictionResult PredictedResult { get; set; }
    public int? Points { get; set; }
}

public class CreatePredictionCommand(Guid userId, Guid matchId, PredictionResult predictedResult, int homeGoals, int awayGoals) : IRequest<PredictionResponse>
{
    public Guid UserId { get; set; } = userId;
    public Guid MatchId { get; set; } = matchId;
    public PredictionResult PredictedResult { get; set; } = predictedResult;
    public int PredictedHomeGoals { get; set; } = homeGoals;
    public int PredictedAwayGoals { get; set; } = awayGoals;
}

public class GetPredictionQuery(Guid id) : IRequest<PredictionResponse>
{
    public Guid Id { get; set; } = id;
}

public class GetUserPredictionsQuery(Guid userId) : IRequest<List<PredictionResponse>>
{
    public Guid UserId { get; set; } = userId;
}
