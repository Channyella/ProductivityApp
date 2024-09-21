import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api';
  private accountService = inject(AccountService);

  constructor() { }

  
}
