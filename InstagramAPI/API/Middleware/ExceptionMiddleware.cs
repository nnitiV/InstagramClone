using Domain.Exceptions;
using System.Net;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger) 
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }

        public static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";

            var statusCode = (int)HttpStatusCode.InternalServerError;
            var message = "Internal server error. Please, try again later";

            switch(ex)
            {
                case BadRequestException: // Add this!
                case ArgumentException:
                    statusCode = (int)HttpStatusCode.BadRequest; // 400
                    message = ex.Message;
                    break;
                case UnauthorizedAccessException:
                    statusCode = (int)HttpStatusCode.Unauthorized; // 401
                    message = ex.Message;
                    break;
                case NotFoundException:
                    statusCode = (int)HttpStatusCode.NotFound; // 404
                    message = ex.Message;
                    break;
            case UserAlreadyExistsException:
            case ConflictException:
                    statusCode = (int)HttpStatusCode.Conflict; // 409
                    message = ex.Message;
                    break;
                default:
                    statusCode = (int)HttpStatusCode.InternalServerError; // 500
                    break;
            }
            context.Response.StatusCode = statusCode;

            var response = new
            {
                StatusCode = statusCode,
                Message = message,
                Details = ex.StackTrace?.ToString() // To remove when switching to production
            };

            var json = JsonSerializer.Serialize(response);
            return context.Response.WriteAsync(json);
        }
    }
}
