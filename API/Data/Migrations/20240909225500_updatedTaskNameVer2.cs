using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatedTaskNameVer2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTask_ToDoLists_ToDoListId",
                table: "UserTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask");

            migrationBuilder.RenameTable(
                name: "UserTask",
                newName: "UserTasks");

            migrationBuilder.RenameIndex(
                name: "IX_UserTask_ToDoListId",
                table: "UserTasks",
                newName: "IX_UserTasks_ToDoListId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTasks",
                table: "UserTasks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTasks_ToDoLists_ToDoListId",
                table: "UserTasks",
                column: "ToDoListId",
                principalTable: "ToDoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTasks_ToDoLists_ToDoListId",
                table: "UserTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTasks",
                table: "UserTasks");

            migrationBuilder.RenameTable(
                name: "UserTasks",
                newName: "UserTask");

            migrationBuilder.RenameIndex(
                name: "IX_UserTasks_ToDoListId",
                table: "UserTask",
                newName: "IX_UserTask_ToDoListId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTask_ToDoLists_ToDoListId",
                table: "UserTask",
                column: "ToDoListId",
                principalTable: "ToDoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
