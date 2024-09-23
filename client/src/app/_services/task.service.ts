import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { CreateTaskParams, Task, UpdateTaskParams } from '../_models/task';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api';
  private accountService = inject(AccountService);
  private cache: Map<number, Promise<Task[]>> = new Map();

  constructor() { }

  getTasksByListId(listId: number, breakCache: boolean = false) {
    let cachedValue = this.cache.get(listId);
    if(!cachedValue || breakCache) {
      cachedValue = firstValueFrom(this.http.get<Task[]>(this.baseUrl + '/tasks/todolists/' + listId));
    }
    this.cache.set(listId, cachedValue);
    return cachedValue;
  }

  async addTask(listId: number, taskParams: CreateTaskParams) {
    const newTask = await firstValueFrom(this.http.post<Task>(this.baseUrl + '/tasks/todolists/' + listId, taskParams));
    const currentTasksForList = await this.getTasksByListId(listId);
    // Create new array and promise to properly trigger change detection
    const newTasksForList = currentTasksForList.slice(); // Copy the array without new item
    newTasksForList.push(newTask); // Adding the new task to the array
    this.cache.set(listId, Promise.resolve(newTasksForList)); // Update the cache
    return newTask;
  }

  async updateTask(taskId: number, updateTaskParams: UpdateTaskParams) {
    const updateTask = await firstValueFrom(this.http.patch<Task>(this.baseUrl + '/tasks/' + taskId, updateTaskParams));
    const currentTasksForList = await this.getTasksByListId(updateTask.toDoListId);
    const newTasksForList = currentTasksForList.slice();
    const taskIndex = newTasksForList.findIndex(task => task.id == updateTask.id);
    newTasksForList[taskIndex] = updateTask;
    this.cache.set(updateTask.toDoListId, Promise.resolve(newTasksForList));
    return updateTask;
  }

  async deleteTask(taskId: number, listId: number){
    await firstValueFrom(this.http.delete<void>(this.baseUrl + '/tasks/' + taskId));
    const currentTasksForList = await this.getTasksByListId(listId);
    const newTasksForList = currentTasksForList.filter(task => task.id != taskId); 
    this.cache.set(listId, Promise.resolve(newTasksForList));
  }
}
