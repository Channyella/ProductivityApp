import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api';
  private accountService = inject(AccountService);

  constructor() { }
}
