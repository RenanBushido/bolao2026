namespace Bolao.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Championship, ChampionshipResponse>();
        CreateMap<ChampionshipRequest, Championship>().ConstructUsing(src => new Championship(src.Name, src.Year));

        CreateMap<Team, TeamResponse>();
        CreateMap<TeamRequest, Team>().ConstructUsing(src => new Team(src.Name, src.CountryId, src.Coach));

        CreateMap<Match, MatchResponse>();

        CreateMap<User, UserResponse>();

        CreateMap<Prediction, PredictionResponse>();
    }
}

public class ChampionshipResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Year { get; set; }
}

public class TeamResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Coach { get; set; }
}

public class MatchResponse
{
    public Guid Id { get; set; }
    public Guid HomeTeamId { get; set; }
    public Guid AwayTeamId { get; set; }
}

public class UserResponse
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
}

public class PredictionResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid MatchId { get; set; }
}
