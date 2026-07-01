using Bolao.Domain.ValueObjects;
using Xunit;

namespace Bolao.Domain.Tests.ValueObjects;

public class ScoreTests
{
    [Fact]
    public void Score_ValidValue_CreatedSuccessfully()
    {
        var score = new Score(18);
        Assert.Equal(18, score.Value);
    }

    [Theory]
    [InlineData(-1)]
    [InlineData(19)]
    [InlineData(100)]
    public void Score_InvalidValue_ThrowsException(int value)
    {
        Assert.Throws<ArgumentException>(() => new Score(value));
    }

    [Fact]
    public void Score_Presets_WorkCorrectly()
    {
        Assert.Equal(0, Score.Zero.Value);
        Assert.Equal(18, Score.ExactResult.Value);
        Assert.Equal(12, Score.WinnerAndGoals.Value);
        Assert.Equal(9, Score.WinnerOnly.Value);
        Assert.Equal(3, Score.GoalsOnly.Value);
    }
}
