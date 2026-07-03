namespace Bolao.Api.Controllers;

/// <summary>
/// Endpoints for managing teams.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TeamController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    /// <summary>
    /// Create a new team.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(TeamResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<TeamResponse>> CreateTeam(
        [FromBody] TeamRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateTeamCommand(request.Name, request.CountryId, request.Coach);
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetTeam), new { id = result.Id }, result);
    }

    /// <summary>
    /// Get a team by ID.
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(TeamResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TeamResponse>> GetTeam(
        Guid id,
        CancellationToken cancellationToken)
    {
        var query = new GetTeamQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// List all teams.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<TeamResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<TeamResponse>>> ListTeams(
        [FromQuery] Guid? championshipId,
        CancellationToken cancellationToken)
    {
        var query = new ListTeamsQuery(championshipId);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }
}
