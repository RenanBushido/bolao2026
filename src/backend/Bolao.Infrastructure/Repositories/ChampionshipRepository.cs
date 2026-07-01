namespace Bolao.Infrastructure.Repositories;

public class ChampionshipRepository(ApplicationDbContext context) : Repository<Championship>(context), IChampionshipRepository
{
    public async Task<Championship?> GetByYearAsync(int year)
    {
        return await _context.Championships
            .FirstOrDefaultAsync(c => c.Year == year);
    }

    public async Task<Championship?> GetWithGroupsAsync(Guid id)
    {
        return await _context.Championships
            .Include(c => c.GroupStage)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}
