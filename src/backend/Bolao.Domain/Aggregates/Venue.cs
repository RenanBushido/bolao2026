namespace Bolao.Domain.Aggregates;

public class Venue
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid StadiumId { get; set; }

    public Venue(string name, Guid stadiumId)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Venue name é obrigatório", nameof(name));
        if (stadiumId == Guid.Empty)
            throw new ArgumentException("StadiumId é obrigatório", nameof(stadiumId));

        Id = Guid.NewGuid();
        Name = name;
        StadiumId = stadiumId;
    }

    private Venue() { }
}
