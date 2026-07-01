namespace Bolao.Domain.Entities;

public class City
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
    public int Population { get; set; }

    public City(string name, Guid countryId, int population)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("City name é obrigatório", nameof(name));
        if (countryId == Guid.Empty)
            throw new ArgumentException("CountryId é obrigatório", nameof(countryId));
        if (population < 0)
            throw new ArgumentException("Population não pode ser negativa", nameof(population));

        Id = Guid.NewGuid();
        Name = name;
        CountryId = countryId;
        Population = population;
    }

    private City() { }
}
