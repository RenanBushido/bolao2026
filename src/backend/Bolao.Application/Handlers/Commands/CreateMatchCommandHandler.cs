namespace Bolao.Application.Handlers.Commands;

public class CreateMatchCommandHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<CreateMatchCommand, MatchResponse>
{
    private readonly IMatchRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<MatchResponse> Handle(CreateMatchCommand request, CancellationToken cancellationToken)
    {
        var match = new Match(
            request.HomeTeamId,
            request.AwayTeamId,
            request.VenueId,
            request.ScheduledAt,
            request.Phase
        );

        await _repository.AddAsync(match);
        await _repository.SaveChangesAsync();

        return _mapper.Map<MatchResponse>(match);
    }
}
