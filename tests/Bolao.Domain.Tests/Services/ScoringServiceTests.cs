using Bolao.Domain.Services;
using Bolao.Domain.ValueObjects;
using Xunit;

namespace Bolao.Domain.Tests.Services;

public class ScoringServiceTests
{
    private readonly ScoringService _scoringService = new();

    [Fact]
    public void ScoringService_ExactResult_Returns18Points()
    {
        var points = _scoringService.CalculatePoints(
            new GoalCount(2), new GoalCount(1),
            new GoalCount(2), new GoalCount(1));

        Assert.Equal(18, points.Value);
    }

    [Fact]
    public void ScoringService_WinnerAndGoals_Returns12Points()
    {
        var points = _scoringService.CalculatePoints(
            new GoalCount(3), new GoalCount(1),
            new GoalCount(2), new GoalCount(1));

        Assert.Equal(12, points.Value);
    }

    [Fact]
    public void ScoringService_WinnerOnly_Returns9Points()
    {
        var points = _scoringService.CalculatePoints(
            new GoalCount(2), new GoalCount(0),
            new GoalCount(1), new GoalCount(0));

        Assert.Equal(9, points.Value);
    }

    [Fact]
    public void ScoringService_GoalsOnly_Returns3Points()
    {
        var points = _scoringService.CalculatePoints(
            new GoalCount(2), new GoalCount(2),
            new GoalCount(1), new GoalCount(2));

        Assert.Equal(3, points.Value);
    }

    [Fact]
    public void ScoringService_NoMatch_Returns0Points()
    {
        var points = _scoringService.CalculatePoints(
            new GoalCount(3), new GoalCount(1),
            new GoalCount(1), new GoalCount(2));

        Assert.Equal(0, points.Value);
    }

    [Fact]
    public void ScoringService_DrawPrediction_DrawResult_Returns18Points()
    {
        var points = _scoringService.CalculatePoints(
            new GoalCount(1), new GoalCount(1),
            new GoalCount(2), new GoalCount(2));

        Assert.Equal(18, points.Value);
    }

    [Fact]
    public void ScoringService_AwayWinPrediction_AwayWinResult_Returns9Points()
    {
        var points = _scoringService.CalculatePoints(
            new GoalCount(0), new GoalCount(2),
            new GoalCount(1), new GoalCount(3));

        Assert.Equal(9, points.Value);
    }
}
