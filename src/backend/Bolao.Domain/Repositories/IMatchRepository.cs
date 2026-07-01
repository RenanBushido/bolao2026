using Bolao.Domain.Aggregates;

namespace Bolao.Domain.Repositories;

public interface IMatchRepository : IRepository<Match>
{
    Task<Match?> GetWithResultAsync(Guid id);
    Task<IEnumerable<Match>> GetByChampionshipAsync(Guid championshipId);
    Task<IEnumerable<Match>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
}
