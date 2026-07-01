using Bolao.Domain.Aggregates;
using Bolao.Domain.ValueObjects;
using Xunit;

namespace Bolao.Domain.Tests.Aggregates;

public class MatchTests
{
    [Fact]
    public void Match_ValidData_CreatedSuccessfully()
    {
        var homeTeamId = Guid.NewGuid();
        var awayTeamId = Guid.NewGuid();
        var stadiumId = Guid.NewGuid();
        var futureDateTime = DateTime.UtcNow.AddDays(1);

        var match = new Match(homeTeamId, awayTeamId, stadiumId, futureDateTime, TournamentPhase.GroupStage);

        Assert.Equal(homeTeamId, match.HomeTeamId);
        Assert.Equal(awayTeamId, match.AwayTeamId);
        Assert.Equal(MatchStatus.Scheduled, match.Status);
    }

    [Fact]
    public void Match_SameTeams_ThrowsException()
    {
        var teamId = Guid.NewGuid();
        var stadiumId = Guid.NewGuid();

        Assert.Throws<ArgumentException>(() =>
            new Match(teamId, teamId, stadiumId, DateTime.UtcNow.AddDays(1), TournamentPhase.GroupStage));
    }

    [Fact]
    public void Match_CanCreatePrediction_WithinDeadline()
    {
        var homeTeamId = Guid.NewGuid();
        var awayTeamId = Guid.NewGuid();
        var stadiumId = Guid.NewGuid();
        var matchTime = DateTime.UtcNow.AddHours(3);

        var match = new Match(homeTeamId, awayTeamId, stadiumId, matchTime, TournamentPhase.GroupStage);

        Assert.True(match.CanCreatePrediction());
    }

    [Fact]
    public void Match_CannotCreatePrediction_LessThan2HoursBefore()
    {
        var homeTeamId = Guid.NewGuid();
        var awayTeamId = Guid.NewGuid();
        var stadiumId = Guid.NewGuid();
        var matchTime = DateTime.UtcNow.AddMinutes(30);

        var match = new Match(homeTeamId, awayTeamId, stadiumId, matchTime, TournamentPhase.GroupStage);

        Assert.False(match.CanCreatePrediction());
    }

    [Fact]
    public void Match_SetResult_Successfully()
    {
        var match = new Match(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(),
            DateTime.UtcNow.AddSeconds(-1), TournamentPhase.GroupStage);

        var homeGoals = new GoalCount(2);
        var awayGoals = new GoalCount(1);

        match.SetResult(homeGoals, awayGoals);

        Assert.NotNull(match.Result);
        Assert.Equal(2, match.Result.HomeGoals.Value);
        Assert.Equal(MatchStatus.Finished, match.Status);
    }
}
