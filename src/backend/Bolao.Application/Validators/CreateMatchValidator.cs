namespace Bolao.Application.Validators;

public class CreateMatchValidator : AbstractValidator<CreateMatchCommand>
{
    public CreateMatchValidator()
    {
        RuleFor(x => x.ChampionshipId)
            .NotEmpty().WithMessage("ChampionshipId é obrigatório");

        RuleFor(x => x.HomeTeamId)
            .NotEmpty().WithMessage("HomeTeamId é obrigatório")
            .NotEqual(x => x.AwayTeamId).WithMessage("HomeTeamId e AwayTeamId não podem ser iguais");

        RuleFor(x => x.AwayTeamId)
            .NotEmpty().WithMessage("AwayTeamId é obrigatório");

        RuleFor(x => x.ScheduledAt)
            .GreaterThan(DateTime.UtcNow).WithMessage("ScheduledAt deve ser no futuro");

        RuleFor(x => x.VenueId)
            .NotEmpty().WithMessage("VenueId é obrigatório");
    }
}
