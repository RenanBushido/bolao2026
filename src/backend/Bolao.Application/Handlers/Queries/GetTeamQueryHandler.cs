namespace Bolao.Application.Handlers.Queries;

public class GetTeamQueryHandler(ITeamRepository repository, IMapper mapper) : IRequestHandler<GetTeamQuery, TeamResponse>
{
    private readonly ITeamRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<TeamResponse> Handle(GetTeamQuery request, CancellationToken cancellationToken)
    {
        var team = await _repository.GetByIdAsync(request.Id);

        return team is null ? throw new KeyNotFoundException($"Team with id {request.Id} not found") : _mapper.Map<TeamResponse>(team);
    }
}
