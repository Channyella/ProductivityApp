using System;
using API.Data;
using API.DTOs;
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

    [HttpGet("users/{userId:int}")]
    public async Task<ActionResult<List<ToDoList>>> GetToDoListsByUserId(int userId)
    {
        var toDoLists = await context.ToDoLists
            .Where(list => list.UserId == userId).ToListAsync();
        if (toDoLists == null) return NotFound();
        return toDoLists;
    }

    [HttpPost("users/{userId:int}")]
    public async Task<ActionResult<ToDoList>> CreateToDoList(int userId, ToDoListDto toDoListDto)
    {
        var toDoList = new ToDoList
        {
            UserId = userId,
            Title = toDoListDto.Title,
            Description = toDoListDto.Description,
            Tag = toDoListDto.Tag,
            EndDate = toDoListDto.EndDate,
            CreateDate = DateOnly.FromDateTime(DateTime.Now),
        };
        context.ToDoLists.Add(toDoList);
        await context.SaveChangesAsync();

        // Return the created resource with a 201 status code
        return CreatedAtAction(nameof(GetToDoListsByUserId), new { userId = userId, id = toDoList.Id }, toDoList);
    }

}
