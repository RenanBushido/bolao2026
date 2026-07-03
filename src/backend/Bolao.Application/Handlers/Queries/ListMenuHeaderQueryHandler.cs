namespace Bolao.Application.Handlers.Queries;

public class ListMenuHeaderQueryHandler(
    IMenuHeaderRepository repository,
    IMapper mapper
) : IRequestHandler<ListMenuHeaderQuery, List<MenuHeaderResponse>>
{
    private readonly IMenuHeaderRepository _repository = repository;
    private readonly IMapper _mapper = mapper;

    public async Task<List<MenuHeaderResponse>> Handle(ListMenuHeaderQuery request, CancellationToken cancellationToken)
    {
        var result = await _repository.GetAllActiveMenus();

        return _mapper.Map<List<MenuHeaderResponse>>(result);
    }
}