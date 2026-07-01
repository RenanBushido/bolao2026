namespace Bolao.Application.Handlers.Queries;

public class GetUserPredictionsQueryHandler(IPredictionRepository repository, IMapper mapper) : IRequestHandler<GetUserPredictionsQuery, List<PredictionResponse>>
{
    private readonly IPredictionRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<List<PredictionResponse>> Handle(GetUserPredictionsQuery request, CancellationToken cancellationToken)
    {
        var predictions = await _repository.GetByUserAsync(request.UserId);

        return _mapper.Map<List<PredictionResponse>>(predictions);
    }
}
