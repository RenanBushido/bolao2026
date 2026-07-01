namespace Bolao.Application.Handlers.Queries;

public class GetLeaderboardQueryHandler(IUserRepository repository, IMapper mapper) : IRequestHandler<GetLeaderboardQuery, List<UserResponse>>
{
    private readonly IUserRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<List<UserResponse>> Handle(GetLeaderboardQuery request, CancellationToken cancellationToken)
    {
        var leaderboard = await _repository.GetLeaderboardAsync(request.Top);

        return _mapper.Map<List<UserResponse>>(leaderboard);
    }
}
