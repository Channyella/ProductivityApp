using System;
using API.Entities;

namespace API.DTOs;

public class UpdateToDoListDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public TagEnum? Tag { get; set; }
    public DateOnly? EndDate { get; set; }
}
