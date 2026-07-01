namespace Bolao.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : Repository<User>(context), IUserRepository
{
    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email.ToLower());
    }

    public async Task<IEnumerable<User>> GetLeaderboardAsync(int top = 100)
    {
        return await _context.Users
            .OrderByDescending(u => u.TotalScore.Value)
            .Take(top)
            .ToListAsync();
    }

    public async Task<User?> GetWithPredictionsAsync(Guid id)
    {
        return await _context.Users
            .Include(u => u.PredictionIds)
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}
