import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PomodoroComponent } from "../pomodoro/pomodoro.component";
import { HttpClient } from '@angular/common/http';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavComponent, PomodoroComponent,TodoListComponent, RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {


}
