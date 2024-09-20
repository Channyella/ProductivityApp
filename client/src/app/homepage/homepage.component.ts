import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PomodoroComponent } from "../pomodoro/pomodoro.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavComponent, PomodoroComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  http = inject(HttpClient);
  users: any;

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}
