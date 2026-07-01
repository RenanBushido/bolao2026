using Bolao.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bolao.Api.Controllers;

/// <summary>
/// Endpoints for managing users.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Create a new user account.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult<UserResponse>> CreateUser(
        [FromBody] CreateUserRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateUserCommand(request.Email, request.Name);
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetUser), new { id = result.Id }, result);
    }

    /// <summary>
    /// Get a user by ID.
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserResponse>> GetUser(
        Guid id,
        CancellationToken cancellationToken)
    {
        var query = new GetUserQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Get a user by email address.
    /// </summary>
    [HttpGet("email/{email}")]
    [ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserResponse>> GetUserByEmail(
        string email,
        CancellationToken cancellationToken)
    {
        var query = new GetUserByEmailQuery(email);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }

    /// <summary>
    /// Get the leaderboard of top scoring users.
    /// </summary>
    [HttpGet("leaderboard")]
    [ProducesResponseType(typeof(List<UserResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<UserResponse>>> GetLeaderboard(
        [FromQuery] int top = 100,
        CancellationToken cancellationToken = default)
    {
        var query = new GetLeaderboardQuery(top);
        var result = await _mediator.Send(query, cancellationToken);
        return Ok(result);
    }
}

public class CreateUserRequest
{
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}
