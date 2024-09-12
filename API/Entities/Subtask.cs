using System;

namespace API.Entities;

public class Subtask
{
    public int Id { get; set; }
    public int UserTaskId { get; set; }
    public required string Description { get; set; }
    public required DateOnly CreateDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public DateOnly? EndDate { get; set; }
    public bool Completed { get; set; } = false;

    // Navigation Property for UserTask
    public required UserTask UserTask { get; set; }
}
