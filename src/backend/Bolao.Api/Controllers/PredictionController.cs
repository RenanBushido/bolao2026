namespace Bolao.Api.Controllers;

/// <summary>
/// Endpoints for managing predictions.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PredictionController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    /// <summary>
    /// Create a new prediction (must be before 2-hour blocking window).
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(PredictionResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<PredictionResponse>> CreatePrediction(
        [FromBody] CreatePredictionRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreatePredictionCommand(
            request.UserId,
            request.MatchId,
            request.PredictedResult,
            request.PredictedHomeGoals,
            request.PredictedAwayGoals
        );
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetPrediction), new { id = result.Id }, result);
    }

    /// <summary>
    /// Get a prediction by ID.
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PredictionResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PredictionResponse>> GetPrediction(
        Guid id,
        CancellationToken cancellationToken)
    {
        var query = new GetPredictionQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Get all predictions for a specific user.
    /// </summary>
    [HttpGet("user/{userId}")]
    [ProducesResponseType(typeof(List<PredictionResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<PredictionResponse>>> GetUserPredictions(
        Guid userId,
        CancellationToken cancellationToken)
    {
        var query = new GetUserPredictionsQuery(userId);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }
}

public class CreatePredictionRequest
{
    public Guid UserId { get; set; }
    public Guid MatchId { get; set; }
    public PredictionResult PredictedResult { get; set; }
    public int PredictedHomeGoals { get; set; }
    public int PredictedAwayGoals { get; set; }
}
