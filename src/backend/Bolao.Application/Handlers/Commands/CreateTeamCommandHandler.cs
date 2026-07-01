namespace Bolao.Application.Handlers.Commands;

public class CreateTeamCommandHandler(ITeamRepository repository, IMapper mapper) : IRequestHandler<CreateTeamCommand, TeamResponse>
{
    private readonly ITeamRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<TeamResponse> Handle(CreateTeamCommand request, CancellationToken cancellationToken)
    {
        var team = new Team(request.Name, request.CountryId, request.Coach);

        await _repository.AddAsync(team);
        await _repository.SaveChangesAsync();

        return _mapper.Map<TeamResponse>(team);
    }
}
