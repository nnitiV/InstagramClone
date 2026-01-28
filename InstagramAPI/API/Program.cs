using Application.Interfaces;
using Application.Services;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Infrastructure.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var connectionSting = builder.Configuration.GetConnectionString("Url");

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionSting));

builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();

var app = builder.Build();  

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
