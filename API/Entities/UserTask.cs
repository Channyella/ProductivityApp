using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public enum RecurringEnum {
    Once,
    Daily,
    Weekly,
    Monthly,
    Yearly,
}

public class UserTask
{
    public int Id { get; set; }
    public int ToDoListId { get; set; }
    public required string Description { get; set; }
    public required RecurringEnum Recurring {get; set;}
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }

    // Navigation Property for ToDoList
    public required ToDoList ToDoList { get; set; }
}
