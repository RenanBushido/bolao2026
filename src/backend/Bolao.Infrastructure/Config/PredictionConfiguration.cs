namespace Bolao.Infrastructure.Config;

public class PredictionConfiguration : IEntityTypeConfiguration<Prediction>
{
    public void Configure(EntityTypeBuilder<Prediction> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.UserId).IsRequired();
        builder.Property(p => p.MatchId).IsRequired();
        builder.Property(p => p.CreatedAt).IsRequired();

        builder.OwnsOne(p => p.PredictedHomeGoals, homeGoals =>
        {
            homeGoals.Property(g => g.Value).HasColumnName("PredictedHomeGoals");
        });
        builder.OwnsOne(p => p.PredictedAwayGoals, awayGoals =>
        {
            awayGoals.Property(g => g.Value).HasColumnName("PredictedAwayGoals");
        });
        builder.OwnsOne(p => p.CalculatedPoints, points =>
        {
            points.Property(p => p.Value).HasColumnName("CalculatedPoints");
        });

        builder.HasIndex(p => new { p.UserId, p.MatchId }).IsUnique();

        builder.ToTable("Predictions");
    }
}
