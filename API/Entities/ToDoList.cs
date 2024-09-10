using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public enum TagEnum {
    Education,
    Emergency,
    Financial,
    Fun,
    General,
    Health,
    Hobby,
    Holidays,
    Social,
    Travel,
    Work,
}

public class ToDoList
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string Title { get; set; }
    public string? Description {get; set; }
    public TagEnum? Tag { get; set; }
    public DateOnly? StartDate{ get; set; }
    public DateOnly? EndDate { get; set; }

    // Navigation property for AppUser
    public required AppUser User { get; set; }

    // Navigation property for Tasks
    public ICollection<UserTask> Tasks { get; } = [];

}
