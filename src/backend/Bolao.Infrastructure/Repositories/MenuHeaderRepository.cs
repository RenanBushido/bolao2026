namespace Bolao.Infrastructure.Repositories;

public class MenuHeaderRepository(ApplicationDbContext context): Repository<MenuHeader>(context),  IMenuHeaderRepository
{
    private readonly ApplicationDbContext _context = context;

    public async Task ActiveMenu(Guid id)
    {
        var menuHeader = await _context.MenuHeaders.SingleOrDefaultAsync(m => m.Id == id) ?? throw new ArgumentNullException(nameof(MenuHeader));
        
        menuHeader.Active = true;
        
        _context.MenuHeaders.Update(menuHeader);
    }

    public async Task DesactiveMenu(Guid id)
    {
        var menuHeader = await _context.MenuHeaders.SingleOrDefaultAsync(m => m.Id == id) ?? throw new ArgumentNullException(nameof(MenuHeader));
        
        menuHeader.Active = false;
        
        _context.MenuHeaders.Update(menuHeader);
    }

    public async Task<IEnumerable<MenuHeader>> GetAllActiveMenus()
    {
        return await _context.MenuHeaders.Where(m => m.Active).ToListAsync();
    }
}