import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateSubtaskParams, Subtask } from '../_models/subtask';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubstasksService {
  private http = inject(HttpClient)
  baseUrl = 'https://localhost:5001/api';
  private cache: Map<number, Promise<Subtask[]>> = new Map();

  getSubtasksByTaskId(taskId: number, breakCache: boolean = false) {
    let cachedValue = this.cache.get(taskId);
    if (!cachedValue || breakCache) {
      cachedValue = firstValueFrom(this.http.get<Subtask[]>(this.baseUrl + '/subtasks/tasks/' + taskId));
    }
    this.cache.set(taskId, cachedValue);
    return cachedValue;
  }

  async addSubtask(taskId: number, subtaskParams: CreateSubtaskParams) {
    const newSubtask = await firstValueFrom(this.http.post<Subtask>(this.baseUrl + '/subtasks/tasks/' + taskId, subtaskParams));
    const currentSubtasksForTask = await this.getSubtasksByTaskId(taskId);
    const newSubtasksForTask = currentSubtasksForTask.slice();
    newSubtasksForTask.push(newSubtask);
    this.cache.set(taskId, Promise.resolve(newSubtasksForTask));
  }
}
