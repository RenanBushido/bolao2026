namespace Bolao.Application.Handlers.Commands;

public class SetMatchResultCommandHandler(IMatchRepository repository, IMapper mapper) : IRequestHandler<SetMatchResultCommand, MatchResponse>
{
    private readonly IMatchRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<MatchResponse> Handle(SetMatchResultCommand request, CancellationToken cancellationToken)
    {
        var match = await _repository.GetByIdAsync(request.MatchId);

        if (match is null)
        {
            throw new KeyNotFoundException($"Match with id {request.MatchId} not found");
        }

        var homeGoals = new GoalCount(request.HomeGoals);
        var awayGoals = new GoalCount(request.AwayGoals);

        match.SetResult(homeGoals, awayGoals);

        await _repository.UpdateAsync(match);
        await _repository.SaveChangesAsync();

        return _mapper.Map<MatchResponse>(match);
    }
}
