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
            return homeGoalsCorrect || awayGoalsCorrect ? 12 : 9;
        }

        return homeGoalsCorrect || awayGoalsCorrect ? 3 : 0;
    }

    public PredictionResult GetPredictedResult()
    {
        return PredictedHomeGoals.Value > PredictedAwayGoals.Value
            ? PredictionResult.HomeWin
            : PredictedAwayGoals.Value > PredictedHomeGoals.Value ? PredictionResult.AwayWin : PredictionResult.Draw;
    }

    private PredictionResult GetActualResult(GoalCount homeGoals, GoalCount awayGoals)
    {
        return homeGoals.Value > awayGoals.Value
            ? PredictionResult.HomeWin
            : awayGoals.Value > homeGoals.Value ? PredictionResult.AwayWin : PredictionResult.Draw;
    }

    private Prediction() { }
}
