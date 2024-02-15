
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;
// DTOs data transfer object
// mozliwosc przesylania zapytan w formie obiektu {}
public class RegisterDto
{
    [Required]
    public string UserName { get; set; }

    [Required]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; }



}
