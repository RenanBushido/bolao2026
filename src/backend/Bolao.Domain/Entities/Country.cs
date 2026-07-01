namespace Bolao.Domain.Entities;

public class Country
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ISOCode { get; set; } = string.Empty;

    public Country(string name, string isoCode)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Country name é obrigatório", nameof(name));
        if (string.IsNullOrWhiteSpace(isoCode) || isoCode.Length != 2)
            throw new ArgumentException("ISO Code deve ter 2 caracteres", nameof(isoCode));

        Id = Guid.NewGuid();
        Name = name;
        ISOCode = isoCode.ToUpper();
    }

    private Country() { }
}
