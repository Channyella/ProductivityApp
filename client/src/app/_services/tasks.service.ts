import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { CreateTaskParams, Task } from '../_models/task';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
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
  }
}
