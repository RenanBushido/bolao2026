namespace Bolao.Application.Handlers.Queries;

public class GetPredictionQueryHandler(IPredictionRepository repository, IMapper mapper) : IRequestHandler<GetPredictionQuery, PredictionResponse>
{
    private readonly IPredictionRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<PredictionResponse> Handle(GetPredictionQuery request, CancellationToken cancellationToken)
    {
        var prediction = await _repository.GetByIdAsync(request.Id);

        return prediction is null
            ? throw new KeyNotFoundException($"Prediction with id {request.Id} not found")
            : _mapper.Map<PredictionResponse>(prediction);
    }
}
