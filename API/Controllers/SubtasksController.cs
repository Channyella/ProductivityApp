using API.Data;
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

}
