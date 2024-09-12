using System;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string FirstName {get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public DateOnly CreatedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

    // Navigation property for ToDoLists
    public ICollection<ToDoList> ToDoLists { get; } = [];
}
