namespace Bolao.Domain.Entities;

public class Player
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid TeamId { get; set; }
    public string Position { get; set; } = string.Empty;
    public int ShirtNumber { get; set; }

    public Player(Guid teamId, string name, string position, int shirtNumber)
    {
        if (teamId == Guid.Empty)
            throw new ArgumentException("TeamId é obrigatório", nameof(teamId));
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Player name é obrigatório", nameof(name));
        if (string.IsNullOrWhiteSpace(position) || !IsValidPosition(position))
            throw new ArgumentException("Position inválida (GK, DEF, MID, FWD)", nameof(position));
        if (shirtNumber < 1 || shirtNumber > 99)
            throw new ArgumentException("Shirt number deve estar entre 1 e 99", nameof(shirtNumber));

        Id = Guid.NewGuid();
        TeamId = teamId;
        Name = name;
        Position = position.ToUpper();
        ShirtNumber = shirtNumber;
    }

    private static bool IsValidPosition(string position) =>
        position.ToUpper() is "GK" or "DEF" or "MID" or "FWD";

    private Player() { }
}
