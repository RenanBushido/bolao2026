using Bolao.Domain.ValueObjects;

namespace Bolao.Domain.Aggregates;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public Points TotalScore { get; set; }
    private readonly List<Guid> _predictionIds = new();
    public IReadOnlyList<Guid> PredictionIds => _predictionIds.AsReadOnly();
    public DateTime CreatedAt { get; set; }

    public User(string email, string name)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email é obrigatório", nameof(email));
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name é obrigatório", nameof(name));
        if (!email.Contains("@"))
            throw new ArgumentException("Email inválido", nameof(email));

        Id = Guid.NewGuid();
        Email = email.ToLower();
        Name = name;
        TotalScore = new Points(0);
        CreatedAt = DateTime.UtcNow;
    }

    public void AddPrediction(Guid predictionId)
    {
        if (predictionId == Guid.Empty)
            throw new ArgumentException("PredictionId é obrigatório", nameof(predictionId));
        if (_predictionIds.Contains(predictionId))
            throw new InvalidOperationException("Prediction já adicionada");

        _predictionIds.Add(predictionId);
    }

    public void UpdateTotalScore(Points newTotal)
    {
        if (newTotal == null)
            throw new ArgumentNullException(nameof(newTotal));
        TotalScore = newTotal;
    }

    private User() { }
}
