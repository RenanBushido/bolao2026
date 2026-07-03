namespace Bolao.IoC.Extensions;

public static class InfrastructureExtensions
{
    public static IServiceCollection AddApiDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        // Register Repositories
        services.AddScoped<IChampionshipRepository, ChampionshipRepository>();
        services.AddScoped<ITeamRepository, TeamRepository>();
        services.AddScoped<IMatchRepository, MatchRepository>();
        services.AddScoped<IPredictionRepository, PredictionRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IMenuHeaderRepository, MenuHeaderRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }

    public static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateAsyncScope();

        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        db?.Database.EnsureCreated();

        db?.Database.Migrate();

        if(!db!.MenuHeaders.Any())
        {
            db.MenuHeaders.Add(new MenuHeader("Home","/Home"));

            db.SaveChanges();
        }
    } 
}
