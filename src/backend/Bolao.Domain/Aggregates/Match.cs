namespace Bolao.Domain.Aggregates;

public class Match
{
    public Guid Id { get; set; }
    public Guid HomeTeamId { get; set; }
    public Guid AwayTeamId { get; set; }
    public Guid StadiumId { get; set; }
    public DateTime ScheduledDateTime { get; set; }
    public TournamentPhase Phase { get; set; }
    public MatchStatus Status { get; set; }
    public MatchResult? Result { get; set; }

    public Match(Guid homeTeamId, Guid awayTeamId, Guid stadiumId, DateTime scheduledDateTime, TournamentPhase phase)
    {
        if (homeTeamId == Guid.Empty || awayTeamId == Guid.Empty)
            throw new ArgumentException("Team IDs são obrigatórios");
        if (stadiumId == Guid.Empty)
            throw new ArgumentException("StadiumId é obrigatório");
        if (homeTeamId == awayTeamId)
            throw new ArgumentException("Times não podem ser iguais");
        if (scheduledDateTime <= DateTime.UtcNow)
            throw new ArgumentException("ScheduledDateTime deve ser no futuro");

        Id = Guid.NewGuid();
        HomeTeamId = homeTeamId;
        AwayTeamId = awayTeamId;
        StadiumId = stadiumId;
        ScheduledDateTime = scheduledDateTime;
        Phase = phase;
        Status = MatchStatus.Scheduled;
    }

    public void SetResult(GoalCount homeGoals, GoalCount awayGoals)
    {
        var now = DateTime.UtcNow;
        if (now < ScheduledDateTime)
            throw new InvalidOperationException("Match ainda não começou");

        Result = new MatchResult(homeGoals, awayGoals);
        Status = MatchStatus.Finished;
    }

    public bool CanCreatePrediction()
    {
        var now = DateTime.UtcNow;
        var twoHoursBefore = ScheduledDateTime.AddHours(-2);
        return now <= twoHoursBefore && Status == MatchStatus.Scheduled;
    }

    private Match() { }
}
