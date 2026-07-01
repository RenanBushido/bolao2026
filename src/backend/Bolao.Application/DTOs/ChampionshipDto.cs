namespace Bolao.Application.DTOs;

public class ChampionshipRequest
{
    public string Name { get; set; } = string.Empty;
    public int Year { get; set; }
}

public class ChampionshipResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Year { get; set; }
}

public class TeamRequest
{
    public string Name { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
    public string Coach { get; set; } = string.Empty;
}

public class TeamResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Coach { get; set; } = string.Empty;
}

public class CreateChampionshipCommand(string name, int year) : IRequest<ChampionshipResponse>
{
    public string Name { get; set; } = name;
    public int Year { get; set; } = year;
}

public class GetChampionshipQuery(Guid id) : IRequest<ChampionshipResponse>
{
    public Guid Id { get; set; } = id;
}

public class GetChampionshipsQuery : IRequest<List<ChampionshipResponse>>
{
}
