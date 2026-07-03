using Bolao.Application.Extensions;

namespace Bolao.IoC.Extensions;

public static class ApplicationLayerExtensions
{
    public static IServiceCollection ApiAddAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());

        return  services;
    }

    public static IServiceCollection ApiAddValidators(this IServiceCollection services)
    {

        // FluentValidation
        services.AddScoped<CreateChampionshipValidator>();
        services.AddScoped<CreateMatchValidator>();
        services.AddScoped<CreatePredictionValidator>();
        services.AddScoped<CreateTeamValidator>();
        services.AddScoped<CreateUserValidator>();

        return services;
    }

    public static IServiceCollection ApiAddMediaTr(this IServiceCollection services)
    {
        // MediatR with ValidationBehavior pipeline
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(typeof(ChampionshipRequest).Assembly);
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        return services;
    }

}
