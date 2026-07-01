using Bolao.Domain.ValueObjects;

namespace Bolao.Domain.Aggregates;

public class Prediction
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid MatchId { get; set; }
    public GoalCount PredictedHomeGoals { get; set; }
    public GoalCount PredictedAwayGoals { get; set; }
    public Points? CalculatedPoints { get; set; }
    public DateTime CreatedAt { get; set; }

    public Prediction(Guid userId, Guid matchId, GoalCount predictedHomeGoals, GoalCount predictedAwayGoals, DateTime matchScheduledTime)
    {
        if (userId == Guid.Empty || matchId == Guid.Empty)
            throw new ArgumentException("UserID e MatchId são obrigatórios");
        if (predictedHomeGoals == null || predictedAwayGoals == null)
            throw new ArgumentNullException("Goals não podem ser null");

        var now = DateTime.UtcNow;
        var twoHoursBefore = matchScheduledTime.AddHours(-2);

        if (now > twoHoursBefore)
            throw new InvalidOperationException("Prediction bloqueada (menos de 2h antes do match)");

        Id = Guid.NewGuid();
        UserId = userId;
        MatchId = matchId;
        PredictedHomeGoals = predictedHomeGoals;
        PredictedAwayGoals = predictedAwayGoals;
        CreatedAt = DateTime.UtcNow;
    }

    public void CalculateScore(GoalCount actualHomeGoals, GoalCount actualAwayGoals)
    {
        var points = CalculatePointsInternal(actualHomeGoals, actualAwayGoals);
        CalculatedPoints = new Points(points);
    }

    private int CalculatePointsInternal(GoalCount actualHomeGoals, GoalCount actualAwayGoals)
    {
        var predictedResult = GetPredictedResult();
        var actualResult = GetActualResult(actualHomeGoals, actualAwayGoals);

        var exactGoals = PredictedHomeGoals.Value == actualHomeGoals.Value &&
                         PredictedAwayGoals.Value == actualAwayGoals.Value;
        var homeGoalsCorrect = PredictedHomeGoals.Value == actualHomeGoals.Value;
        var awayGoalsCorrect = PredictedAwayGoals.Value == actualAwayGoals.Value;

        if (exactGoals)
            return 18;

        if (predictedResult == actualResult)
        {
            if (homeGoalsCorrect || awayGoalsCorrect)
                return 12;
            return 9;
        }

        if (homeGoalsCorrect || awayGoalsCorrect)
            return 3;

        return 0;
    }

    private PredictionResult GetPredictedResult()
    {
        if (PredictedHomeGoals.Value > PredictedAwayGoals.Value)
            return PredictionResult.HomeWin;
        if (PredictedAwayGoals.Value > PredictedHomeGoals.Value)
            return PredictionResult.AwayWin;
        return PredictionResult.Draw;
    }

    private PredictionResult GetActualResult(GoalCount homeGoals, GoalCount awayGoals)
    {
        if (homeGoals.Value > awayGoals.Value)
            return PredictionResult.HomeWin;
        if (awayGoals.Value > homeGoals.Value)
            return PredictionResult.AwayWin;
        return PredictionResult.Draw;
    }

    private Prediction() { }
}
