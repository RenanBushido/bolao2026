namespace Bolao.Application.Handlers.Commands;

public class CreateTeamCommandHandler(ITeamRepository repository, IMapper mapper, IUnitOfWork unitOfWork) : IRequestHandler<CreateTeamCommand, TeamResponse>
{
    private readonly ITeamRepository _repository = repository;
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<TeamResponse> Handle(CreateTeamCommand request, CancellationToken cancellationToken)
    {
        var team = new Team(request.Name, request.CountryId, request.Coach);

        await _repository.AddAsync(team);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return _mapper.Map<TeamResponse>(team);
    }
}
