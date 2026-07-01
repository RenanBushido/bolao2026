using Bolao.Domain.Aggregates;
using Bolao.Domain.Entities;
using Xunit;

namespace Bolao.Domain.Tests.Aggregates;

public class ChampionshipTests
{
    [Fact]
    public void Championship_ValidData_CreatedSuccessfully()
    {
        var championship = new Championship("Copa 2026", 2026);
        Assert.Equal("Copa 2026", championship.Name);
        Assert.Equal(2026, championship.Year);
        Assert.NotEqual(Guid.Empty, championship.Id);
    }

    [Fact]
    public void Championship_InvalidYear_ThrowsException()
    {
        Assert.Throws<ArgumentException>(() => new Championship("Copa", 1900));
    }

    [Fact]
    public void GroupStage_CreatedWithGroups()
    {
        var groupStage = new GroupStage(Guid.NewGuid());
        Assert.NotNull(groupStage);
        Assert.Empty(groupStage.Groups);
    }

    [Fact]
    public void Group_CanAddTeams()
    {
        var group = new Group("A", Guid.NewGuid());
        group.AddTeam(Guid.NewGuid());
        Assert.Single(group.TeamIds);
    }

    [Fact]
    public void Group_RejectsMoreThan4Teams()
    {
        var group = new Group("A", Guid.NewGuid());
        for (int i = 0; i < 4; i++)
            group.AddTeam(Guid.NewGuid());

        Assert.Throws<InvalidOperationException>(() => group.AddTeam(Guid.NewGuid()));
    }

    [Fact]
    public void GroupStage_CanAddUpTo8Groups()
    {
        var groupStage = new GroupStage(Guid.NewGuid());
        var championshipId = Guid.NewGuid();

        for (int i = 0; i < 8; i++)
            groupStage.AddGroup(new Group($"Group{i}", championshipId));

        Assert.Equal(8, groupStage.Groups.Count);
    }
}
