using Bolao.Domain.ValueObjects;

namespace Bolao.Domain.Entities;

public class MatchResult
{
    public Guid Id { get; set; }
    public GoalCount HomeGoals { get; set; }
    public GoalCount AwayGoals { get; set; }
    public DateTime CreatedAt { get; set; }

    public MatchResult(GoalCount homeGoals, GoalCount awayGoals)
    {
        if (homeGoals == null || awayGoals == null)
            throw new ArgumentNullException("Goals não podem ser null");

        Id = Guid.NewGuid();
        HomeGoals = homeGoals;
        AwayGoals = awayGoals;
        CreatedAt = DateTime.UtcNow;
    }

    public PredictionResult GetResult()
    {
        if (HomeGoals.Value > AwayGoals.Value)
            return PredictionResult.HomeWin;
        if (AwayGoals.Value > HomeGoals.Value)
            return PredictionResult.AwayWin;
        return PredictionResult.Draw;
    }

    private MatchResult() { }
}
