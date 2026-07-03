var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApiDatabase(builder.Configuration);
builder.Services.ApiAddValidators();
builder.Services.ApiAddAutoMapper();
builder.Services.ApiAddMediaTr();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

app.ApplyMigrations();

// Exception handling middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(cfg =>
    {
        cfg.DocumentTitle = "Bolao 2026 - API";
        cfg.SwaggerEndpoint("/swagger/v1/swagger.json", cfg.DocumentTitle);
    });
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
