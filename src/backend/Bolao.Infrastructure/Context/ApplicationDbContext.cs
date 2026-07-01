using Microsoft.EntityFrameworkCore;

namespace Bolao.Infrastructure.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurações de entidades serão adicionadas aqui
        // nas próximas fases de desenvolvimento
    }
}
