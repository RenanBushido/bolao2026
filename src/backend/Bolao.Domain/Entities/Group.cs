namespace Bolao.Domain.Entities;

public class Group
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid ChampionshipId { get; set; }
    private readonly List<Guid> _teamIds = new();
    public IReadOnlyList<Guid> TeamIds => _teamIds.AsReadOnly();

    public Group(string name, Guid championshipId)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Group name é obrigatório", nameof(name));
        if (championshipId == Guid.Empty)
            throw new ArgumentException("ChampionshipId é obrigatório", nameof(championshipId));

        Id = Guid.NewGuid();
        Name = name;
        ChampionshipId = championshipId;
    }

    public void AddTeam(Guid teamId)
    {
        if (teamId == Guid.Empty)
            throw new ArgumentException("TeamId é obrigatório", nameof(teamId));
        if (_teamIds.Count >= 4)
            throw new InvalidOperationException("Group não pode ter mais de 4 teams");
        if (_teamIds.Contains(teamId))
            throw new InvalidOperationException("Team já existe no Group");

        _teamIds.Add(teamId);
    }

    private Group() { }
}
