namespace Bolao.Application.Handlers.Queries;

public class GetUserQueryHandler(IUserRepository repository, IMapper mapper) : IRequestHandler<GetUserQuery, UserResponse>
{
    private readonly IUserRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<UserResponse> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _repository.GetByIdAsync(request.Id);

        return user is null ? throw new KeyNotFoundException($"User with id {request.Id} not found") : _mapper.Map<UserResponse>(user);
    }
}
