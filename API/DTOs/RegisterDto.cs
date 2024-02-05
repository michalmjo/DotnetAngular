
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;
// DTOs data transfer object
// mozliwosc przesylania zapytan w formie obiektu {}
public class RegisterDto
{
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Password { get; set; }



}
