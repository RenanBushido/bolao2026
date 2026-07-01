namespace Bolao.Domain.Entities;

public class KnockoutStage
{
    public Guid Id { get; set; }
    public Guid ChampionshipId { get; set; }
    private readonly Dictionary<string, List<Guid>> _phaseTeams = new()
    {
        { "Round16", new List<Guid>() },
        { "Quarterfinals", new List<Guid>() },
        { "Semifinals", new List<Guid>() },
        { "Final", new List<Guid>() }
    };

    public KnockoutStage(Guid championshipId)
    {
        if (championshipId == Guid.Empty)
            throw new ArgumentException("ChampionshipId é obrigatório", nameof(championshipId));

        Id = Guid.NewGuid();
        ChampionshipId = championshipId;
    }

    public void AdvanceTeam(string phase, Guid teamId)
    {
        if (!_phaseTeams.ContainsKey(phase))
            throw new ArgumentException($"Fase '{phase}' não existe", nameof(phase));
        if (teamId == Guid.Empty)
            throw new ArgumentException("TeamId é obrigatório", nameof(teamId));

        _phaseTeams[phase].Add(teamId);
    }

    public IReadOnlyList<Guid> GetTeamsInPhase(string phase)
    {
        if (!_phaseTeams.ContainsKey(phase))
            throw new ArgumentException($"Fase '{phase}' não existe", nameof(phase));
        return _phaseTeams[phase].AsReadOnly();
    }

    private KnockoutStage() { }
}
