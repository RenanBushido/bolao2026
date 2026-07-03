namespace Bolao.Application.Handlers.Commands;

public class SetDesactiveMenuHeaderCommandHandler(
    IMenuHeaderRepository repository,
    IUnitOfWork unitOfWork
): IRequestHandler<ActiveMenuHeaderCommand, ActiveMenuHeaderResponse>
{
    private readonly IMenuHeaderRepository _repository = repository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<ActiveMenuHeaderResponse> Handle(ActiveMenuHeaderCommand request, CancellationToken cancellationToken)
    {
        var response = new ActiveMenuHeaderResponse();

        var menuId = Guid.Parse(request.Id);

        await _repository.DesactiveMenu(menuId);

        var result = await _unitOfWork.SaveChangesAsync(cancellationToken);

        response.IsSuccess = result > 0;

        return response;
    }
}