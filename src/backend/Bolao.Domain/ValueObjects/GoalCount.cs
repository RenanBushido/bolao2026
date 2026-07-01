namespace Bolao.Domain.ValueObjects;

public sealed record GoalCount
{
    public int Value { get; }

    public GoalCount(int value)
    {
        if (value < 0)
            throw new ArgumentException("Gols não podem ser negativos", nameof(value));

        Value = value;
    }

    public override string ToString() => Value.ToString();
}
