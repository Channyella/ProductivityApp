import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { CreateToDoListParams, ToDoList, UpdateToDoListParams } from '../_models/toDoList';
import { first, firstValueFrom } from 'rxjs';

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

  async updateToDoList(toDoListId: number, updateToDoListParams: UpdateToDoListParams ) {
    const updateToDoList = await firstValueFrom(this.http.patch<ToDoList>(this.baseUrl + '/todolists/' + toDoListId, updateToDoListParams));
    const currentToDoListByUser = await this.getToDoLists();
    const newToDoLists = currentToDoListByUser.slice();
    const toDoListIndex = newToDoLists.findIndex(tdl => tdl.id == toDoListId);
    newToDoLists[toDoListIndex] = updateToDoList;
    this.cache = Promise.resolve(newToDoLists);
    return updateToDoList;
  }

  async deleteToDoList(toDoListId: number){
    await firstValueFrom(this.http.delete<void>(this.baseUrl + '/todolists/' + toDoListId));
    const currentToDoLists = await this.getToDoLists();
    const newToDoLists = currentToDoLists.filter(tdl => tdl.id != toDoListId);
    this.cache = Promise.resolve(newToDoLists);
  }


}
