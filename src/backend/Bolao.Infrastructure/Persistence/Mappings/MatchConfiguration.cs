using Bolao.Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bolao.Infrastructure.Persistence.Mappings;

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

        builder.ToTable("Matches");
    }
}
