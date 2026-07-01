namespace Bolao.Infrastructure.Repositories;

public class TeamRepository(ApplicationDbContext context) : Repository<Team>(context), ITeamRepository
{
    public async Task<Team?> GetByCountryIdAsync(Guid countryId)
    {
        return await _context.Teams
            .FirstOrDefaultAsync(t => t.CountryId == countryId);
    }

    public async Task<Team?> GetWithPlayersAsync(Guid id)
    {
        return await _context.Teams
            .Include(t => t.Players)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<Team>> GetByChampionshipAsync(Guid championshipId)
    {
        return await _context.Groups
            .Where(g => g.ChampionshipId == championshipId)
            .SelectMany(g => _context.Teams.Where(t => g.TeamIds.Contains(t.Id)))
            .Distinct()
            .ToListAsync();
    }
}
