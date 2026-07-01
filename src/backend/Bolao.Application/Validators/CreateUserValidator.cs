namespace Bolao.Application.Validators;

public class CreateUserValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email é obrigatório")
            .EmailAddress().WithMessage("Email deve ser um endereço válido");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name é obrigatório")
            .Length(2, 150).WithMessage("Name deve ter entre 2 e 150 caracteres");
    }
}
