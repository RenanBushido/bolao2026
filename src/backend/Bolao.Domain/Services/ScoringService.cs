using Bolao.Domain.ValueObjects;

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
            if (homeGoalsCorrect || awayGoalsCorrect)
                return new Points(12);
            return new Points(9);
        }

        if (homeGoalsCorrect || awayGoalsCorrect)
            return new Points(3);

        return new Points(0);
    }

    private PredictionResult GetResult(GoalCount home, GoalCount away)
    {
        if (home.Value > away.Value)
            return PredictionResult.HomeWin;
        if (away.Value > home.Value)
            return PredictionResult.AwayWin;
        return PredictionResult.Draw;
    }
}
