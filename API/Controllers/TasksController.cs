using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class TasksController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserTask>>> GetTasks()
    {
        var tasks = await context.UserTasks.ToListAsync();

        return tasks;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserTask>> GetTask(int id){
        var task = await context.UserTasks.FindAsync(id);
        if (task == null) return NotFound();
        return task;
    }
}

