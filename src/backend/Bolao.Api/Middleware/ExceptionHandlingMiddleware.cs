namespace Bolao.Api.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "An unhandled exception occurred");
            await HandleExceptionAsync(context, exception);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = new ErrorResponse { Timestamp = DateTime.UtcNow };

        return exception switch
        {
            ValidationException validationException => HandleValidationException(context, response, validationException),
            KeyNotFoundException => HandleNotFound(context, response),
            InvalidOperationException => HandleInvalidOperation(context, response, exception),
            _ => HandleUnhandledException(context, response, exception)
        };
    }

    private static Task HandleValidationException(HttpContext context, ErrorResponse response, ValidationException ex)
    {
        context.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
        response.StatusCode = 422;
        response.Message = "Validation failed";
        response.Errors = ex.Errors
            .GroupBy(f => f.PropertyName)
            .ToDictionary(g => g.Key, g => g.Select(f => f.ErrorMessage).ToArray());

        return context.Response.WriteAsJsonAsync(response);
    }

    private static Task HandleNotFound(HttpContext context, ErrorResponse response)
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        response.StatusCode = 404;
        response.Message = "Resource not found";

        return context.Response.WriteAsJsonAsync(response);
    }

    private static Task HandleInvalidOperation(HttpContext context, ErrorResponse response, Exception exception)
    {
        context.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
        response.StatusCode = 422;
        response.Message = exception.Message;

        return context.Response.WriteAsJsonAsync(response);
    }

    private static Task HandleUnhandledException(HttpContext context, ErrorResponse response, Exception exception)
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        response.StatusCode = 500;
        response.Message = "An unexpected error occurred";

        return context.Response.WriteAsJsonAsync(response);
    }
}
