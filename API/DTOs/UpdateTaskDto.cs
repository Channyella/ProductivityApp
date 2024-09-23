using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateTaskDto
{
    public string? Description { get; set; }
    public DateOnly? EndDate { get; set; }
    public bool? Completed { get; set; }
}
