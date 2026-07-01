using Bolao.Domain.Aggregates;
using Bolao.Domain.ValueObjects;
using Xunit;

namespace Bolao.Domain.Tests.Aggregates;

public class UserTests
{
    [Fact]
    public void User_ValidData_CreatedSuccessfully()
    {
        var user = new User("user@example.com", "João Silva");
        Assert.Equal("user@example.com", user.Email);
        Assert.Equal("João Silva", user.Name);
        Assert.Equal(0, user.TotalScore.Value);
    }

    [Fact]
    public void User_InvalidEmail_ThrowsException()
    {
        Assert.Throws<ArgumentException>(() => new User("invalid-email", "Name"));
    }

    [Fact]
    public void User_EmptyName_ThrowsException()
    {
        Assert.Throws<ArgumentException>(() => new User("user@example.com", ""));
    }

    [Fact]
    public void User_CanAddPredictions()
    {
        var user = new User("user@example.com", "João");
        var predictionId = Guid.NewGuid();

        user.AddPrediction(predictionId);

        Assert.Single(user.PredictionIds);
        Assert.Contains(predictionId, user.PredictionIds);
    }

    [Fact]
    public void User_RejectsDuplicatePrediction()
    {
        var user = new User("user@example.com", "João");
        var predictionId = Guid.NewGuid();

        user.AddPrediction(predictionId);

        Assert.Throws<InvalidOperationException>(() => user.AddPrediction(predictionId));
    }

    [Fact]
    public void User_CanUpdateTotalScore()
    {
        var user = new User("user@example.com", "João");
        var newScore = new Points(45);

        user.UpdateTotalScore(newScore);

        Assert.Equal(45, user.TotalScore.Value);
    }

    [Fact]
    public void User_EmailNormalized_ToLowercase()
    {
        var user = new User("USER@EXAMPLE.COM", "João");

        Assert.Equal("user@example.com", user.Email);
    }
}
