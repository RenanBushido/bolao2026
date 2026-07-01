namespace Bolao.Domain.Aggregates;

public class Team
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
    public string Coach { get; set; } = string.Empty;
    private readonly List<Player> _players = new();
    public IReadOnlyList<Player> Players => _players.AsReadOnly();

    public Team(string name, Guid countryId, string coach)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Team name é obrigatório", nameof(name));
        if (countryId == Guid.Empty)
            throw new ArgumentException("CountryId é obrigatório", nameof(countryId));
        if (string.IsNullOrWhiteSpace(coach))
            throw new ArgumentException("Coach name é obrigatório", nameof(coach));

        Id = Guid.NewGuid();
        Name = name;
        CountryId = countryId;
        Coach = coach;
    }

    public void AddPlayer(Player player)
    {
        if (player == null)
            throw new ArgumentNullException(nameof(player));
        if (_players.Count >= 23)
            throw new InvalidOperationException("Team não pode ter mais de 23 players");
        if (_players.Any(p => p.ShirtNumber == player.ShirtNumber))
            throw new InvalidOperationException($"Player com número {player.ShirtNumber} já existe no time");
        if (_players.Any(p => p.Name == player.Name))
            throw new InvalidOperationException($"Player {player.Name} já existe no time");

        _players.Add(player);
    }

    private Team() { }
}
