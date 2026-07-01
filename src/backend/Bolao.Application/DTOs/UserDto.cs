namespace Bolao.Application.DTOs;

public class UserResponse
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int TotalScore { get; set; }
}

public class CreateUserCommand(string email, string name) : IRequest<UserResponse>
{
    public string Email { get; set; } = email;
    public string Name { get; set; } = name;
}

public class GetUserQuery(Guid id) : IRequest<UserResponse>
{
    public Guid Id { get; set; } = id;
}

public class GetUserByEmailQuery(string email) : IRequest<UserResponse>
{
    public string Email { get; set; } = email;
}

public class GetLeaderboardQuery(int top = 100) : IRequest<List<UserResponse>>
{
    public int Top { get; set; } = top;
}
