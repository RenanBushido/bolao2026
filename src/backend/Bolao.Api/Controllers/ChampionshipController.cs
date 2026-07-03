namespace Bolao.Api.Controllers;

/// <summary>
/// Endpoints for managing championships.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ChampionshipController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    /// <summary>
    /// Create a new championship.
    /// </summary>
    /// <param name="request">Championship name and year</param>
    /// <returns>Created championship with ID</returns>
    [HttpPost]
    [ProducesResponseType(typeof(ChampionshipResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<ChampionshipResponse>> CreateChampionship(
        [FromBody] ChampionshipRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateChampionshipCommand(request.Name, request.Year);
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetChampionship), new { id = result.Id }, result);
    }

    /// <summary>
    /// Get a championship by ID.
    /// </summary>
    /// <param name="id">Championship ID</param>
    /// <returns>Championship details</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ChampionshipResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ChampionshipResponse>> GetChampionship(
        Guid id,
        CancellationToken cancellationToken)
    {
        var query = new GetChampionshipQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// List all championships.
    /// </summary>
    /// <returns>List of championships</returns>
    [HttpGet]
    [ProducesResponseType(typeof(List<ChampionshipResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<ChampionshipResponse>>> ListChampionships(
        CancellationToken cancellationToken)
    {
        var query = new GetChampionshipsQuery();
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }
}
