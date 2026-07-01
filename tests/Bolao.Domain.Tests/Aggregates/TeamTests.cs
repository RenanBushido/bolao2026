using Bolao.Domain.Aggregates;
using Bolao.Domain.Entities;
using Xunit;

namespace Bolao.Domain.Tests.Aggregates;

public class TeamTests
{
    [Fact]
    public void Team_ValidData_CreatedSuccessfully()
    {
        var countryId = Guid.NewGuid();
        var team = new Team("Brasil", countryId, "Dorival Jr");
        Assert.Equal("Brasil", team.Name);
        Assert.Equal(countryId, team.CountryId);
        Assert.Empty(team.Players);
    }

    [Fact]
    public void Team_CanAddPlayers()
    {
        var team = new Team("Brasil", Guid.NewGuid(), "Coach");
        var player = new Player(team.Id, "Neymar", "FWD", 10);
        team.AddPlayer(player);
        Assert.Single(team.Players);
    }

    [Fact]
    public void Team_RejectsDuplicateShirtNumber()
    {
        var team = new Team("Brasil", Guid.NewGuid(), "Coach");
        var player1 = new Player(team.Id, "Neymar", "FWD", 10);
        var player2 = new Player(team.Id, "Vinicius", "FWD", 10);

        team.AddPlayer(player1);
        Assert.Throws<InvalidOperationException>(() => team.AddPlayer(player2));
    }

    [Fact]
    public void Team_RejectsMoreThan23Players()
    {
        var team = new Team("Brasil", Guid.NewGuid(), "Coach");
        for (int i = 1; i <= 23; i++)
            team.AddPlayer(new Player(team.Id, $"Player{i}", "MID", i));

        Assert.Throws<InvalidOperationException>(() =>
            team.AddPlayer(new Player(team.Id, "Player24", "MID", 24)));
    }

    [Fact]
    public void Player_ValidPositions()
    {
        var teamId = Guid.NewGuid();
        var positions = new[] { "GK", "DEF", "MID", "FWD" };

        foreach (var pos in positions)
        {
            var player = new Player(teamId, $"Player_{pos}", pos, 1);
            Assert.Equal(pos, player.Position);
        }
    }

    [Fact]
    public void Player_InvalidPosition_ThrowsException()
    {
        Assert.Throws<ArgumentException>(() =>
            new Player(Guid.NewGuid(), "Player", "INVALID", 1));
    }

    [Fact]
    public void Player_InvalidShirtNumber_ThrowsException()
    {
        Assert.Throws<ArgumentException>(() =>
            new Player(Guid.NewGuid(), "Player", "FWD", 100));
    }
}
