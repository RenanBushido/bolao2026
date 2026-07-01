namespace Bolao.Domain.Services;

public class ScoringService
{
    public Points CalculatePoints(GoalCount predictedHome, GoalCount predictedAway, GoalCount actualHome, GoalCount actualAway)
    {
        var exactGoals = predictedHome.Value == actualHome.Value && predictedAway.Value == actualAway.Value;
        var homeGoalsCorrect = predictedHome.Value == actualHome.Value;
        var awayGoalsCorrect = predictedAway.Value == actualAway.Value;

        var predictedResult = GetResult(predictedHome, predictedAway);
        var actualResult = GetResult(actualHome, actualAway);

        if (exactGoals)
            return new Points(18);

        if (predictedResult == actualResult)
        {
            return homeGoalsCorrect || awayGoalsCorrect ? new Points(12) : new Points(9);
        }

        return homeGoalsCorrect || awayGoalsCorrect ? new Points(3) : new Points(0);
    }

    private PredictionResult GetResult(GoalCount home, GoalCount away)
    {
        return home.Value > away.Value
            ? PredictionResult.HomeWin
            : away.Value > home.Value ? PredictionResult.AwayWin : PredictionResult.Draw;
    }
}
