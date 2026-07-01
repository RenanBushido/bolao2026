namespace Bolao.Application.Handlers.Queries;

public class GetUserByEmailQueryHandler(IUserRepository repository, IMapper mapper) : IRequestHandler<GetUserByEmailQuery, UserResponse>
{
    private readonly IUserRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<UserResponse> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
    {
        var user = await _repository.GetByEmailAsync(request.Email);

        return user is null ? throw new KeyNotFoundException($"User with email {request.Email} not found") : _mapper.Map<UserResponse>(user);
    }
}
