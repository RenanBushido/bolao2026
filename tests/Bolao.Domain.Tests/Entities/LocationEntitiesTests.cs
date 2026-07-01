using Bolao.Domain.Entities;
using Xunit;

namespace Bolao.Domain.Tests.Entities;

public class LocationEntitiesTests
{
    [Fact]
    public void Country_ValidData_CreatedSuccessfully()
    {
        var country = new Country("Brasil", "BR");
        Assert.Equal("Brasil", country.Name);
        Assert.Equal("BR", country.ISOCode);
        Assert.NotEqual(Guid.Empty, country.Id);
    }

    [Fact]
    public void Country_InvalidIsoCode_ThrowsException()
    {
        Assert.Throws<ArgumentException>(() => new Country("Brasil", "BRA"));
    }

    [Fact]
    public void City_ValidData_CreatedSuccessfully()
    {
        var countryId = Guid.NewGuid();
        var city = new City("São Paulo", countryId, 12_000_000);
        Assert.Equal("São Paulo", city.Name);
        Assert.Equal(countryId, city.CountryId);
        Assert.Equal(12_000_000, city.Population);
    }

    [Fact]
    public void Stadium_ValidData_CreatedSuccessfully()
    {
        var cityId = Guid.NewGuid();
        var stadium = new Stadium("Maracanã", cityId, 78_915, 1950);
        Assert.Equal("Maracanã", stadium.Name);
        Assert.Equal(78_915, stadium.Capacity);
        Assert.Equal(1950, stadium.YearFounded);
    }

    [Fact]
    public void Stadium_InvalidCapacity_ThrowsException()
    {
        var cityId = Guid.NewGuid();
        Assert.Throws<ArgumentException>(() => new Stadium("Test", cityId, -1, 2000));
    }
}
