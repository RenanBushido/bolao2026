namespace Bolao.Infrastructure.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Championship> Championships => Set<Championship>();
    public DbSet<Team> Teams => Set<Team>();
    public DbSet<Match> Matches => Set<Match>();
    public DbSet<Prediction> Predictions => Set<Prediction>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Country> Countries => Set<Country>();
    public DbSet<City> Cities => Set<City>();
    public DbSet<Stadium> Stadiums => Set<Stadium>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<GroupStage> GroupStages => Set<GroupStage>();
    public DbSet<Player> Players => Set<Player>();
    public DbSet<MenuHeader> MenuHeaders => Set<MenuHeader>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
