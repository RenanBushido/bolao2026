using Bolao.Domain.Aggregates;

namespace Bolao.Domain.Repositories;

public interface ITeamRepository : IRepository<Team>
{
    Task<Team?> GetByCountryIdAsync(Guid countryId);
    Task<Team?> GetWithPlayersAsync(Guid id);
    Task<IEnumerable<Team>> GetByChampionshipAsync(Guid championshipId);
}
