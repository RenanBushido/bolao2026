using Bolao.Domain.Aggregates;

namespace Bolao.Domain.Repositories;

public interface IChampionshipRepository : IRepository<Championship>
{
    Task<Championship?> GetByYearAsync(int year);
    Task<Championship?> GetWithGroupsAsync(Guid id);
}
