namespace Bolao.Application.DTOs;

public class MenuHeaderResponse
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string Href { get; set; }
    public bool Active { get; set; }
}

public class CreateMenuHeaderCommand() : IRequest<MenuHeaderResponse>
{
    public string Nome { get; set; }
    public string Href { get; set; }
}

public class ActiveMenuHeaderCommand : IRequest<ActiveMenuHeaderResponse>
{
    public string Id { get; set; }
}

public class ActiveMenuHeaderResponse
{
    public bool IsSuccess { get; set; }
}

public class SetActiveMenuHeaderCommand(string menuHeaderId) : IRequest<ActiveMenuHeaderResponse>
{
    public string MenuHeaderId { get; set; } = menuHeaderId;
}

public class ListMenuHeaderQuery : IRequest<List<MenuHeaderResponse>>
{
    
}