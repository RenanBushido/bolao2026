namespace Bolao.Application.DTOs;

public class CreateTeamCommand(string name, Guid countryId, string coach) : IRequest<TeamResponse>
{
    public string Name { get; set; } = name;
    public Guid CountryId { get; set; } = countryId;
    public string Coach { get; set; } = coach;
}

public class GetTeamQuery(Guid id) : IRequest<TeamResponse>
{
    public Guid Id { get; set; } = id;
}

public class ListTeamsQuery(Guid? championshipId = null) : IRequest<List<TeamResponse>>
{
    public Guid? ChampionshipId { get; set; } = championshipId;
}
