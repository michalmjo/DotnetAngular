using API.Data; // to odnosi sie do DataContext
using API.Entities; //AppUser Entitie z naszego pliku AppUser
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]

    public class UsersController : BaseApiController


    {

        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // zwraca cala tablice z users.. api/users
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        // zwraca cala tablice z users o podanym ID.. api/users/2

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return null; // Return 404 Not Found if user with the specified ID is not found
            }

            return user;
        }
    }
};
