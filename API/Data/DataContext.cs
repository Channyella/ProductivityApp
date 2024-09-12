using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<ToDoList> ToDoLists { get; set; }
    public DbSet<UserTask> UserTasks { get; set; }
    public DbSet<Subtask> Subtasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>()
            .Property(au => au.CreatedDate)
            .HasDefaultValueSql("DATE('now')");

        modelBuilder.Entity<ToDoList>()
            .HasOne(tdl => tdl.User)
            .WithMany(au => au.ToDoLists)
            .HasForeignKey(tdl => tdl.UserId);

        modelBuilder.Entity<ToDoList>()
            .Property(tdl => tdl.CreateDate)
            .HasDefaultValueSql("DATE('now')");
        
        modelBuilder.Entity<ToDoList>()
            .Property(tdl => tdl.Completed)
            .HasDefaultValue(false);

        modelBuilder.Entity<UserTask>()
            .HasOne(t => t.ToDoList)
            .WithMany(tdl => tdl.Tasks)
            .HasForeignKey(t => t.ToDoListId);

        modelBuilder.Entity<UserTask>()
            .Property(ut => ut.CreateDate)
            .HasDefaultValueSql("DATE('now')");
        
        modelBuilder.Entity<UserTask>()
            .Property(ut => ut.Completed)
            .HasDefaultValue(false);

        modelBuilder.Entity<Subtask>()
            .HasOne(st => st.UserTask)
            .WithMany(ut => ut.Subtasks)
            .HasForeignKey(st => st.UserTaskId);
        
        modelBuilder.Entity<Subtask>()
            .Property(st => st.CreateDate)
            .HasDefaultValueSql("DATE('now')");
        
        modelBuilder.Entity<Subtask>()
            .Property(st => st.Completed)
            .HasDefaultValue(false);

    }
}
