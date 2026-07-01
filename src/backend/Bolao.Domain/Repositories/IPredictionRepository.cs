using Bolao.Domain.Aggregates;

namespace Bolao.Domain.Repositories;

public interface IPredictionRepository : IRepository<Prediction>
{
    Task<Prediction?> GetByUserAndMatchAsync(Guid userId, Guid matchId);
    Task<IEnumerable<Prediction>> GetByUserAsync(Guid userId);
    Task<IEnumerable<Prediction>> GetByMatchAsync(Guid matchId);
}
