namespace Bolao.Application.Handlers.Queries;

public class GetMatchQueryHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<GetMatchQuery, MatchResponse>
{
    private readonly IMatchRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<MatchResponse> Handle(GetMatchQuery request, CancellationToken cancellationToken)
    {
        var match = await _repository.GetByIdAsync(request.Id);

        return match is null ? throw new KeyNotFoundException($"Match with id {request.Id} not found") : _mapper.Map<MatchResponse>(match);
    }
}
