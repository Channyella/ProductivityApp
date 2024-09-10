using System;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string FirstName {get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }

    // Navigation property for ToDoLists
    public ICollection<ToDoList> ToDoLists { get; } = [];
}
