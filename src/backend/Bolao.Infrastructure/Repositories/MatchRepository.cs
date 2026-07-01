namespace Bolao.Infrastructure.Repositories;

public class MatchRepository(ApplicationDbContext context) : Repository<Match>(context), IMatchRepository
{
    public async Task<Match?> GetWithResultAsync(Guid id)
    {
        return await _context.Matches
            .Include(m => m.Result)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<IEnumerable<Match>> GetByChampionshipAsync(Guid championshipId)
    {
        return await _context.Matches
            .Where(m => m.HomeTeamId != Guid.Empty) // Placeholder: real impl depende de Championship ter Matches
            .ToListAsync();
    }

    public async Task<IEnumerable<Match>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
    {
        return await _context.Matches
            .Where(m => m.ScheduledDateTime >= startDate && m.ScheduledDateTime <= endDate)
            .OrderBy(m => m.ScheduledDateTime)
            .ToListAsync();
    }
}
