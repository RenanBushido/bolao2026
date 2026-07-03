namespace Bolao.Application.Handlers.Commands;

public class CreateChampionshipCommandHandler(IChampionshipRepository repository, IMapper mapper, IUnitOfWork unitOfWork) : IRequestHandler<CreateChampionshipCommand, ChampionshipResponse>
{
    private readonly IChampionshipRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<ChampionshipResponse> Handle(CreateChampionshipCommand request, CancellationToken cancellationToken)
    {
        var championship = new Championship(request.Name, request.Year);

        await _repository.AddAsync(championship);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return _mapper.Map<ChampionshipResponse>(championship);
    }
}
