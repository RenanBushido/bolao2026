namespace Bolao.Application.Handlers.Commands;

public class CreateUserCommandHandler(IUserRepository repository, IMapper mapper, IUnitOfWork unitOfWork) : IRequestHandler<CreateUserCommand, UserResponse>
{
    private readonly IUserRepository _repository = repository;
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<UserResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User(request.Email, request.Name);

        await _repository.AddAsync(user);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserResponse>(user);
    }
}
