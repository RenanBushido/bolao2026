namespace Bolao.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Championship, ChampionshipResponse>();
        CreateMap<ChampionshipRequest, Championship>().ConstructUsing(src => new Championship(src.Name, src.Year));
        CreateMap<Match, MatchResponse>();
        CreateMap<MenuHeader, MenuHeaderResponse>();
        CreateMap<Prediction, PredictionResponse>();        
        CreateMap<Team, TeamResponse>();
        CreateMap<TeamRequest, Team>().ConstructUsing(src => new Team(src.Name, src.CountryId, src.Coach));
        CreateMap<User, UserResponse>();
    }
}