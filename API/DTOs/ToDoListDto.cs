using System;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs;

public class ToDoListDto
{
    [Required]
    public required string Title { get; set; }
    public string? Description { get; set; }
    public TagEnum? Tag { get; set; }
    public DateOnly? EndDate { get; set; }

}
