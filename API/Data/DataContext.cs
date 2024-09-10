using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<ToDoList> ToDoLists { get; set; }
    public DbSet<UserTask> UserTasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ToDoList>()
            .HasOne(tdl => tdl.User)
            .WithMany(au => au.ToDoLists)
            .HasForeignKey(tdl => tdl.UserId);

        modelBuilder.Entity<UserTask>()
            .HasOne(t => t.ToDoList)
            .WithMany(tdl => tdl.Tasks)
            .HasForeignKey(t => t.ToDoListId);

    }
}
