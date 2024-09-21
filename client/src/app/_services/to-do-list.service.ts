import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { CreateToDoListParams, ToDoList } from '../_models/toDoList';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api';
  private accountService = inject(AccountService);
  private cache: Promise<ToDoList[]> | undefined;

  constructor() { }

  getToDoLists(breakCache: boolean = false) {
    if (!this.cache || breakCache) {
      this.cache = firstValueFrom(this.http.get<ToDoList[]>(this.baseUrl + '/todolists/users/' + this.accountService.currentUser()?.id));
    }
    return this.cache;
  }

  async addToDoList(toDoListParams: CreateToDoListParams) {
    const newToDoList = await firstValueFrom(this.http.post<ToDoList>(this.baseUrl + '/todolists/users/' + this.accountService.currentUser()?.id, toDoListParams));
    const currentLists = await this.getToDoLists();
    // Create new array and promise to properly trigger change detection
    const newLists = currentLists.slice(); // Copy the array without new item cause Angular lol
    newLists.push(newToDoList); // Adding the new list to the array
    this.cache = Promise.resolve(newLists); // Update the cache
  }
}
