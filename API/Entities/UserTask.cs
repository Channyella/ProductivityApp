namespace API.Entities;

public class UserTask
{
    public int Id { get; set; }
    public int ToDoListId { get; set; }
    public required string Description { get; set; }
    public required DateOnly CreateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public DateOnly? EndDate { get; set; }
    public bool Completed { get; set; } = false;

    // Navigation Property for ToDoList
    public ToDoList? ToDoList { get; set; }
    
    // Navigation property for Subtasks
    public ICollection<Subtask> Subtasks { get; } = [];
}
