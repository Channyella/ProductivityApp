import { Component, inject, NgModule } from '@angular/core';
import { ToDoListService } from '../_services/to-do-list.service';
import { TaskService } from '../_services/task.service';
import { SubtaskService } from '../_services/subtask.service';
import { tagMap, ToDoList } from '../_models/toDoList';
import { CreateTaskParams, Task, UpdateTaskParams } from '../_models/task';
import { CommonModule } from '@angular/common';
import { Subtask } from '../_models/subtask';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getTodaysDateString } from '../_helpers/date';

interface ListViewData {
  toDoList: ToDoList;
  tasks: Task[];
  subtasks: Subtask[];
}

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent {
  private route = inject(ActivatedRoute);
  private toDoListService = inject(ToDoListService);
  private taskService = inject(TaskService);
  private subtaskService = inject(SubtaskService);
  public isModalOpen = false;
  protected tagMap = tagMap;
  protected listId = Number(this.route.snapshot.paramMap.get('id'));
  protected dataPromise: Promise<ListViewData> = this.getData();
  public today = getTodaysDateString();
  protected selected?: number | undefined;

  public model: CreateTaskParams = {
    description: '',
    endDate: undefined,
  }

  public updateModel: CreateTaskParams = {
    description: '',
    endDate: undefined,
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  openModal() {
    this.isModalOpen = true;
  }

  private async getData(): Promise<ListViewData> {
    const [toDoLists, tasks] = await Promise.all([this.toDoListService.getToDoLists(), this.taskService.getTasksByListId(this.listId)]);
    const toDoList = toDoLists.find(list => list.id == this.listId);
    if (!toDoList) throw new Error('List does not exist.');
    return {
      toDoList,
      tasks,
      subtasks: []
    }
  }

  selectTask(task: Task | undefined) {
    if(task) {
      this.selected = task.id;
      this.updateModel = {
        description: task.description,
        endDate: task.endDate,
      }
    } else {
      this.selected = undefined;
      this.updateModel = {
        description: '',
        endDate: undefined,
      }
    }
  }

  async addTask() {
    const task = await this.taskService.addTask(this.listId, this.model);
    this.dataPromise = this.getData();
    this.model = {
      description: '',
      endDate: undefined,
    };
  }

  async updateTask(taskId: number) {
    await this.taskService.updateTask(taskId, this.updateModel);
    this.dataPromise = this.getData();
    this.updateModel = {
      description: '',
      endDate: undefined,
    };
    this.selected = undefined;
  }

  async toggleTaskComplete(task: Task) {
    await this.taskService.updateTask(task.id, {completed: task.completed});
    this.dataPromise = this.getData();
  }

  async deleteTask(taskId: number, listId: number) {
    await this.taskService.deleteTask(taskId, listId);
    this.dataPromise = this.getData();
  }

}
