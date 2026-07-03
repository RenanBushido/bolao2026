namespace Bolao.Application.Handlers.Commands;

public class SetActiveMenuHeaderCommandHandler(
    IMenuHeaderRepository repository,
    IUnitOfWork unitOfWork
) : IRequestHandler<ActiveMenuHeaderCommand,ActiveMenuHeaderResponse>
{
    private readonly IMenuHeaderRepository _repository = repository;    
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<ActiveMenuHeaderResponse> Handle(ActiveMenuHeaderCommand request, CancellationToken cancellationToken)
    {
        var menuId = Guid.Parse(request.Id);

        await _repository.ActiveMenu(menuId);
        
        var response = new ActiveMenuHeaderResponse();

        var result = await _unitOfWork.SaveChangesAsync(cancellationToken);

        response.IsSuccess = result > 0;

        return response;
    }
}