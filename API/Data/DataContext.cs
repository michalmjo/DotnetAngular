// to jest importowanie App User z API.ENtities uzera do naszego DbSet<Appuser>
using API.Entities;

using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }


    public DbSet<AppUser> Users { get; set; }

}
