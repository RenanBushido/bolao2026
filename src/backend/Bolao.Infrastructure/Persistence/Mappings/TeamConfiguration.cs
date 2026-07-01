using Bolao.Domain.Aggregates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bolao.Infrastructure.Persistence.Mappings;

public class TeamConfiguration : IEntityTypeConfiguration<Team>
{
    public void Configure(EntityTypeBuilder<Team> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(t => t.Coach)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(t => t.CountryId)
            .IsRequired();

        builder.ToTable("Teams");
    }
}
