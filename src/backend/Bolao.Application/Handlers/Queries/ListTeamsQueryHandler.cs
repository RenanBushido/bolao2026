namespace Bolao.Application.Handlers.Queries;

public class ListTeamsQueryHandler(ITeamRepository repository, IMapper mapper) : IRequestHandler<ListTeamsQuery, List<TeamResponse>>
{
    private readonly ITeamRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<List<TeamResponse>> Handle(ListTeamsQuery request, CancellationToken cancellationToken)
    {
        var teams = await _repository.GetAllAsync();

        if (request.ChampionshipId.HasValue)
        {
            teams = teams.Where(t => t.Id == request.ChampionshipId).ToList();
        }

        return _mapper.Map<List<TeamResponse>>(teams);
    }
}
