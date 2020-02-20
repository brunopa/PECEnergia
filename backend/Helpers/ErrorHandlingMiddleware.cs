using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context /* other dependencies */)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var code = HttpStatusCode.InternalServerError; // 500 if unexpected
        var message = exception.Message;

        if (exception.InnerException != null)
        {
            if (exception.InnerException.Message.Contains("Duplicate entry"))
            {
                message = exception.InnerException.Message;
                code = HttpStatusCode.Conflict;
            }
        }

        var result = JsonConvert.SerializeObject(
            new
            {
                message = message,
                detail = exception.StackTrace,
                exceptionType = exception.GetType().Name,
                originalMethod = context.Request.Method
            });

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;
        return context.Response.WriteAsync(result);
    }
}