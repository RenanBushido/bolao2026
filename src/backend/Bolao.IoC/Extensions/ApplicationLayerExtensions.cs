namespace Bolao.IoC.Extensions;

public static class ApplicationLayerExtensions
{
    public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
    {
        // MediatR with ValidationBehavior pipeline
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(typeof(ChampionshipRequest).Assembly);
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        // AutoMapper
        services.AddAutoMapper(typeof(MappingProfile).Assembly);

        // FluentValidation
        services.AddValidatorsFromAssembly(typeof(CreateChampionshipValidator).Assembly);

        return services;
    }
}
