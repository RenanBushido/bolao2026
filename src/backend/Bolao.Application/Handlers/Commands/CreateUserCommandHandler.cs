namespace Bolao.Application.Handlers.Commands;

public class CreateUserCommandHandler(IUserRepository repository, IMapper mapper) : IRequestHandler<CreateUserCommand, UserResponse>
{
    private readonly IUserRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<UserResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User(request.Email, request.Name);

        await _repository.AddAsync(user);
        await _repository.SaveChangesAsync();

        return _mapper.Map<UserResponse>(user);
    }
}
