namespace Bolao.Application.Handlers.Commands;

public class CreateChampionshipCommandHandler(IChampionshipRepository repository, IMapper mapper) : IRequestHandler<CreateChampionshipCommand, ChampionshipResponse>
{
    private readonly IChampionshipRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<ChampionshipResponse> Handle(CreateChampionshipCommand request, CancellationToken cancellationToken)
    {
        var championship = new Championship(request.Name, request.Year);

        await _repository.AddAsync(championship);
        await _repository.SaveChangesAsync();

        return _mapper.Map<ChampionshipResponse>(championship);
    }
}
