namespace Bolao.Domain.Aggregates;

public class Championship
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Year { get; set; }
    public GroupStage? GroupStage { get; set; }
    public KnockoutStage? KnockoutStage { get; set; }

    public Championship(string name, int year)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Championship name é obrigatório", nameof(name));
        if (year < 2000 || year > 2100)
            throw new ArgumentException("Year deve estar entre 2000 e 2100", nameof(year));

        Id = Guid.NewGuid();
        Name = name;
        Year = year;
    }

    public void SetGroupStage(GroupStage groupStage)
    {
        GroupStage = groupStage ?? throw new ArgumentNullException(nameof(groupStage));
    }

    public void SetKnockoutStage(KnockoutStage knockoutStage)
    {
        KnockoutStage = knockoutStage ?? throw new ArgumentNullException(nameof(knockoutStage));
    }

    private Championship() { }
}
