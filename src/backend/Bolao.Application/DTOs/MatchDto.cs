namespace Bolao.Application.DTOs;

public class MatchResponse
{
    public Guid Id { get; set; }
    public Guid HomeTeamId { get; set; }
    public Guid AwayTeamId { get; set; }
    public Guid StadiumId { get; set; }
    public DateTime ScheduledAt { get; set; }
    public MatchStatus Status { get; set; }
    public TournamentPhase Phase { get; set; }
}

public class CreateMatchCommand(Guid championshipId, Guid homeTeamId, Guid awayTeamId, DateTime scheduledAt, Guid venueId, TournamentPhase phase) : IRequest<MatchResponse>
{
    public Guid ChampionshipId { get; set; } = championshipId;
    public Guid HomeTeamId { get; set; } = homeTeamId;
    public Guid AwayTeamId { get; set; } = awayTeamId;
    public DateTime ScheduledAt { get; set; } = scheduledAt;
    public Guid VenueId { get; set; } = venueId;
    public TournamentPhase Phase { get; set; } = phase;
}

public class SetMatchResultCommand(Guid matchId, int homeGoals, int awayGoals) : IRequest<MatchResponse>
{
    public Guid MatchId { get; set; } = matchId;
    public int HomeGoals { get; set; } = homeGoals;
    public int AwayGoals { get; set; } = awayGoals;
}

public class GetMatchQuery(Guid id) : IRequest<MatchResponse>
{
    public Guid Id { get; set; } = id;
}

public class ListMatchesQuery(Guid? championshipId = null) : IRequest<List<MatchResponse>>
{
    public Guid? ChampionshipId { get; set; } = championshipId;
}
