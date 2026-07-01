namespace Bolao.Application.Validators;

public class CreateChampionshipValidator : AbstractValidator<ChampionshipRequest>
{
    public CreateChampionshipValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name é obrigatório")
            .Length(3, 100).WithMessage("Name deve ter entre 3 e 100 caracteres");

        RuleFor(x => x.Year)
            .GreaterThanOrEqualTo(2000).WithMessage("Year deve ser >= 2000")
            .LessThanOrEqualTo(2100).WithMessage("Year deve ser <= 2100");
    }
}
