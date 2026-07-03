namespace Bolao.Domain.Entities;

public class MenuHeader
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string Href { get; set; }
    public bool Active { get; set; }

    public MenuHeader(string nome, string href)
    {
        if (string.IsNullOrWhiteSpace(nome))
            throw new ArgumentException("City name é obrigatório", nameof(nome));

        if (string.IsNullOrWhiteSpace(href))
            throw new ArgumentException("City name é obrigatório", nameof(href));

        Id = Guid.NewGuid();
        Nome = nome;
        Href = href;
        Active = true;
    }

    public void SetActive()
    {
        this.Active = true;
    }

    public void SetDesactive()
    {
        this.Active = false;
    }

    private MenuHeader() { }
}