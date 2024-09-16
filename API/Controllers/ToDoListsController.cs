using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ToDoListsController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ToDoList>>> GetToDoLists()
    {
        var toDoLists = await context.ToDoLists.ToListAsync();
        return toDoLists;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ToDoList>> GetToDoList(int id)
    {
        var toDoList = await context.ToDoLists.FindAsync(id);
        if (toDoList == null) return NotFound();
        return toDoList;
    }
}
