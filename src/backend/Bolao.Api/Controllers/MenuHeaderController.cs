namespace Bolao.Api.Controllers;

[ApiController]
[Route("api/menus")]
public class MenuHeaderController(IMediator mediator): ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    [ProducesResponseType(typeof(List<MenuHeaderResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<MenuHeaderResponse>>> ListMenuHeaders(CancellationToken cancellationToken)
    {
        var command = new ListMenuHeaderQuery();
        var result = await _mediator.Send(command, cancellationToken);

        return Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(MenuHeaderResponse), StatusCodes.Status201Created)]
    public async Task<ActionResult<MenuHeaderResponse>> CreateMenuHeader(CreateMenuHeaderCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);

        return result;
    }
}