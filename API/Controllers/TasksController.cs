using API.Data;
using API.DTOs;
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

    [HttpGet("todolists/{toDoListId:int}")] // api/tasks/todolists/1
    public async Task<ActionResult<List<UserTask>>> GetTasksByToDoListId(int toDoListId)
    {
        var tasks = await context.UserTasks
            .Where(task => task.ToDoListId == toDoListId).ToListAsync();
        if (tasks == null) return NotFound();
        return tasks;
    }

    [HttpPost("todolists/{toDoListId:int}")]
    public async Task<ActionResult<UserTask>> CreateTask(int toDoListId, TaskDto taskDto)
    {
        var task = new UserTask
        {
            ToDoListId = toDoListId,
            Description = taskDto.Description,
            EndDate = taskDto.EndDate,
            CreateDate = DateOnly.FromDateTime(DateTime.Now)
        };
        context.UserTasks.Add(task);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTasksByToDoListId), new { toDoListId = toDoListId, id = task.Id}, task);
    }

    [HttpPatch("{id:int}")]
    public async Task<ActionResult<UserTask>> UpdateTask(int id, UpdateTaskDto updateTaskDto){
        if (updateTaskDto == null)
        {
            return BadRequest("Invalid data.");
        }

        var existingTask = await context.UserTasks.FindAsync(id);
        if (existingTask == null)
        {
            return NotFound();
        }
        if (updateTaskDto.Description != null)
        {
            existingTask.Description = updateTaskDto.Description;
        }
        if (updateTaskDto.EndDate != null)
        {
            existingTask.EndDate = updateTaskDto.EndDate;
        }
        if (updateTaskDto.Completed != null)
        {
            existingTask.Completed = updateTaskDto.Completed.Value;
        }
        await context.SaveChangesAsync();
        return existingTask;
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteTask(int id){
        var task = await context.UserTasks.FindAsync(id);
        if (task == null){
            return NotFound();
        }
        context.UserTasks.Remove(task);
        await context.SaveChangesAsync();
        return NoContent();
    }
}

