namespace Bolao.Domain.ValueObjects;

public record Points
{
    public int Value { get; }

    public Points(int value)
    {
        if (value < 0 || value > 18)
            throw new ArgumentException("Points deve estar entre 0 e 18", nameof(value));

        Value = value;
    }

    public static Points operator +(Points a, Points b) => new(a.Value + b.Value);
    public override string ToString() => Value.ToString();
}
