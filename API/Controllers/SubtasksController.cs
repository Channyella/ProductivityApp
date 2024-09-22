using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class SubtasksController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Subtask>>> GetSubtasks()
    {
        var subtasks = await context.Subtasks.ToListAsync();
        return subtasks;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Subtask>> GetSubtask(int id)
    {
        var subtask = await context.Subtasks.FindAsync(id);
        if (subtask == null) return NotFound();
        return subtask;
    }

        [HttpGet("tasks/{taskId:int}")] // api/subtasks/tasks/1
    public async Task<ActionResult<List<Subtask>>> GetSubtasksByTaskId(int taskId)
    {
        var subtasks = await context.Subtasks
            .Where(subtask => subtask.UserTaskId == taskId).ToListAsync();
        if (subtasks == null) return NotFound();
        return subtasks;
    }

    [HttpPost("tasks/{taskId:int}")]
    public async Task<ActionResult<Subtask>> CreateSubtask(int taskId, SubtaskDto subtaskDto)
    {
        var subtask = new Subtask
        {
            UserTaskId = taskId,
            Description = subtaskDto.Description,
            EndDate = subtaskDto.EndDate,
            CreateDate = DateOnly.FromDateTime(DateTime.Now)
        };
        context.Subtasks.Add(subtask);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSubtasksByTaskId), new { taskId = taskId, id = subtask.Id}, subtask);
    }

    [HttpDelete("{id:int}")]
    public async 

}
