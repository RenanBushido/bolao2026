namespace Bolao.Domain.ValueObjects;

public sealed record GoalCount
{
    public int Value { get; private set; }

    public GoalCount(int value)
    {
        if (value < 0)
            throw new ArgumentException("Gols não podem ser negativos", nameof(value));

        Value = value;
    }

    private GoalCount() { }

    public override string ToString() => Value.ToString();
}
