namespace Bolao.Application.Validators;

public class CreatePredictionValidator : AbstractValidator<CreatePredictionCommand>
{
    public CreatePredictionValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("UserId é obrigatório");

        RuleFor(x => x.MatchId)
            .NotEmpty().WithMessage("MatchId é obrigatório");

        RuleFor(x => x.PredictedHomeGoals)
            .GreaterThanOrEqualTo(0).WithMessage("PredictedHomeGoals não pode ser negativo");

        RuleFor(x => x.PredictedAwayGoals)
            .GreaterThanOrEqualTo(0).WithMessage("PredictedAwayGoals não pode ser negativo");

        RuleFor(x => x.PredictedResult)
            .IsInEnum().WithMessage("PredictedResult deve ser um resultado válido (HomeWin, Draw, AwayWin)");
    }
}
