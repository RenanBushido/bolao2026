namespace Bolao.Application.Handlers.Queries;

public class GetChampionshipQueryHandler(IChampionshipRepository repository, IMapper mapper) : IRequestHandler<GetChampionshipQuery, ChampionshipResponse>
{
    private readonly IChampionshipRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<ChampionshipResponse> Handle(GetChampionshipQuery request, CancellationToken cancellationToken)
    {
        var championship = await _repository.GetByIdAsync(request.Id);

        return championship is null
            ? throw new KeyNotFoundException($"Championship with id {request.Id} not found")
            : _mapper.Map<ChampionshipResponse>(championship);
    }
}
