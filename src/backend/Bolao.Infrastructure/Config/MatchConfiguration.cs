namespace Bolao.Infrastructure.Config;

public class MatchConfiguration : IEntityTypeConfiguration<Match>
{
    public void Configure(EntityTypeBuilder<Match> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.HomeTeamId).IsRequired();
        builder.Property(m => m.AwayTeamId).IsRequired();
        builder.Property(m => m.StadiumId).IsRequired();
        builder.Property(m => m.ScheduledDateTime).IsRequired();
        builder.Property(m => m.Phase).IsRequired();
        builder.Property(m => m.Status).IsRequired();

        builder.OwnsOne(m => m.Result, result =>
        {
            result.Property(r => r.CreatedAt).IsRequired();
            result.OwnsOne(r => r.HomeGoals, homeGoals =>
            {
                homeGoals.Property(g => g.Value).HasColumnName("HomeGoals");
            });
            result.OwnsOne(r => r.AwayGoals, awayGoals =>
            {
                awayGoals.Property(g => g.Value).HasColumnName("AwayGoals");
            });
        });

        builder.ToTable("Matches");
    }
}
