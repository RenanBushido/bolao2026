namespace Bolao.Api.Controllers;

/// <summary>
/// Endpoints for managing matches.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class MatchController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    /// <summary>
    /// Create a new match.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(MatchResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<MatchResponse>> CreateMatch(
        [FromBody] CreateMatchRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateMatchCommand(
            request.ChampionshipId,
            request.HomeTeamId,
            request.AwayTeamId,
            request.ScheduledAt,
            request.VenueId,
            request.Phase
        );
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetMatch), new { id = result.Id }, result);
    }

    /// <summary>
    /// Get a match by ID.
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(MatchResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MatchResponse>> GetMatch(
        Guid id,
        CancellationToken cancellationToken)
    {
        var query = new GetMatchQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// List all matches.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<MatchResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<MatchResponse>>> ListMatches(
        [FromQuery] Guid? championshipId,
        CancellationToken cancellationToken)
    {
        var query = new ListMatchesQuery(championshipId);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Set the final result of a match.
    /// </summary>
    [HttpPut("{id}/result")]
    [ProducesResponseType(typeof(MatchResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<MatchResponse>> SetMatchResult(
        Guid id,
        [FromBody] SetMatchResultRequest request,
        CancellationToken cancellationToken)
    {
        var command = new SetMatchResultCommand(id, request.HomeGoals, request.AwayGoals);
        var result = await _mediator.Send(command, cancellationToken);
        return Ok(result);
    }
}

public class CreateMatchRequest
{
    public Guid ChampionshipId { get; set; }
    public Guid HomeTeamId { get; set; }
    public Guid AwayTeamId { get; set; }
    public DateTime ScheduledAt { get; set; }
    public Guid VenueId { get; set; }
    public TournamentPhase Phase { get; set; } = TournamentPhase.GroupStage;
}

public class SetMatchResultRequest
{
    public int HomeGoals { get; set; }
    public int AwayGoals { get; set; }
}
