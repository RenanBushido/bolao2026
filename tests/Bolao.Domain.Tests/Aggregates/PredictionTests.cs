using Bolao.Domain.Aggregates;
using Bolao.Domain.ValueObjects;
using Xunit;

namespace Bolao.Domain.Tests.Aggregates;

public class PredictionTests
{
    [Fact]
    public void Prediction_CreatedWithinDeadline_Successfully()
    {
        var userId = Guid.NewGuid();
        var matchId = Guid.NewGuid();
        var matchTime = DateTime.UtcNow.AddHours(3);

        var prediction = new Prediction(userId, matchId,
            new GoalCount(2), new GoalCount(1), matchTime);

        Assert.Equal(userId, prediction.UserId);
        Assert.Equal(matchId, prediction.MatchId);
    }

    [Fact]
    public void Prediction_LessThan2HoursBefore_ThrowsException()
    {
        var userId = Guid.NewGuid();
        var matchId = Guid.NewGuid();
        var matchTime = DateTime.UtcNow.AddMinutes(30);

        Assert.Throws<InvalidOperationException>(() =>
            new Prediction(userId, matchId, new GoalCount(2), new GoalCount(1), matchTime));
    }

    [Fact]
    public void Prediction_CalculateScore_ExactGoals()
    {
        var matchTime = DateTime.UtcNow.AddHours(3);
        var prediction = new Prediction(Guid.NewGuid(), Guid.NewGuid(),
            new GoalCount(2), new GoalCount(1), matchTime);

        prediction.CalculateScore(new GoalCount(2), new GoalCount(1));

        Assert.NotNull(prediction.CalculatedPoints);
        Assert.Equal(18, prediction.CalculatedPoints.Value);
    }

    [Fact]
    public void Prediction_CalculateScore_WinnerAndGoals()
    {
        var matchTime = DateTime.UtcNow.AddHours(3);
        var prediction = new Prediction(Guid.NewGuid(), Guid.NewGuid(),
            new GoalCount(3), new GoalCount(1), matchTime);

        prediction.CalculateScore(new GoalCount(2), new GoalCount(1));

        Assert.Equal(12, prediction.CalculatedPoints.Value);
    }

    [Fact]
    public void Prediction_CalculateScore_WinnerOnly()
    {
        var matchTime = DateTime.UtcNow.AddHours(3);
        var prediction = new Prediction(Guid.NewGuid(), Guid.NewGuid(),
            new GoalCount(2), new GoalCount(0), matchTime);

        prediction.CalculateScore(new GoalCount(1), new GoalCount(0));

        Assert.Equal(9, prediction.CalculatedPoints.Value);
    }

    [Fact]
    public void Prediction_CalculateScore_GoalsOnly()
    {
        var matchTime = DateTime.UtcNow.AddHours(3);
        var prediction = new Prediction(Guid.NewGuid(), Guid.NewGuid(),
            new GoalCount(2), new GoalCount(2), matchTime);

        prediction.CalculateScore(new GoalCount(1), new GoalCount(2));

        Assert.Equal(3, prediction.CalculatedPoints.Value);
    }

    [Fact]
    public void Prediction_CalculateScore_NoMatch()
    {
        var matchTime = DateTime.UtcNow.AddHours(3);
        var prediction = new Prediction(Guid.NewGuid(), Guid.NewGuid(),
            new GoalCount(3), new GoalCount(1), matchTime);

        prediction.CalculateScore(new GoalCount(1), new GoalCount(2));

        Assert.Equal(0, prediction.CalculatedPoints.Value);
    }
}
