namespace Bolao.Domain.Entities;

public class GroupStage
{
    public Guid Id { get; set; }
    public Guid ChampionshipId { get; set; }
    private readonly List<Group> _groups = [];
    public IReadOnlyList<Group> Groups => _groups.AsReadOnly();

    public GroupStage(Guid championshipId)
    {
        if (championshipId == Guid.Empty)
            throw new ArgumentException("ChampionshipId é obrigatório", nameof(championshipId));

        Id = Guid.NewGuid();
        ChampionshipId = championshipId;
    }

    public void AddGroup(Group group)
    {
        if (group == null)
            throw new ArgumentNullException(nameof(group));
        if (_groups.Count >= 8)
            throw new InvalidOperationException("GroupStage não pode ter mais de 8 grupos");
        if (_groups.Any(g => g.Name == group.Name))
            throw new InvalidOperationException("Grupo com esse nome já existe");

        _groups.Add(group);
    }

    private GroupStage() { }
}
