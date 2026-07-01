namespace Bolao.Domain.ValueObjects;

public record Score
{
    public int Value { get; }

    public Score(int value)
    {
        if (value < 0 || value > 18)
            throw new ArgumentException("Score deve estar entre 0 e 18 pontos", nameof(value));

        Value = value;
    }

    public static Score Zero => new(0);
    public static Score ExactResult => new(18);
    public static Score WinnerAndGoals => new(12);
    public static Score WinnerOnly => new(9);
    public static Score GoalsOnly => new(3);

    public override string ToString() => $"{Value} pontos";
}
