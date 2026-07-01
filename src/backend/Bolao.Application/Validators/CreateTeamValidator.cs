namespace Bolao.Application.Validators;

public class CreateTeamValidator : AbstractValidator<TeamRequest>
{
    public CreateTeamValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name é obrigatório")
            .Length(2, 100).WithMessage("Name deve ter entre 2 e 100 caracteres");

        RuleFor(x => x.Coach)
            .NotEmpty().WithMessage("Coach é obrigatório")
            .Length(2, 100).WithMessage("Coach deve ter entre 2 e 100 caracteres");

        RuleFor(x => x.CountryId)
            .NotEmpty().WithMessage("CountryId é obrigatório");
    }
}
