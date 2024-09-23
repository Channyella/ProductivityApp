using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();
app.UseRouting();

// Configure the HTTP request pipeline.
app.UseCors(x => 
        x.AllowAnyHeader()
            .WithOrigins("http://localhost:4200", "https://localhost:4200")
            .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE")
    );
    

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
