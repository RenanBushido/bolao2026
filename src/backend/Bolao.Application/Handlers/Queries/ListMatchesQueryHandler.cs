namespace Bolao.Application.Handlers.Queries;

public class ListMatchesQueryHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<ListMatchesQuery, List<MatchResponse>>
{
    private readonly IMatchRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<List<MatchResponse>> Handle(ListMatchesQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Match> matches = request.ChampionshipId.HasValue
            ? await _repository.GetByChampionshipAsync(request.ChampionshipId.Value)
            : await _repository.GetAllAsync();
        return _mapper.Map<List<MatchResponse>>(matches);
    }
}
