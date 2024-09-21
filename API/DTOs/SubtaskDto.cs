using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class SubtaskDto
{
    [Required]
    public required string Description { get; set; }
    public DateOnly? EndDate { get; set; }
}
