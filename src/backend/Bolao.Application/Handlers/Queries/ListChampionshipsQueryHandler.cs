namespace Bolao.Application.Handlers.Queries;

public class ListChampionshipsQueryHandler(IChampionshipRepository repository, IMapper mapper) : IRequestHandler<GetChampionshipsQuery, List<ChampionshipResponse>>
{
    private readonly IChampionshipRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<List<ChampionshipResponse>> Handle(GetChampionshipsQuery request, CancellationToken cancellationToken)
    {
        var championships = await _repository.GetAllAsync();
        return _mapper.Map<List<ChampionshipResponse>>(championships);
    }
}
