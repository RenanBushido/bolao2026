namespace Bolao.Domain.Entities;

public class Stadium
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid CityId { get; set; }
    public int Capacity { get; set; }
    public int YearFounded { get; set; }

    public Stadium(string name, Guid cityId, int capacity, int yearFounded)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Stadium name é obrigatório", nameof(name));
        if (cityId == Guid.Empty)
            throw new ArgumentException("CityId é obrigatório", nameof(cityId));
        if (capacity <= 0)
            throw new ArgumentException("Capacity deve ser maior que zero", nameof(capacity));
        if (yearFounded < 1800 || yearFounded > DateTime.Now.Year)
            throw new ArgumentException("YearFounded inválido", nameof(yearFounded));

        Id = Guid.NewGuid();
        Name = name;
        CityId = cityId;
        Capacity = capacity;
        YearFounded = yearFounded;
    }

    private Stadium() { }
}
