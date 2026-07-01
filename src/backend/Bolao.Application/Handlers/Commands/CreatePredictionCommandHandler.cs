namespace Bolao.Application.Handlers.Commands;

public class CreatePredictionCommandHandler(IPredictionRepository repository, IMatchRepository matchRepository, IMapper mapper) : IRequestHandler<CreatePredictionCommand, PredictionResponse>
{
    private readonly IPredictionRepository _repository = repository;
    private readonly IMatchRepository _matchRepository = matchRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<PredictionResponse> Handle(CreatePredictionCommand request, CancellationToken cancellationToken)
    {
        var match = await _matchRepository.GetByIdAsync(request.MatchId);
        if (match is null)
        {
            throw new KeyNotFoundException($"Match with id {request.MatchId} not found");
        }

        var homeGoals = new GoalCount(request.PredictedHomeGoals);
        var awayGoals = new GoalCount(request.PredictedAwayGoals);

        var prediction = new Prediction(
            request.UserId,
            request.MatchId,
            homeGoals,
            awayGoals,
            match.ScheduledDateTime
        );

        await _repository.AddAsync(prediction);
        await _repository.SaveChangesAsync();

        return _mapper.Map<PredictionResponse>(prediction);
    }
}
