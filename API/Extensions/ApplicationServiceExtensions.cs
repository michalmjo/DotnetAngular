using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;


namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // builder Default connection wymagany do połączenia z bazą danych
            // tworzenie dla connection string w appsettings development ConnectionStrings i nadanie nazwy dla db
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // Jak długo usługa ma być dostępna AddTransient, AddScoped
            services.AddScoped<ITokenService, TokenService>();

            // dodawanie CORS
            services.AddCors();

            return services;
        }
    }
}
