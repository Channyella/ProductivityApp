using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class TaskDto
{
    [Required]
    public required string Description { get; set; }
    public DateOnly? EndDate { get; set; }
}
