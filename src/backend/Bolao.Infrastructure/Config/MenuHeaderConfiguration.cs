namespace Bolao.Infrastructure.Config;

public class MenuHeaderConfiguration : IEntityTypeConfiguration<MenuHeader>
{
    public void Configure(EntityTypeBuilder<MenuHeader> builder)
    {
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
            .HasColumnName("Id")
            .HasColumnType("uuid")
            .IsRequired();

        builder.Property(b => b.Nome)
            .HasColumnName("Nome")
            .HasColumnType("varchar")
            .HasMaxLength(15)
            .IsRequired();

        builder.Property(b => b.Href)
            .HasColumnName("Href")
            .HasColumnType("varchar")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(b => b.Active)
            .HasColumnName("Active")
            .IsRequired();

        builder.ToTable("MenuHeader");
    }
}