using Bolao.Domain.Aggregates;

namespace Bolao.Domain.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
    Task<IEnumerable<User>> GetLeaderboardAsync(int top = 100);
    Task<User?> GetWithPredictionsAsync(Guid id);
}
