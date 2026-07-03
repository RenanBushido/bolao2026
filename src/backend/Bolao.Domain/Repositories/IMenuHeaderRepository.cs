namespace Bolao.Domain.Repositories;

public interface IMenuHeaderRepository : IRepository<MenuHeader>
{
    Task<IEnumerable<MenuHeader>> GetAllActiveMenus();
    Task ActiveMenu(Guid id);
    Task DesactiveMenu(Guid id);
}