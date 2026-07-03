namespace Bolao.Application.Handlers.Commands;
public class CreateMenuHeaderCommandHandler(
    IMenuHeaderRepository repository,
    IMapper mapper,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateMenuHeaderCommand, MenuHeaderResponse>
{
    private readonly IMenuHeaderRepository _repository = repository;
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<MenuHeaderResponse> Handle(CreateMenuHeaderCommand request, CancellationToken cancellationToken)
    {
        var menuHeader = new MenuHeader(request.Nome, request.Href);

        await _repository.AddAsync(menuHeader);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return _mapper.Map<MenuHeaderResponse>(menuHeader);
    }
}