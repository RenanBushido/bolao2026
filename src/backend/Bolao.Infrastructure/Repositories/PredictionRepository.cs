namespace Bolao.Infrastructure.Repositories;

public class PredictionRepository(ApplicationDbContext context) : Repository<Prediction>(context), IPredictionRepository
{
    public async Task<Prediction?> GetByUserAndMatchAsync(Guid userId, Guid matchId)
    {
        return await _context.Predictions
            .FirstOrDefaultAsync(p => p.UserId == userId && p.MatchId == matchId);
    }

    public async Task<IEnumerable<Prediction>> GetByUserAsync(Guid userId)
    {
        return await _context.Predictions
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Prediction>> GetByMatchAsync(Guid matchId)
    {
        return await _context.Predictions
            .Where(p => p.MatchId == matchId)
            .ToListAsync();
    }
}
