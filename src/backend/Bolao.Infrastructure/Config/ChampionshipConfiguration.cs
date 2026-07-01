namespace Bolao.Infrastructure.Config;

public class ChampionshipConfiguration : IEntityTypeConfiguration<Championship>
{
    public void Configure(EntityTypeBuilder<Championship> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.Year)
            .IsRequired();

        builder.Ignore(c => c.GroupStage);
        builder.Ignore(c => c.KnockoutStage);

        builder.ToTable("Championships");
    }
}
