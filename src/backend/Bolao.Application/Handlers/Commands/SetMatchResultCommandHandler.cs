namespace Bolao.Application.Handlers.Commands;

public class SetMatchResultCommandHandler(IMatchRepository repository, IMapper mapper, IUnitOfWork unitOfWork) : IRequestHandler<SetMatchResultCommand, MatchResponse>
{
    private readonly IMatchRepository _repository = repository;
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<MatchResponse> Handle(SetMatchResultCommand request, CancellationToken cancellationToken)
    {
        var match = await _repository.GetByIdAsync(request.MatchId) ?? throw new KeyNotFoundException($"Match with id {request.MatchId} not found");
        var homeGoals = new GoalCount(request.HomeGoals);
        var awayGoals = new GoalCount(request.AwayGoals);

        match.SetResult(homeGoals, awayGoals);

        await _repository.UpdateAsync(match);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return _mapper.Map<MatchResponse>(match);
    }
}
